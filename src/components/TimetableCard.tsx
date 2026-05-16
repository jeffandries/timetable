"use client";

import type { TimetableItem } from "@/data/timetable";
import type { TimetableState } from "@/lib/timetable";

export function TimetableCard({
  item,
  state,
}: {
  item: TimetableItem;
  state: TimetableState;
}) {
  return (
    <article className={`timetable-card state-${state}`}>
      <div className="card-main">
        <div className="card-meta">
          <span>{item.start}–{item.end}</span>
          <span>{item.area}</span>
          {item.areaLabel ? <span>{item.areaLabel}</span> : null}
        </div>
        <h3>{item.artist}</h3>
        <div className="badges">
          {state === "now" ? <span className="badge badge-now">NOW</span> : null}
          {state === "next" ? <span className="badge badge-next">NEXT</span> : null}
          {item.isLive ? <span className="badge badge-live">LIVE</span> : null}
        </div>
      </div>
    </article>
  );
}
