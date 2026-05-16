"use client";

import type { TimetableItem } from "@/data/timetable";
import { getAreaStates, getItemId } from "@/lib/timetable";
import { TimetableCard } from "./TimetableCard";

export function AreaSchedule({
  area,
  items,
  nowMinutes,
}: {
  area: string;
  items: TimetableItem[];
  nowMinutes: number;
}) {
  const states = getAreaStates(items, nowMinutes);
  const areaLabel = items.find((item) => item.areaLabel)?.areaLabel;

  return (
    <section className="area-section">
      <div className="section-heading area-heading">
        <div>
          <h2>{area}</h2>
          {areaLabel ? <p>{areaLabel}</p> : null}
        </div>
      </div>
      <div className="schedule-list">
        {states.map(({ item, state }) => (
          <TimetableCard key={getItemId(item)} item={item} state={state} />
        ))}
      </div>
    </section>
  );
}
