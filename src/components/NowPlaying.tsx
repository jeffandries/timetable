"use client";

import type { TimetableItem } from "@/data/timetable";
import { getItemId } from "@/lib/timetable";
import type { FestivalIntent } from "@/social-intents/types";
import { TimetableCard } from "./TimetableCard";

export function NowPlaying({
  items,
  emptyMessage,
  socialIntentsByItemId = {},
}: {
  items: TimetableItem[];
  emptyMessage?: string;
  socialIntentsByItemId?: Record<string, FestivalIntent[]>;
}) {
  return (
    <section className="summary-section">
      <div className="section-heading">
        <h2>Now playing</h2>
        <span>{items.length}</span>
      </div>
      {items.length > 0 ? (
        <div className="summary-list now-playing-list">
          {items.map((item) => {
            const itemId = getItemId(item);
            return (
              <TimetableCard
                key={itemId}
                item={item}
                state="now"
                socialIntents={socialIntentsByItemId[itemId] ?? []}
              />
            );
          })}
        </div>
      ) : (
        <p className="empty-copy">{emptyMessage ?? "No active sets right now."}</p>
      )}
    </section>
  );
}
