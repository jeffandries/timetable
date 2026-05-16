"use client";

import type { TimetableItem } from "@/data/timetable";
import type { TimetableState } from "@/lib/timetable";
import { SocialIntentActions } from "@/social-intents/SocialIntentActions";
import { SocialPresence } from "@/social-intents/SocialPresence";
import type { FestivalIntent } from "@/social-intents/types";

export function TimetableCard({
  item,
  state,
  socialIntents = [],
  showSocialActions = false,
  canChooseSocialIntent = false,
  isSelectedSocialIntent = false,
  onChooseSocialIntent,
  onClearSocialIntent,
}: {
  item: TimetableItem;
  state: TimetableState;
  socialIntents?: FestivalIntent[];
  showSocialActions?: boolean;
  canChooseSocialIntent?: boolean;
  isSelectedSocialIntent?: boolean;
  onChooseSocialIntent?: (item: TimetableItem) => void;
  onClearSocialIntent?: () => void;
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
        <SocialPresence intents={socialIntents} />
      </div>
      {showSocialActions && canChooseSocialIntent && onChooseSocialIntent && onClearSocialIntent ? (
        <div className="card-action-slot">
          <SocialIntentActions
            item={item}
            isSelected={isSelectedSocialIntent}
            onChoose={onChooseSocialIntent}
            onClear={onClearSocialIntent}
          />
        </div>
      ) : null}
    </article>
  );
}
