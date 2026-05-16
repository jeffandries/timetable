import type { TimetableItem } from "@/data/timetable";
import { getItemId, toMinutes } from "@/lib/timetable";
import type { FestivalIntent } from "./types";

export function getInitials(displayName: string) {
  return displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function intentMatchesItem(intent: FestivalIntent, item: TimetableItem) {
  return (
    intent.area === item.area &&
    intent.artist === item.artist &&
    intent.start_time === item.start &&
    intent.end_time === item.end
  );
}

export function getIntentItemId(intent: FestivalIntent) {
  return getItemId({
    area: intent.area,
    artist: intent.artist,
    start: intent.start_time,
    end: intent.end_time,
  });
}

export function isIntentVisible(intent: FestivalIntent, nowMinutes: number) {
  return nowMinutes < toMinutes(intent.end_time);
}
