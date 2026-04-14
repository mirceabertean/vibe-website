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

## TODO viitor
- [ ] Secțiunea Meniu (categorii + produse cu poze) — produsele există, rămâne de stilizat secțiunea final
- [ ] Sistem notificări rezervări (email/SMS la confirmare)
- [ ] Pagină de confirmare rezervare după submit
- [ ] SEO: meta tags, OG image, sitemap
- [ ] Galerie foto (atmosferă cafenea)
- [ ] Integrare Google Maps (opțional, față de OpenStreetMap)
- [ ] Pagina admin: moderare recenzii (aprobare/respingere din tabelul Supabase)
- [ ] Recenzii dinamice: TestimonialeSection să încarce recenzii aprobate din Supabase
