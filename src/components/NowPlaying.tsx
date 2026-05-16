"use client";

import type { TimetableItem } from "@/data/timetable";
import { getItemId } from "@/lib/timetable";
import { TimetableCard } from "./TimetableCard";

export function NowPlaying({
  items,
  emptyMessage,
}: {
  items: TimetableItem[];
  emptyMessage?: string;
}) {
  return (
    <section className="summary-section">
      <div className="section-heading">
        <h2>Now playing</h2>
        <span>{items.length}</span>
      </div>
      {items.length > 0 ? (
        <div className="summary-list now-playing-list">
          {items.map((item) => (
            <TimetableCard key={getItemId(item)} item={item} state="now" />
          ))}
        </div>
      ) : (
        <p className="empty-copy">{emptyMessage ?? "No active sets right now."}</p>
      )}
    </section>
  );
}
