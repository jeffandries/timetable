import type { FestivalIntent } from "./types";

export function SocialPresence({ intents }: { intents: FestivalIntent[] }) {
  if (intents.length === 0) return null;

  const names = intents.map((intent) => intent.display_name);

  return (
    <p className="social-presence">
      <span>Going:</span> {names.join(", ")}
    </p>
  );
}
