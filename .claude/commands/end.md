# End Session

Rulează următorii pași la sfârșitul sesiunii de lucru:

1. **Verifică `git status`** — dacă există modificări nesalvate, întreabă utilizatorul dacă vrea să le comită

2. **Actualizează ROADMAP.md** — marchează ce s-a terminat, adaugă TODO-uri noi descoperite în sesiune

3. **Salvează rezumatul sesiunii în SESSION-LOG.md** (la începutul fișierului, cele mai recente primele) folosind formatul:

```
## [DATA] — [Titlu scurt al sesiunii]

### Ce s-a făcut
- ...

### Ce rămâne
- [ ] ...
- [ ] ...

### Commits
- `[hash]` mesaj commit

### Decizii importante
- ...
```

4. **Afișează rezumatul și în chat** pentru confirmare vizuală

5. **Întreabă** "Vrei să notez altceva înainte să încheiem?" și așteaptă răspunsul
