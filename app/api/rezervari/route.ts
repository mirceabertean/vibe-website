import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { nume, email, telefon, persoane, data_ora } = body;

    if (!nume || !email || !telefon || !data_ora) {
      return NextResponse.json(
        { error: 'Toate câmpurile obligatorii trebuie completate' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('rezervari')
      .insert([{ nume, email, telefon, persoane, data_ora }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Eroare la server' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rezervari')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Eroare la server' }, { status: 500 });
  }
}

// Schimbă statusul unei rezervări (confirmat / anulat / în așteptare)
export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID-ul și statusul sunt obligatorii' },
        { status: 400 }
      );
    }

    const statusuriValide = ['în așteptare', 'confirmată', 'anulată'];
    if (!statusuriValide.includes(status)) {
      return NextResponse.json(
        { error: `Status invalid. Valori acceptate: ${statusuriValide.join(', ')}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('rezervari')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Eroare la server' }, { status: 500 });
  }
}

// Șterge o rezervare
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID-ul rezervării este obligatoriu' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('rezervari')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Eroare la server' }, { status: 500 });
  }
}
