import { supabase } from './supabase';

export type Rezervare = {
  nume: string;
  email: string;
  telefon: string;
  persoane: number;
  data_ora: string;
};

export async function adaugaRezervare(rezervare: Rezervare) {
  const { data, error } = await supabase
    .from('rezervari')
    .insert([rezervare])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getToateRezervari() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
