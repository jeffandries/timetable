"use client";

import type { TimetableItem } from "@/data/timetable";
import { getItemId } from "@/lib/timetable";
import type { FestivalIntent } from "@/social-intents/types";
import { TimetableCard } from "./TimetableCard";

export function UpcomingList({
  title,
  items,
  socialIntentsByItemId = {},
}: {
  title: string;
  items: TimetableItem[];
  socialIntentsByItemId?: Record<string, FestivalIntent[]>;
}) {
  return (
    <section className="summary-section">
      <div className="section-heading">
        <h2>{title}</h2>
        <span>{items.length}</span>
      </div>
      {items.length > 0 ? (
        <div className="summary-list">
          {items.map((item) => {
            const itemId = getItemId(item);
            return (
              <TimetableCard
                key={itemId}
                item={item}
                state="next"
                socialIntents={socialIntentsByItemId[itemId] ?? []}
              />
            );
          })}
        </div>
      ) : (
        <p className="empty-copy">Nothing else scheduled.</p>
      )}
    </section>
  );
}
