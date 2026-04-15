# ROADMAP — Vibe Caffè Landing Page

## Finalizat
- [x] Hero cu video background, animații fadeInUp, butoane CTA (Meniu, Vizitează-ne, Rezervări)
- [x] Navbar fix: logo, tagline, iconuri sociale (WhatsApp, Telegram, Instagram, Facebook), buton telefon
- [x] Navbar responsive cu hamburger menu pe mobile
- [x] Secțiunea Rezervări: calendar, selecție oră, formular, validare, bot protection (honeypot + captcha)
  - [x] Timezone fix: dată și oră stocate corect în baza de date
  - [x] Ore disponibile filtrate după zi (L-V 07:00–20:30, S-D 08:00–21:30)
  - [x] Ore trecute dezactivate pentru ziua curentă
  - [x] Layout optimizat să încapă pe un ecran
- [x] Secțiunea Locație (Vizitează-ne): adresă, contact, social links, hartă OpenStreetMap
- [x] Pagina de administrare rezervări
- [x] Deploy pe Vercel
- [x] .gitattributes pentru normalizarea line endings (LF)
- [x] Secțiunea Recenzii (TestimonialeSection) cu 6 carduri, rating sumar, animații scroll
- [x] Pagina /recenzii — formular "Lasă o recenzie" cu star picker, salvare Supabase
- [x] Pagina /rezervari — RezervariForm mutat pe pagină dedicată
- [x] Navbar: buton "Rezervă o masă" → /rezervari, logo → scroll la hero sau / dacă pe altă pagină
- [x] Hero: buton Rezervări → /rezervari (în loc de scroll anchor)

## În lucru
- [ ] —

## ✅ Sesiunea 2026-04-15 — AI Barista Bot (DONE)

- [x] `lib/menu-data.ts` — sursă unică de adevăr pentru meniu (38 produse, ingrediente, vegan flag)
- [x] `lib/knowledge-base.ts` — generat dinamic din menu-data (modifici un loc → se actualizează tot)
- [x] `components/MenuStarter.tsx` — refactorizat să importe din lib/menu-data
- [x] `app/api/chat/route.ts` — endpoint streaming Claude (claude-sonnet-4-5-20250929, max 200 tokens)
  - [x] System prompt cu personalitate „Maestrul Înțelept"
  - [x] Guardrails: nu inventează produse, nu vorbește off-topic, română obligatorie
  - [x] Ora locală injectată din client
  - [x] Status deschis/închis calculat server-side (fix pentru erori de raționament AI)
  - [x] Link-uri acțiuni în răspunsuri (rezervări, meniu, recenzii)
- [x] `components/ChatWidget.tsx` — widget complet
  - [x] Buton flotant cu animație pulse + badge mesaje necitite
  - [x] Streaming răspuns caracter cu caracter
  - [x] Typing indicator (3 puncte animate)
  - [x] Quick replies inițiale + sugestii contextuale după fiecare răspuns
  - [x] CTA butoane detectate automat din răspuns
  - [x] Render markdown links clickabile
  - [x] Persistență conversație în localStorage
  - [x] Animație slide-up la deschidere
  - [x] Timestamp pe mesaje
  - [x] Buton conversație nouă
  - [x] Mobile full-screen
  - [x] Design cafeniu (#3D2314 / #2C1508)
- [x] ChatWidget adăugat în layout.tsx (vizibil pe toate paginile)
- [x] Deploy pe Vercel + ANTHROPIC_API_KEY setat

## TODO viitor
- [ ] Secțiunea Meniu (categorii + produse cu poze) — produsele există, rămâne de stilizat secțiunea final
- [ ] Sistem notificări rezervări (email/SMS la confirmare)
- [ ] Pagină de confirmare rezervare după submit
- [ ] SEO: meta tags, OG image, sitemap
- [ ] Galerie foto (atmosferă cafenea)
- [ ] Integrare Google Maps (opțional, față de OpenStreetMap)
- [ ] Pagina admin: moderare recenzii (aprobare/respingere din tabelul Supabase)
- [ ] Recenzii dinamice: TestimonialeSection să încarce recenzii aprobate din Supabase
- [ ] Chatbot: răspunsuri în limba engleză dacă userul scrie în engleză
