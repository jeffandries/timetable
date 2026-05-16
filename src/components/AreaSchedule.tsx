"use client";

import type { TimetableItem } from "@/data/timetable";
import { getAreaStates, getItemId } from "@/lib/timetable";
import type { FestivalIntent } from "@/social-intents/types";
import { TimetableCard } from "./TimetableCard";

export function AreaSchedule({
  area,
  items,
  nowMinutes,
  socialIntentsByItemId = {},
  socialIntentsEnabled = false,
  canChooseSocialIntent = false,
  isSelectedSocialIntent,
  onChooseSocialIntent,
  onClearSocialIntent,
}: {
  area: string;
  items: TimetableItem[];
  nowMinutes: number;
  socialIntentsByItemId?: Record<string, FestivalIntent[]>;
  socialIntentsEnabled?: boolean;
  canChooseSocialIntent?: boolean;
  isSelectedSocialIntent?: (item: TimetableItem) => boolean;
  onChooseSocialIntent?: (item: TimetableItem) => void;
  onClearSocialIntent?: () => void;
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
        {states.map(({ item, state }) => {
          const itemId = getItemId(item);
          return (
            <TimetableCard
              key={itemId}
              item={item}
              state={state}
              socialIntents={socialIntentsByItemId[itemId] ?? []}
              showSocialActions={socialIntentsEnabled}
              canChooseSocialIntent={canChooseSocialIntent && state !== "past"}
              isSelectedSocialIntent={isSelectedSocialIntent?.(item)}
              onChooseSocialIntent={onChooseSocialIntent}
              onClearSocialIntent={onClearSocialIntent}
            />
          );
        })}
      </div>
    </section>
  );
}
