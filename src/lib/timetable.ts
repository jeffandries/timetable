import type { TimetableItem } from "@/data/timetable";

export type TimetableState = "past" | "now" | "next" | "upcoming";

export const FESTIVAL_START = "13:00";
export const FESTIVAL_END = "23:00";

export function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatClock(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function getCurrentMinutes(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function isFestivalActive(nowMinutes: number) {
  return nowMinutes >= toMinutes(FESTIVAL_START) && nowMinutes < toMinutes(FESTIVAL_END);
}

export function getItemState(item: TimetableItem, nowMinutes: number): TimetableState {
  const start = toMinutes(item.start);
  const end = toMinutes(item.end);

  if (nowMinutes >= start && nowMinutes < end) return "now";
  if (nowMinutes >= end) return "past";

  return "upcoming";
}

export function getNextItem(items: TimetableItem[], nowMinutes: number) {
  return [...items]
    .filter((item) => toMinutes(item.start) > nowMinutes)
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start))[0];
}

export function getAreaStates(items: TimetableItem[], nowMinutes: number) {
  const nextItem = getNextItem(items, nowMinutes);

  return items.map((item) => {
    const baseState = getItemState(item, nowMinutes);
    return {
      item,
      state: baseState === "upcoming" && nextItem === item ? "next" : baseState,
    };
  });
}

export function groupByArea(items: TimetableItem[]) {
  return items.reduce<Record<string, TimetableItem[]>>((groups, item) => {
    groups[item.area] ??= [];
    groups[item.area].push(item);
    return groups;
  }, {});
}

export function getItemId(item: TimetableItem) {
  return `${item.area}-${item.start}-${item.artist}`;
}
