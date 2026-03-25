# Commit Changes

Rulează următorii pași pentru a face commit la modificările curente:

1. **Rulează `git status`** și arată lista de fișiere modificate

2. **Întreabă** "Ce fișiere vrei să incluzi în commit? (sau toate)"

3. **Propune un mesaj de commit** bazat pe modificări, sau cere unul de la utilizator dacă preferă

4. **Execută `git add` + `git commit`** cu mesajul confirmat

5. **Confirmă** că s-a făcut commit-ul cu hash-ul rezultat

## Reguli

- Mesajul de commit **în engleză**
- Format mesaj: `<tip>: <descriere>` (tipuri: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`)
- Adaugă întotdeauna la final: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
- **NU face push automat** — doar salvare locală
- Dacă nu sunt modificări, spune **"Nu sunt modificări de salvat"**
