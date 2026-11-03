# Správa galerie pro maminku

Tento dokument odděluje hotové funkční opravy od návrhu další práce.
Změny živých dat, přístupů do Sanity ani nasazení Studia tento PR neprovádí.

## Co současný admin skutečně ovládá

| Oblast | Stav před opravou | Stav v tomto PR |
| --- | --- | --- |
| Produkty ve čtyřech kategoriích | Název, popis, cena, hlavní fotka a další fotky jsou v Sanity. Další fotky jsou na webu omezené na čtyři a nereagují na kliknutí. | Před publikováním produktu se kontroluje dokončené nahrání hlavní fotky. Zobrazí se všechny další fotky; každou lze otevřít ve větším rozlišení. Odstavce v popisu zůstanou oddělené. |
| Úvod hlavní stránky | Nadpis, podnadpis a tlačítka jsou propojené. Výchozí odkazy používají starší české adresy; web pro ně má kompatibilní přepisy. | Výchozí odkazy jsou sjednocené s hlavní navigací. Starší české odkazy dál fungují. |
| „O nás“ na hlavní stránce | Admin nabízí text a obrázek, ale web je ignoruje. | Publikovaný text a obrázek se zobrazí; bez nich zůstává původní obsah. |
| Samostatná stránka „O nás“ | Texty a fotky jsou v kódu. | Zatím beze změny; není to stejná sekce jako „O nás“ na úvodní stránce. |
| Stránka „Fotky“ | Šestnáct fotek je vypsaných v kódu. | Zatím stejný obsah; opravené ovládání zvětšení fotek klávesnicí a zavření Escape. |
| Kontakt a otevírací doba | V kódu v `src/config/businessInfo.ts`. | Beze změny. |
| Pozadí úvodu, doporučené kategorie a SEO z adminu | Pole existují, ale hlavní stránka je nepoužívá. | Zatím beze změny; nezapínáme nové vzhledové varianty. |
| Sváteční banner | Schéma a dotazy se neshodují; banner se v rozhraní ani nevykresluje. | Zatím beze změny, nutno dořešit jako samostatnou funkci. |

Publikované změny web nově znovu načítá po 60 sekundách při další návštěvě
(Next.js může nejprve vrátit předchozí verzi a obnovit ji na pozadí).
Není to okamžitý náhled rozepsaného konceptu.

## Doporučený další krok: zjednodušit stávající Sanity Studio

Nový vlastní admin zatím nedoporučuji. Sanity už umí nahrávání fotek,
řazení přetažením, koncepty, publikování a historii změn. Nejdřív má smysl
zpřehlednit formuláře a opravdu propojit pole s webem.

Navržené menu:

- **Produkty** → Obrazy, Keramika, Sklo, Dárkové předměty.
- **Texty webu** → Úvodní stránka, O galerii.
- **Fotky galerie** → seznam fotek s náhledy a pořadím.
- **Kontakt a otevírací doba** → jedno společné místo.

### Produkty a fotky

1. V prvním kroku jen název, autor/výrobce, popis, cena a dostupnost.
2. Samostatná část „Fotky“: jedna hlavní fotka a libovolné další detaily,
   přesouvání pořadí, stručné popisky a vysvětlení ořezu.
3. Kontrola, že hlavní fotka opravdu obsahuje nahraný soubor, a srozumitelná
   chyba u nedokončeného nahrávání. Rozumné doporučení velikosti fotek;
   malé fotky nejdřív varováním, ne zákazem publikace.
4. URL schovat do pokročilých nastavení, vytvořit ji z názvu a po publikování
   ji zbytečně neměnit. Při změně adresy by bylo nutné řešit přesměrování.
5. Náhled produktu v seznamu: fotka, název, cena a stav „Skladem / Prodáno“.
6. Rozlišit „prodáno“ od „skrýt z webu“. Prodaný obraz může zůstat viditelný
   jako ukázka; maminka musí vědět, který přepínač dělá co.

### Texty, stránky a bezpečné publikování

- Úvodní stránku a kontakt otevírat přímo, bez možnosti omylem vytvářet další
  stejné dokumenty. Před tím ověřit existující dokumenty a jejich ID; nic
  automaticky nepřepisovat ani nemazat.
- Místo psaní URL nabízet výběr „Obrazy / Kontakt / O nás …“. Externí odkazy
  ponechat jako pokročilou možnost.
- Každé pole pojmenovat podle místa na webu, třeba „Text pod hlavním nadpisem“.
  U podporovaných formátů povolit jen to, co umí web zobrazit.
- Fotky interiéru spravovat v jednom dokumentu. Web je zobrazí v určeném pořadí
  a při chybějících datech zachová současné fotky. Přechod bez mazání původních
  souborů nebo hromadného importu do produkce.
- Doplnit náhled konceptu před zveřejněním. Vyžaduje samostatně ověřit přihlášení,
  draft preview a cílovou adresu webu; nezpřístupňovat koncepty veřejně.
- Ověřit běžný účet maminky a návrat k předchozí verzi. Oprávnění sama neměnit.

## Jak poznáme, že je admin hotový

Maminka zvládne bez zásahu do kódu přidat produkt se třemi fotkami,
přehodit jejich pořadí, upravit popis, označit produkt jako prodaný,
vyměnit fotku interiéru a upravit otevírací dobu. Před publikací uvidí
náhled a po publikaci ověří změnu na webu. Zkoušet na testovacích datech,
ne přepisováním skutečných produktů.

## Co je potřeba ještě ověřit

V tomto PR jsou schémata posouzená ze zdrojového kódu; používání účtu maminky,
uložení konceptu a publikování v nasazeném Sanity Studiu nejsou ověřené.
Není potvrzená ani adresa současného Studia. Návrh proto není tvrzení,
že všechny uvedené možnosti už jsou nasazené a funkční.
