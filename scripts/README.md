# Import dat do Sanity

Tento skript umožňuje hromadný import informací o obrazech, keramice, skle a dárkových předmětech do Sanity CMS.

## 📋 Požadavky

1. **Sanity API Token** - potřebujete token s write permissions
2. **Data v JSON formátu** - soubor s informacemi o produktech

## 🚀 Jak použít

### 1. Získání Sanity API Tokenu

1. Přejděte na [Sanity Dashboard](https://www.sanity.io/manage)
2. Vyberte projekt `frystatska-galerie` (ID: `lbgdxh20`)
3. Přejděte do **API** → **Tokens**
4. Vytvořte nový token s **Editor** nebo **Admin** permissions
5. Zkopírujte token

### 2. Nastavení tokenu

Vytvořte soubor `.env.local` v kořenovém adresáři projektu a přidejte:

```bash
SANITY_API_TOKEN=váš-token-zde
```

Nebo nastavte jako environment variable:

```bash
export SANITY_API_TOKEN="váš-token-zde"
```

### 3. Příprava dat

1. Zkopírujte `data.example.json` jako `data.json`:
   ```bash
   cp scripts/data.example.json scripts/data.json
   ```

2. Upravte `scripts/data.json` a přidejte své produkty podle příkladu

### 4. Formát dat

Každý produkt musí mít:
- **type**: `"artwork"`, `"ceramics"`, `"glass"` nebo `"gifts"`
- **title**: Název produktu (povinné)
- **description**: Popis (povinné)
- **price**: Cena v Kč (povinné)

Volitelné pole:
- `originalPrice` - původní cena (pro slevy)
- `artist` - umělec/výrobce
- `technique` - technika výroby
- `dimensions` - rozměry
- `material` - materiál
- `year` - rok vzniku (pouze pro artwork)
- `subcategory` - podkategorie
- `featured` - zda je doporučené (default: `false`)
- `inStock` - zda je skladem (default: `true`)
- `published` - zda zveřejnit (default: `true`)

**Specifická pole:**
- **glass**: `collection` - název kolekce
- **gifts**: 
  - `occasions` - pole s příležitostmi (např. `["Narozeniny", "Vánoce"]`)
  - `giftWrapping` - zda je možné dárkové balení (default: `true`)

### 5. Spuštění importu

```bash
npm run import:sanity
```

Nebo s vlastním souborem:

```bash
npm run import:sanity scripts/muj-soubor.json
```

## 📝 Příklad dat

```json
{
  "products": [
    {
      "type": "artwork",
      "title": "Krajina s řekou",
      "description": "Krásný obraz zachycující klidnou krajinu.",
      "price": 15000,
      "originalPrice": 18000,
      "artist": "Jan Novák",
      "technique": "Olej na plátně",
      "dimensions": "50x70 cm",
      "material": "Plátno",
      "year": 2023,
      "subcategory": "krajina",
      "featured": true,
      "inStock": true,
      "published": true
    }
  ]
}
```

## ⚠️ Důležité poznámky

1. **Obrázky**: Skript **nepřidává obrázky**. Ty musíte přidat ručně v Sanity Studio po importu dat.

2. **Slugy**: Slugy se generují automaticky z názvu. Pokud produkt se stejným slugem již existuje, bude přeskočen.

3. **Validace**: Skript kontroluje povinná pole a typy. Produkty s chybnými daty budou přeskočeny.

4. **Bezpečnost**: Token má write permissions - držte ho v bezpečí a nesdílejte ho!

## 🔍 Podkategorie

### Artwork (obrazy)
- `krajina`
- `portret`
- `abstrakce`
- `zatisi`
- `mesto`

### Ceramics (keramika)
- `vazy`
- `nadobi`
- `kvetinace`
- `misy`
- `hrnky`
- `konvice`

### Glass (sklo)
- `vazy`
- `sklenice`
- `svicny`
- `misy`
- `vitraze`
- `dekorace`

### Gifts (dárkové předměty)
- `sety`
- `sperkovnice`
- `doplnky`
- `dekorace`
- `pribory`
- `papirnictvi`

## 🐛 Řešení problémů

**Chyba: "Chybí SANITY_API_TOKEN"**
- Zkontrolujte, že máte nastavený token v `.env.local` nebo jako environment variable

**Chyba: "Soubor neexistuje"**
- Ujistěte se, že soubor `scripts/data.json` existuje
- Nebo zadejte správnou cestu k souboru jako argument

**Produkty se nepřidávají**
- Zkontrolujte, že token má správná oprávnění (Editor nebo Admin)
- Zkontrolujte formát JSON souboru (může být chybný)
- Podívejte se na chybové zprávy v konzoli

## 📞 Podpora

Pokud narazíte na problémy, zkontrolujte:
1. Formát JSON souboru (můžete použít online validátor)
2. Oprávnění Sanity tokenu
3. Konzoli pro detailní chybové zprávy


