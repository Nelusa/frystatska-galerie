#!/usr/bin/env tsx

import { createClient } from "@sanity/client"
import * as fs from "fs"
import * as path from "path"

const envLocalPath = path.join(__dirname, "..", ".env.local")
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8")
  envContent.split("\n").forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  })
}

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || process.env.SANITY_STUDIO_API_TOKEN

if (!SANITY_API_TOKEN) {
  console.error("❌ Chybí SANITY_API_TOKEN!")
  console.error("   Nastavte ho v .env.local nebo jako environment variable")
  console.error("   Token najdete v Sanity Dashboard: https://www.sanity.io/manage")
  process.exit(1)
}

const client = createClient({
  projectId: "lbgdxh20",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-06-16",
  token: SANITY_API_TOKEN,
})

function generateSlug(title: string, romanNumeral?: string): string {
  let slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
  
  if (romanNumeral) {
    slug += "-" + romanNumeral.toLowerCase()
  }
  
  return slug.slice(0, 96)
}

type ProductType = "artwork" | "ceramics" | "glass" | "gifts"

interface BaseProductData {
  type: ProductType
  title: string
  description: string
  price: number
  originalPrice?: number
  artist?: string
  technique?: string
  dimensions?: string
  material?: string
  year?: number
  subcategory?: string
  featured?: boolean
  inStock?: boolean
  published?: boolean
}

interface ArtworkData extends BaseProductData {
  type: "artwork"
}

interface CeramicsData extends BaseProductData {
  type: "ceramics"
}

interface GlassData extends BaseProductData {
  type: "glass"
  collection?: string
}

interface GiftsData extends BaseProductData {
  type: "gifts"
  occasions?: string[]
  giftWrapping?: boolean
}

type ProductData = ArtworkData | CeramicsData | GlassData | GiftsData

interface ImportData {
  products: ProductData[]
}

type ImportResult = "success" | "skipped" | "error"

async function createProduct(product: ProductData, updateMode: boolean = false, titleCounts?: Map<string, number>): Promise<ImportResult> {
  let finalTitle = product.title
  let romanNumeral: string | undefined
  
  if (product.type === "ceramics" && product.dimensions) {
    const dimensionMatch = product.dimensions.match(/(\d+)\s*x\s*(\d+)/i)
    if (dimensionMatch) {
      const firstDimension = parseInt(dimensionMatch[1], 10)
      if (firstDimension < 15) {
        finalTitle = product.title + " - malý"
      } else {
        finalTitle = product.title + " - velký"
      }
    }
  } else if (product.type === "artwork") {
    const hasDuplicates = titleCounts && (titleCounts.get(product.title) || 0) > 1
    
    if (hasDuplicates) {
      if (product.dimensions) {
        const dimensionMatch = product.dimensions.match(/(\d+)\s*x\s*(\d+)/i)
        if (dimensionMatch) {
          const firstDimension = parseInt(dimensionMatch[1], 10)
          if (firstDimension < 40) {
            romanNumeral = "I"
          } else {
            romanNumeral = "II"
          }
        }
      } else if (product.price !== undefined) {
        if (product.price < 5000) {
          romanNumeral = "I"
        } else {
          romanNumeral = "II"
        }
      }
    }
  }
  
  const slug = generateSlug(finalTitle, romanNumeral)
  
  const document: any = {
    _type: product.type,
    title: finalTitle,
    description: product.description,
    price: product.price,
    slug: {
      _type: "slug",
      current: slug,
    },
    published: product.published !== undefined ? product.published : true,
    featured: product.featured || false,
    inStock: product.inStock !== undefined ? product.inStock : true,
  }

  if (product.originalPrice) document.originalPrice = product.originalPrice
  if (product.artist) document.artist = product.artist
  if (product.technique) document.technique = product.technique
  if (product.dimensions) document.dimensions = product.dimensions
  if (product.material) document.material = product.material
  if (product.year) document.year = product.year
  if (product.subcategory) document.subcategory = product.subcategory

  if (product.type === "glass" && "collection" in product && product.collection) {
    document.collection = product.collection
  }

  if (product.type === "gifts") {
    if ("occasions" in product && product.occasions) {
      document.occasions = product.occasions
    }
    document.giftWrapping = "giftWrapping" in product ? product.giftWrapping : true
  }

  try {
    const existing = await client.fetch(
      `*[_type == "${product.type}" && slug.current == "${slug}"][0]`
    )

    if (existing) {
      if (updateMode) {
        const updateDoc: any = { ...document }
        delete updateDoc.slug
        delete updateDoc._type
        
        await client.patch(existing._id).set(updateDoc).commit()
        console.log(`🔄 Aktualizováno: "${product.title}" (ID: ${existing._id})`)
        return "success"
      } else {
        console.log(`⚠️  Přeskočeno: "${product.title}" (slug "${slug}" již existuje)`)
        return "skipped"
      }
    }

    const result = await client.create(document)
    console.log(`✅ Vytvořeno: "${product.title}" (ID: ${result._id})`)
    return "success"
  } catch (error: any) {
    console.error(`❌ Chyba při vytváření "${product.title}":`, error.message)
    return "error"
  }
}

