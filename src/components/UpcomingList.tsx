"use client";

import type { TimetableItem } from "@/data/timetable";
import { getItemId } from "@/lib/timetable";
import { TimetableCard } from "./TimetableCard";

export function UpcomingList({
  title,
  items,
}: {
  title: string;
  items: TimetableItem[];
}) {
  return (
    <section className="summary-section">
      <div className="section-heading">
        <h2>{title}</h2>
        <span>{items.length}</span>
      </div>
      {items.length > 0 ? (
        <div className="summary-list">
          {items.map((item) => (
            <TimetableCard key={getItemId(item)} item={item} state="next" />
          ))}
        </div>
      ) : (
        <p className="empty-copy">Nothing else scheduled.</p>
      )}
    </section>
  );
}
