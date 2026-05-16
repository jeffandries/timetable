"use client";

import type { TimetableItem } from "@/data/timetable";

export function SocialIntentActions({
  item,
  isSelected,
  onChoose,
  onClear,
}: {
  item: TimetableItem;
  isSelected: boolean;
  onChoose: (item: TimetableItem) => void;
  onClear: () => void;
}) {
  return (
    <button
      type="button"
      className={`social-intent-toggle${isSelected ? " is-selected" : ""}`}
      aria-label={isSelected ? "Clear where I’m going" : "I’m going here"}
      aria-pressed={isSelected}
      onClick={() => (isSelected ? onClear() : onChoose(item))}
    >
      <span className="social-intent-star" aria-hidden="true">
        🤩
      </span>
      <span className="social-intent-label">I’m going</span>
    </button>
  );
}
