# Portofoliu — Mircea Bertean

Trei aplicații web construite de la zero în cadrul cursului de Vibe Coding,
folosind Next.js, Supabase și Claude AI.

---

## 1. Vibe Caffè — Landing Page

**Link:** [vibe-website-delta.vercel.app](https://vibe-website-delta.vercel.app)

### Ce face
Site de prezentare pentru o cafenea din Cluj-Napoca. Vizitatorii pot vedea meniul complet,
lăsa recenzii, face rezervări online și găsi locația pe hartă. Integrat cu un chatbot AI
disponibil 24/7 pe toate paginile.

**Pagini:** Homepage · /rezervari · /recenzii · /admin

**Funcționalități cheie:**
- Hero cu video background și animații
- Meniu interactiv cu 38 de produse pe categorii (Espresso, Specialty, Cold Brew, Patiserie)
- Formular de rezervări cu calendar, filtrare ore și protecție anti-spam
- Secțiune recenzii cu sistem de stele, salvate în baza de date
- Hartă OpenStreetMap cu locația cafenelei
- Chatbot AI „Maestrul" integrat în toate paginile

### Ce am învățat construind-o
- Cum se construiește un layout responsive cu Tailwind CSS
- Cum funcționează animațiile CSS și efectele de scroll
- Cum se conectează un formular la o bază de date (Supabase)
- Cum se protejează un formular de boti (honeypot + captcha)
- Că designul vizual cere mai multă iterație decât logica
- Cum se face deploy automat pe Vercel din GitHub

---

## 2. Vibe Budget — Gestiune Financiară

**Link:** [vibe-budget-starter-inky.vercel.app](https://vibe-budget-starter-inky.vercel.app)

### Ce face
Aplicație web privată pentru urmărirea cheltuielilor personale. Fiecare utilizator
are cont propriu și poate importa extrase bancare, categoriza tranzacțiile și vedea
rapoarte grafice. Include un AI Financial Coach care analizează cheltuielile.

**Pagini:** /login · /register · /dashboard · /transactions · /banks · /categories
· /currencies · /upload · /reports · /settings

**Funcționalități cheie:**
- Autentificare cu email și parolă (cont propriu, date private)
- Import fișiere CSV și Excel de la bancă
- Gestionare tranzacții: adaugă, editează, șterge, filtrează
- Bulk edit — schimbi categoria sau banca la mai multe tranzacții simultan
- Grafice: cheltuieli pe categorii (plăcintă) și pe luni (bare)
- AI Financial Coach: analizează cheltuielile și oferă sfaturi personalizate

### Ce am învățat construind-o
- Cum funcționează autentificarea (sesiuni, date private per utilizator)
- Cum se modelează relații între date (utilizatori → bănci → tranzacții → categorii)
- Cum se parsează fișiere CSV și Excel în browser
- Cum se construiesc filtre combinate (dată + bancă + categorie + search simultan)
- Cum se integrează grafice interactive (Recharts)
- Că aplicațiile cu date reale au un nivel diferit de responsabilitate față de cele de prezentare

---

## 3. Barista Bot — Chatbot AI

**Link:** Integrat în Vibe Caffè → [vibe-website-delta.vercel.app](https://vibe-website-delta.vercel.app)

### Ce face
Chatbot AI cu personalitate, integrat în site-ul cafenelei. Știe meniul complet,
programul, locația și facilitățile. Răspunde în timp real, caracter cu caracter,
și ghidează vizitatorii spre rezervări sau meniu.

**Personalitate:** „Maestrul" — barista filosof, calm și enigmatic. Vorbește rar,
dar cu greutate. Uneori cu o metaforă scurtă. Niciodată în altă limbă decât română.

**Funcționalități cheie:**
- Streaming răspuns caracter cu caracter (nu aștepți să se scrie tot)
- Butoane rapide contextuale după fiecare răspuns
- Status cafenea calculat server-side (deschis/închis, minute rămase)
- Conversație salvată în browser — o regăsești dacă închizi și redeschizi
- Meniu sincronizat automat — adaugi un produs o dată, chatbot-ul îl știe imediat

### Ce am învățat construind-o
- Cum se integrează Claude API într-o aplicație Next.js
- Ce înseamnă streaming SSE și cum se citesc răspunsuri în timp real
- Că prompt engineering-ul e o muncă separată de programare — personalitatea,
  regulile și guardrail-urile cer iterație la fel ca un design vizual
- Importanța calculului server-side pentru logică critică (nu te baza pe AI
  să facă aritmetică cu ore)
- Conceptul de „single source of truth" — datele de meniu trăiesc într-un singur
  fișier și sunt folosite atât de site cât și de chatbot

---

## Ce am învățat în tot cursul

### Tehnic
- **Next.js App Router** — cum se structurează o aplicație modernă cu pagini,
  componente și API routes
- **TypeScript** — cum tipurile te protejează de greșeli înainte să rulezi codul
- **Tailwind CSS** — cum construiești un design consistent fără să scrii CSS de mână
- **Supabase** — cum stochezi date, gestionezi utilizatori și faci queries
- **Claude API** — cum integrezi un model AI în propria aplicație
- **Vercel + GitHub** — cum funcționează un flux de deploy automat

### De proces
- **Iterația mică bate planul mare** — mai bine un feature funcțional pe zi
  decât un plan perfect pe hârtie
- **Vizualizează înainte să optimizezi** — deschide browserul des, nu la final
- **Single source of truth** — fiecare informație trăiește într-un singur loc
- **Server-side pentru logică critică** — nu delega calcule importante unui AI

### De mentalitate
- Un landing page, o aplicație cu baze de date și un chatbot cer trei tipuri
  diferite de gândire: estetică, tehnică și conceptuală
- Cel mai greu nu e să scrii codul — e să știi **ce** să construiești și **de ce**
- Vibe coding nu înseamnă să lași AI-ul să facă tot. Înseamnă să colaborezi
  cu el ca un coechipier, tu rămânând cel care decide direcția

---

*Construit cu Next.js · Tailwind CSS · Supabase · Claude AI · Vercel*
*Curs Vibe Coding · 2026*
