export const SUPABASE_URL =
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;

export const SUPABASE_ANON_KEY =
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

export function getSupabaseHeaders() {
  if (!SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase anon key is missing. Add NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };
}