async function deleteAllProducts(): Promise<void> {
  console.log("🗑️  Mažu všechny existující produkty...")
  console.log("⚠️  POZOR: Mazání dokumentů NESMAŽE obrázky (assets zůstanou zachované)\n")
  
  const types = ["artwork", "ceramics", "glass", "gifts"]
  let deletedCount = 0
  
  for (const type of types) {
    try {
      const documents = await client.fetch(`*[_type == "${type}"]`)
      if (documents.length > 0) {
        const ids = documents.map((doc: any) => doc._id)
        await client.delete(ids)
        deletedCount += ids.length
        console.log(`   ✅ Smazáno ${ids.length} dokumentů typu "${type}"`)
      }
    } catch (error: any) {
      console.error(`   ❌ Chyba při mazání typu "${type}":`, error.message)
    }
  }
  
  console.log(`\n✨ Smazáno celkem ${deletedCount} produktů`)
  console.log("💡 Obrázky (assets) zůstaly zachované v Sanity\n")
}

async function main() {
  const args = process.argv.slice(2)
  const cleanFlag = args.includes("--clean") || args.includes("--clear") || process.env.CLEAN === "true"
  const updateFlag = args.includes("--update") || args.includes("--up")
  const dataFile = args.find(arg => !arg.startsWith("--")) || path.join(__dirname, "data.json")
  
  if (cleanFlag) {
    await deleteAllProducts()
  }
  
  if (!fs.existsSync(dataFile)) {
    console.error(`❌ Soubor ${dataFile} neexistuje!`)
    console.error("   Vytvořte soubor data.json nebo použijte: npm run import:sanity <cesta-k-souboru>")
    console.error("   Pro smazání existujících dat použijte: npm run import:sanity --clean")
    process.exit(1)
  }

  console.log(`📖 Načítám data z: ${dataFile}`)
  
  let data: ImportData
  try {
    const fileContent = fs.readFileSync(dataFile, "utf-8")
    data = JSON.parse(fileContent)
  } catch (error: any) {
    console.error(`❌ Chyba při čtení souboru: ${error.message}`)
    process.exit(1)
  }

  if (!data.products || !Array.isArray(data.products)) {
    console.error("❌ Neplatný formát dat! Očekává se objekt s polem \"products\" (array)")
    process.exit(1)
  }

  const titleCounts = new Map<string, number>()
  data.products.forEach(product => {
    if (product.type === "artwork") {
      const count = titleCounts.get(product.title) || 0
      titleCounts.set(product.title, count + 1)
    }
  })

  console.log(`\n🚀 Začínám import ${data.products.length} produktů...\n`)

  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  for (const product of data.products) {
    try {
      if (!product.type || !product.title || !product.description || product.price === undefined) {
        console.error(`❌ Chybí povinná pole u produktu: ${JSON.stringify(product)}`)
        errorCount++
        continue
      }

      if (!["artwork", "ceramics", "glass", "gifts"].includes(product.type)) {
        console.error(`❌ Neplatný typ produktu: ${product.type}`)
        errorCount++
        continue
      }

      const result = await createProduct(product, updateFlag, titleCounts)
      if (result === "success") {
        successCount++
      } else if (result === "skipped") {
        skipCount++
        if (cleanFlag) {
          console.error(`⚠️  Přeskočeno (i po mazání): "${product.title}" - možná duplikát v JSON`)
        }
      } else {
        errorCount++
      }
    } catch (error) {
      errorCount++
    }
  }

  console.log("\n✨ Import dokončen!")
  console.log(`   ✅ ${updateFlag ? "Aktualizováno/Vytvořeno" : "Vytvořeno"}: ${successCount}`)
  console.log(`   ⚠️  Přeskočeno: ${skipCount}`)
  console.log(`   ❌ Chyby: ${errorCount}`)
  if (updateFlag) {
    console.log("\n💡 Obrázky byly zachovány - pouze data byla aktualizována")
  } else {
    console.log("\n💡 Tip: Obrázky můžete nyní přidat ručně v Sanity Studio")
  }
}

main().catch((error) => {
  console.error("❌ Kritická chyba:", error)
  process.exit(1)
})

