# Session Log

## [2026-04-14] — Extindere meniu cu produse noi

### Ce s-a făcut
- Adăugate câte 10 produse noi în fiecare din cele 4 tab-uri ale meniului (Espresso, Specialty, Cold Brew, Patiserie)
- Curatare selectivă: eliminate produse nereprezentative (Mushroom Latte, Pumpkin Spice, Blue Spirulina, Hojicha, Iced Cappuccino, Frappé Vanilie, Iced Mocha, Shakerato, Frappé Ciocolată, Iced Cortado, Scone, Donut, Baklava, Wafle, Cookies & Cream, Tiramisu, Pannacotta, Macchiato, Affogato, Piccolo Latte etc.)
- Înlocuite poze pentru Rose Latte, Lavender Latte, Oat Cappuccino, Iced Matcha și Cinnamon Roll cu imagini mai reprezentative

### Stare finală tab-uri
- **Espresso**: 12 produse
- **Specialty**: 9 produse
- **Cold Brew**: 9 produse
- **Patiserie**: 9 produse

### Ce rămâne
- [ ] Stilizare finală secțiune Meniu (layout, animații, eventuali filteri)
- [ ] Sistem notificări rezervări (email/SMS)
- [ ] Pagină confirmare rezervare după submit
- [ ] SEO: meta tags, OG image, sitemap
- [ ] Recenzii dinamice din Supabase
- [ ] Pagina admin: moderare recenzii

### Commits
- `c081fb8` feat: expand menu with 10 new products per tab and curate selection

### Decizii importante
- Produsele prea nișate (adaptogene, spirulină, hojicha) au fost eliminate — publicul țintă sunt studenți, nu specialty coffee enthusiasts
- Patiseria a rămas cu clasice recunoscute: croissant, pain au chocolat, cheesecake, brownie, tartă, muffin, cinnamon roll, ecler, red velvet

---

## 2026-04-03 — Secțiunea recenzii, pagini dedicate rezervări/recenzii, deploy

### Ce s-a făcut
- **TestimonialeSection** — secțiune recenzii cu 6 carduri, rating sumar, animații la scroll, buton CTA
- **LasaRecenzieSection** — formular "Lasă o recenzie" cu star picker interactiv, validare, salvare Supabase (`status: pending`)
- **Pagina /rezervari** — `RezervariForm` mutat pe pagină dedicată (`app/rezervari/page.tsx`)
- **Pagina /recenzii** — `LasaRecenzieSection` pe pagină dedicată (`app/recenzii/page.tsx`)
- **API /api/recenzii** — route POST cu validare, salvare în tabel Supabase `recenzii`
- **lib/recenzii.ts** — funcție `adaugaRecenzie()` cu tip `RecenzieNoua`
- **Navbar** — adăugat buton teal "Rezervă o masă" → `/rezervari` (desktop + mobile); logo folosește `usePathname` — scroll pe homepage, navigare pe alte pagini
- **Hero** — butonul "Rezervări" schimbat din `<button onClick scroll>` în `<a href="/rezervari">`
- **Culori unificate** — `TestimonialeSection` și `LasaRecenzieSection` adoptă paleta din `RezervariForm` (`#C9B69C`, `#3D2B1F`, `#6B5344`, `#D4C5B5`, teal-600)
- **Deploy Vercel** — `https://vibe-website-delta.vercel.app`

### Ce rămâne
- [ ] Tabel Supabase `recenzii` de creat manual (SQL furnizat în sesiune)
- [ ] Pagina admin: moderare recenzii (aprobare/respingere)
- [ ] TestimonialeSection să încarce recenzii aprobate din Supabase (acum hardcodat)
- [ ] Secțiunea Meniu (categorii + produse cu poze)
- [ ] Notificări rezervări (email/SMS)
- [ ] SEO: meta tags, OG image, sitemap

### Commits
- `5c15173` feat: add reviews section and move reservations/reviews to dedicated pages

