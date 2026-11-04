import { imageConfigDefault } from "next/dist/shared/lib/image-config"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime"
import assert from "node:assert/strict"
import { test } from "node:test"
import { renderToStaticMarkup } from "react-dom/server"

import nextConfig from "../next.config"
import Home from "../src/app/page"
import { ProductCard } from "../src/components/products/ProductCard"
import { ProductDetailPage } from "../src/components/products/ProductDetailPage"
import { productTypeConfigs } from "../src/config/productConfigs"
import { contentLink } from "../src/lib/contentLinks"
import { parseFavorites } from "../src/lib/favoritesStorage"
import { client, getCategoryUrl, getProductBySlug, searchProducts } from "../src/lib/sanity"
import { productSlug } from "../studio/schemaTypes/productSlug"


const item = { _id: "one", _type: "artwork", title: "Česká krajina", price: 100, slug: { current: "ceska-krajina" } }

test("favorites recover from malformed JSON and wrong shapes", () => {
  for (const value of [null, "{", "null", "{}", "[null,3,\"test\"]"]) assert.deepEqual(parseFavorites(value), [])
})
test("favorites keep valid records, reject broken images, and deduplicate", () => {
  assert.deepEqual(parseFavorites(JSON.stringify([item, item, { ...item, _id: "bad", image: {} }, { ...item, _type: "bad" }])), [item])
})
test("favorites retain products with absent CMS fields and skip unrenderable records", () => {
  const legacy = { ...item, image: null, artist: null }
  const malformedImage = { ...item, _id: "bad-image", image: { _type: "image", asset: { _ref: "image-incomplete" } } }
  const malformedText = { ...item, _id: "bad-text", description: { value: "bad" } }
  assert.deepEqual(parseFavorites(JSON.stringify([malformedImage, legacy, malformedText])), [legacy])
})
test("CMS links support existing Czech paths, queries and safe external links", () => {
  assert.equal(contentLink("/obrazy?sort=price#top", "/"), "/artworks?sort=price#top")
  assert.equal(contentLink("/kontakt", "/"), "/contact")
  assert.equal(contentLink("https://example.com/photo", "/"), "https://example.com/photo")
  for (const value of ["javascript:alert(1)", "//example.com", "/\\example.com", "data:text/html,hi", undefined]) assert.equal(contentLink(value, "/contact"), "/contact")
})
test("product categories use actual application routes", () => {
  assert.equal(getCategoryUrl("artwork"), "/artworks")
  assert.equal(getCategoryUrl("ceramics"), "/ceramics")
  assert.equal(getCategoryUrl("glass"), "/glass")
  assert.equal(getCategoryUrl("gifts"), "/gifts")
})
test("all product slugs retain Czech letters through transliteration", () => {
  assert.equal(productSlug("Česká váza Žluťoučká"), "ceska-vaza-zlutoucka")
  assert.equal(productSlug("  Modrá mísa  "), "modra-misa")
})
test("product and search input stays in query parameters", async () => {
  const originalFetch = client.fetch
  const calls: Array<{ query: string; params: unknown }> = []
  client.fetch = (async (query: string, params: unknown) => { calls.push({ query, params }); return null }) as typeof client.fetch
  try {
    const input = "\" ] | *[_type == \"secret\"]"
    await getProductBySlug(input, "glass")
    await searchProducts(input)
    assert.ok(calls.every(call => !call.query.includes(input)))
    assert.deepEqual(calls[0].params, { slug: input, type: "glass" })
    assert.deepEqual(calls[1].params, { term: `${input}*` })
  } finally { client.fetch = originalFetch }
})
test("homepage renders CMS about text and photo, and keeps fallback content when absent", async () => {
  const originalFetch = client.fetch
  let content: unknown = {
    aboutSection: {
      content: [{ _type: "block", _key: "a", children: [{ _type: "span", _key: "b", text: "Text vložený maminkou", marks: [] }], markDefs: [], style: "normal" }],
      image: { _type: "image", asset: { _type: "reference", _ref: "image-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-600x600-jpg" }, alt: "Nová fotka galerie" },
    },
  }
  client.fetch = (async (query: string) => query.includes("== \"homepageContent\"") ? content : []) as typeof client.fetch
  try {
    const html = renderToStaticMarkup(<ImageConfigContext.Provider value={{ ...imageConfigDefault, ...nextConfig.images }}>{await Home()}</ImageConfigContext.Provider>)
    assert.ok(html.includes("Text vložený maminkou"))
    assert.ok(html.includes("Nová fotka galerie"))
    assert.ok(html.includes("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))
    assert.ok(!html.includes("Již více než 15 let"))
    content = null
    const fallback = renderToStaticMarkup(<ImageConfigContext.Provider value={{ ...imageConfigDefault, ...nextConfig.images }}>{await Home()}</ImageConfigContext.Provider>)
    assert.ok(fallback.includes("Již více než 15 let"))
    assert.ok(fallback.includes("gallery-3.jpg"))
  } finally { client.fetch = originalFetch }
})

test("product card links do not contain buttons or nested links", () => {
  const html = renderToStaticMarkup(<ProductCard
    item={{ ...item, published: true, category: "obrazy", image: undefined, description: "Popis", inStock: true } as never}
    basePath="/artworks" />)
  assert.ok(!/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<(?:button|a)\b/.test(html))
  assert.ok(html.includes("href=\"/artworks/ceska-krajina\""))
})
test("detail retains every uploaded gallery photo and uses correct related links", () => {
  const images = Array.from({ length: 5 }, (_, i) => ({ _type: "image", asset: { _ref: `image-${"a".repeat(39)}${i}-600x600-jpg`, _type: "reference" } }))
  const product = { ...item, _type: "gifts", image: undefined, description: "Popis", published: true, gallery: images }
  const html = renderToStaticMarkup(<ImageConfigContext.Provider value={{ ...imageConfigDefault, ...nextConfig.images }}><ProductDetailPage
    product={product as never}
    relatedProducts={[product as never]}
    breadcrumbItems={[]}
    productTypeConfig={productTypeConfigs.gifts} /></ImageConfigContext.Provider>)
  assert.ok(html.includes("detail 5 (nová karta)"))
  assert.ok(html.includes("href=\"/gifts/ceska-krajina\""))
})
