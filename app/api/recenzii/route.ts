import { NextRequest, NextResponse } from 'next/server';
import { adaugaRecenzie } from '@/lib/recenzii';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nume, rating, text } = body;

    if (!nume || !rating || !text) {
      return NextResponse.json({ error: 'Câmpuri lipsă' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating invalid' }, { status: 400 });
    }

    const recenzie = await adaugaRecenzie({ nume, rating, text });
    return NextResponse.json({ success: true, recenzie }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