### Decizii importante
- Recenziile sunt salvate cu `status: pending` — necesită aprobare înainte de publicare
- `TestimonialeSection` rămâne cu date hardcodate până la implementarea moderării
- Paleta unificată: toate secțiunile "acțiuni" (rezervări, recenzii) folosesc același stil crem/maro/teal

---

## 2026-03-30 — Timezone fixes, UX rezervări, bot protection, navbar, locație, deploy

### Ce s-a făcut
- **Timezone fix** — data afișată greșit (o zi în urmă) cauzat de `toISOString()` UTC; rezolvat cu `parseDataLocala()` și `toLocalDateStr()` folosind componente locale
- **Timezone fix DB** — ora stocată greșit în baza de date; rezolvat prin trimiterea offset-ului local în `data_ora` (ex: `2026-03-30T12:30:00+03:00`)
- **Ore disponibile** — L-V 07:00–20:30, S-D 08:00–21:30; ultimul slot cu 30 min înainte de închidere; ore trecute dezactivate pentru ziua curentă
- **Bot protection** — honeypot (câmp ascuns) + captcha matematic (regenerat la răspuns greșit)
- **UX form rezervări** — eliminat butoanele „Următoarele zile", layout optimizat să intre pe un ecran, grid ore 7 coloane fără scrollbar
- **Bara de progres** — mutată sus deasupra cardului (poziție finală)
- **Navbar** — logo „Vibe Coffee", tagline bold alb, iconuri sociale cu border, buton telefon, hamburger pe mobile
- **Secțiunea Locație** — adresă Strada Piezișă nr. 3, hartă OpenStreetMap cu marker corect, social links
- **Hero** — adăugat buton „Rezervări", „Vizitează-ne" → `#locatie`, „Vezi Meniul" transparent
- **Deploy Vercel** — multiple deploy-uri în sesiune
- **.gitattributes** — normalizare line endings LF pentru a elimina avertismentele Git CRLF
- **ROADMAP.md** — creat (lipsea)

### Ce rămâne
- [ ] Secțiunea Meniu (categorii + produse)
- [ ] Notificări rezervări (email/SMS)
- [ ] Pagină confirmare după submit rezervare
- [ ] SEO: meta tags, OG image

### Commits
- `bfa0cb9` chore: add .gitattributes to normalize line endings to LF
- `b61ba02` feat: optimize reservation form UX and add bot protection
- `a743360` feat: improve reservation form UX with timezone fixes and schedule rules
- `24e842f` feat: add navbar with social links, phone button and tagline
- `ddcb694` style: add coffee beans background to location, darken reservation bg
- `e9e06d7` feat: add location section with address, contact, social links and map
- `9d01aa6` style: update reservation section to warm cream color palette

### Decizii importante
- `toISOString()` returnează UTC — întotdeauna folosit `toLocalDateStr()` / `parseDataLocala()` pentru date locale
- Offset timezone trimis explicit în payload API pentru stocare corectă în DB
- Branch: `starter` (1 commit ahead of origin, nepushed)

---

## 2026-03-28 (sesiunea 2) — Navbar + ajustări Hero și deploy

### Ce s-a făcut
- Creat **Navbar** fix cu logo „Vibe Coffee", tagline „O atmosferă tinerească" (bold, alb), iconuri sociale (WhatsApp, Telegram, Instagram, Facebook) și buton telefon
- Navbar responsive cu hamburger menu pe mobile
- Butonul „Vizitează-ne" din Hero redirecționat la secțiunea `#locatie`
- Butonul „Vezi Meniul" — eliminat fondul, acum transparent cu border alb
- Background Rezervări ajustat la cafeniu mai pronunțat `#C9B69C`
- Background Locație cu poză boabe cafea + overlay maro 85%
- Adresă actualizată: Strada Piezișă nr. 3, Cluj-Napoca
- Marker hartă pe coordonatele exacte ale Străzii Piezișă
- Conturile sociale redenumite în „cafeauata", email: info@cafeauata.ro
- Adăugat Facebook în social links (navbar + secțiunea Locație)
- Deploy pe Vercel (2 deploy-uri în sesiune)

### Ce rămâne
- [ ] Nu există ROADMAP.md — de creat cu obiectivele proiectului

