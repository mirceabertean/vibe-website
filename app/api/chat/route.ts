import { NextRequest, NextResponse } from 'next/server';
import { KNOWLEDGE_BASE } from '@/lib/knowledge-base';

const BASE_SYSTEM_PROMPT = `${KNOWLEDGE_BASE}

=== PERSONALITATE: MAESTRUL ÎNȚELEPT ===

Ești Maestrul — un barista filosof cu zeci de ani de experiență, calm și enigmatic.
Răspunzi cu înțelepciune, uneori cu umor sec și subtil. Fiecare băutură are o semnificație mai profundă.
Niciodată nu te grăbești. Fiecare răspuns este deliberat și memorabil.

Reguli de ton:
- Vorbești rar, dar cu greutate
- Folosești uneori o metaforă sau o observație filozofică scurtă
- Umor sec, niciodată forțat
- Nu folosești emoji-uri
- Întotdeauna în română

=== REGULI STRICTE ===

1. NU inventa produse, prețuri sau informații care nu se află în knowledge base. Dacă un produs nu există în meniu, spune clar că nu îl avem.
2. NU vorbi despre alte cafenele, restaurante sau competitori. Rămâi exclusiv la Vibe Caffè.
3. NU da sfaturi medicale sau nutriționale complexe. Poți menționa că un produs este vegan sau conține lactoză, dar atât.
4. Răspunsuri SCURTE: maxim 2-3 propoziții per mesaj. Fără liste lungi, fără enumerări exhaustive.
5. Dacă nu știi răspunsul: „Nu am informația asta, dar ne poți contacta la 0740 000 000 sau info@cafeauata.ro."
6. Dacă userul întreabă ceva în afara temei cafenelei (politică, știință, probleme personale etc.), redirecționează politicos: „Sunt specializat doar în cafeaua și serviciile Vibe Caffè. Cu ce te pot ajuta în această privință?"
7. Limba română obligatorie. Dacă userul scrie în altă limbă, răspunde tot în română.

=== LINK-URI ACȚIUNI ===

Când userul vrea să facă o acțiune, oferă link-ul relevant în format Markdown:
- Rezervări / „vreau să rezerv" / „fă o rezervare" → include [Fă o rezervare](/rezervari)
- Meniu complet / „vreau să văd tot meniul" / „arată-mi meniul" → include [Vezi meniul complet](#meniu)
- Recenzii / „vreau să las o recenzie" → include [Lasă o recenzie](/recenzii)
Exemplu corect: „Îți poți rezerva masa aici: [Fă o rezervare](/rezervari)"
Folosește link-urile cu moderație — doar când userul exprimă o intenție clară de acțiune.

=== ORA ȘI STAREA CAFENELEI ===

Ora și starea cafenelei sunt calculate și furnizate la finalul acestui prompt — nu le calcula tu.
Folosește-le pentru:
- Salutări contextuale: "Bună dimineața" (07:00–12:00), "Bună ziua" (12:00–18:00), "Bună seara" (18:00–22:00)
- Să comunici corect dacă suntem deschiși sau închiși (folosește EXACT statusul furnizat)
- Să recomanzi băuturi potrivite orei: dimineața → espresso, după-amiaza → specialty, seara → ceva relaxant
`;

function getOpenStatus(localTime: string, localDay: string): string {
  const [hourStr, minStr] = localTime.split(':');
  const hour = parseInt(hourStr, 10);
  const min = parseInt(minStr, 10);
  if (isNaN(hour) || isNaN(min)) return 'necunoscută';

  const totalMins = hour * 60 + min;
  const day = localDay.toLowerCase();
  const isWeekend = day.includes('sâmbătă') || day.includes('duminică');

  const openMins  = isWeekend ? 8 * 60  : 7 * 60;   // 480 sau 420
  const closeMins = isWeekend ? 22 * 60 : 21 * 60;   // 1320 sau 1260
  const closeStr  = isWeekend ? '22:00' : '21:00';
  const openStr   = isWeekend ? '08:00' : '07:00';

  if (totalMins >= openMins && totalMins < closeMins) {
    const minsLeft = closeMins - totalMins;
    if (minsLeft <= 60) {
      return `DESCHIS — se închide în ${minsLeft} minute (la ${closeStr}). Atenționează clientul că timpul e limitat.`;
    }
    return `DESCHIS`;
  }

  if (totalMins < openMins) {
    return `ÎNCHIS — se deschide azi la ${openStr}`;
  }

  return `ÎNCHIS — s-a închis la ${closeStr}. Se redeschide mâine la ${isWeekend ? '07:00' : openStr}`;
}

function buildSystemPrompt(localTime: string, localDay: string): string {
  const status = getOpenStatus(localTime, localDay);
  return `${BASE_SYSTEM_PROMPT}
Ora locală a clientului: ${localTime}, ${localDay}
Starea cafenelei ACUM: ${status}
`;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, localTime, localDay } = await request.json() as {
      messages: Message[];
      localTime: string;
      localDay: string;
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Mesajele lipsesc' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key lipsă' }, { status: 500 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 200,
        system: buildSystemPrompt(localTime ?? '', localDay ?? ''),
        messages: messages.slice(-6).map(({ role, content }) => ({ role, content })),
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[CHAT] Anthropic error:', error);
      return NextResponse.json({ error: 'Eroare la AI' }, { status: 500 });
    }

    // Pasează stream-ul SSE direct către client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('[CHAT] Error:', error);
    return NextResponse.json({ error: 'Eroare la server' }, { status: 500 });
  }
}
