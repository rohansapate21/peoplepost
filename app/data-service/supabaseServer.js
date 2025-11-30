"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Cookies can only be set in Server Actions or Route Handlers
            // This is expected in some contexts, so we silently ignore
          }
        },
        remove(name, options) {
          try {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          } catch (error) {
            // Cookies can only be removed in Server Actions or Route Handlers
            // This is expected in some contexts, so we silently ignore
          }
        },
      },
    }
  );
}
