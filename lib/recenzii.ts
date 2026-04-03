import { supabase } from './supabase';

export type RecenzieNoua = {
  nume: string;
  rating: number;
  text: string;
};

export async function adaugaRecenzie(recenzie: RecenzieNoua) {
  const { data, error } = await supabase
    .from('recenzii')
    .insert([{ ...recenzie, status: 'pending' }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