### Commits
- `9d01aa6` style: update reservation section to warm cream color palette
- `e9e06d7` feat: add location section with address, contact, social links and map
- `ddcb694` style: add coffee beans background to location, darken reservation bg
- `24e842f` feat: add navbar with social links, phone button and tagline

### Decizii importante
- Navbar fără linkuri de navigare, doar logo + social + telefon
- Paleta navbar: fond maro închis #2A1F17, text crem/alb, iconuri cu border crem
- Tagline „O atmosferă tinerească" ascuns pe mobile (hidden sm:inline)

---

## 2026-03-28 — Secțiunea Locație + restyling Rezervări

### Ce s-a făcut
- Schimbat paleta secțiunii Rezervări din dark overlay în crem cald, apoi ajustat la cafeniu mai pronunțat (#C9B69C)
- Creat secțiunea **LocationSection** (Vizitează-ne) cu adresă, contact, social links (WhatsApp, Telegram, Instagram, Facebook) și hartă OpenStreetMap
- Adresă: Strada Piezișă nr. 3, Cluj-Napoca — marker pe coordonatele exacte
- Conturile sociale redenumite în „cafeauata", email: info@cafeauata.ro, telefon: 0740 000 000
- Adăugat background cu boabe de cafea pe secțiunea Locație

### Ce rămâne
- [ ] Nu există ROADMAP.md — de creat cu obiectivele proiectului
- [ ] Push la remote (3 commits locale nepublicate)

### Commits
- `9d01aa6` style: update reservation section to warm cream color palette
- `e9e06d7` feat: add location section with address, contact, social links and map
- `ddcb694` style: add coffee beans background to location, darken reservation bg

### Decizii importante
- Paleta Rezervări: fond cafeniu #C9B69C, card alb, accente teal, inputuri crem
- Paleta Locație: fond boabe cafea cu overlay maro 85%, card info crem #F5F0EB
- Iconuri sociale cu border maro, hover inversează culorile

---

## 2026-03-27 (seara) — Instalare plugin chat-namer

### Ce s-a făcut
- Instalat plugin-ul **claude-chat-namer** pentru gestionarea conversațiilor Claude Code
- Scripturi copiate în `~/.claude/tools/chat-namer/`
- Creat comanda `/chat` în `~/.claude/commands/chat.md`
- Configurat hook Stop în `~/.claude/settings.json` pentru auto-naming conversații
- Testat cu succes — 1 conversație auto-numită, 5 conversații listate

### Ce rămâne
- [ ] Nu există ROADMAP.md — de creat cu obiectivele proiectului
- [ ] Continuare dezvoltare Vibe Caffè

### Commits
- Niciun commit nou în această sesiune (modificări doar în `~/.claude/`)

### Decizii importante
- Plugin-ul chat-namer e acum disponibil global via `/chat`
- Hook-ul de auto-naming rulează automat la finalul fiecărei conversații

---

## 2026-03-27 — Setup comenzi Claude Code + pornire server

### Ce s-a făcut
- Verificat conectarea la GitHub (cont: mirceabertean)
- Localizat proiectul vibe-website în `C:\Users\user\vibe-website`
- Pornit serverul Next.js dev pe http://localhost:3000
- Creat comenzi globale Claude Code (`~/.claude/commands/`): `/start`, `/end`, `/commit`, `/push`
- Comenzile existau doar în proiect (`.claude/commands/`), le-am copiat global pentru acces de oriunde

### Notă
- După modulul 3: s-a adăugat pagina de rezervări și pagina de administrare

### Ce rămâne
- [ ] Nu există ROADMAP.md — de creat cu obiectivele proiectului
- [ ] Proiectul nu e clonat în `D:\VScode` — rămâne în `C:\Users\user\vibe-website` conform preferința utilizatorului

### Commits
- Niciun commit nou în această sesiune

### Decizii importante
- Proiectul rămâne în `C:\Users\user\vibe-website`, nu se mută
- Comenzile Claude Code sunt acum globale, disponibile în orice proiect
