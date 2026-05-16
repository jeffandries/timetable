import { supabasePublishableKey, supabaseUrl } from "./config";
import type { FestivalIntent } from "./types";

const TABLE = "festival_intents";

function getHeaders() {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Supabase social-intent environment variables are missing.");
  }

  return {
    apikey: supabasePublishableKey,
    Authorization: `Bearer ${supabasePublishableKey}`,
    "Content-Type": "application/json",
  };
}

function getTableUrl(query = "") {
  if (!supabaseUrl) {
    throw new Error("Supabase social-intent environment variables are missing.");
  }

  return `${supabaseUrl}/rest/v1/${TABLE}${query}`;
}

async function assertOk(response: Response) {
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${detail}`);
  }
}

export async function fetchAllActiveIntents() {
  const response = await fetch(getTableUrl("?select=*&order=updated_at.desc"), {
    headers: getHeaders(),
    cache: "no-store",
  });
  await assertOk(response);
  return (await response.json()) as FestivalIntent[];
}

export async function upsertCurrentUserIntent(intent: FestivalIntent) {
  const response = await fetch(getTableUrl("?on_conflict=user_id"), {
    method: "POST",
    headers: {
      ...getHeaders(),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(intent),
  });
  await assertOk(response);
  const rows = (await response.json()) as FestivalIntent[];
  return rows[0] ?? intent;
}

export async function clearCurrentUserIntent(userId: string) {
  const response = await fetch(getTableUrl(`?user_id=eq.${encodeURIComponent(userId)}`), {
    method: "DELETE",
    headers: getHeaders(),
  });
  await assertOk(response);
}
