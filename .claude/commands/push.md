# Push to GitHub

Rulează următorii pași pentru a trimite commit-urile pe GitHub:

1. **Verifică dacă există commits locale** care nu sunt pe remote cu `git log --oneline origin/<branch>..HEAD`

2. **Dacă există modificări uncommitted**, avertizează și întreabă "Ai modificări nesalvate. Vrei să rulezi /commit întâi?"

3. **Dacă totul e OK**, execută `git push origin <branch>`

4. **Confirmă succesul** și afișează link-ul către repo: https://github.com/mirceabertean/vibe-website

## Reguli

- **NU face push fără confirmare** — întotdeauna cere aprobare înainte
- Dacă branch-ul nu există pe remote, folosește `git push -u origin <branch>`
- Dacă nu există remote configurat, ajută utilizatorul să-l configureze
- Dacă push-ul eșuează, afișează eroarea și sugerează soluția
