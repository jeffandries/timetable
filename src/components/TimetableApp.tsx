"use client";

import { useEffect, useMemo, useState } from "react";
import { AREAS, timetable } from "@/data/timetable";
import {
  formatClock,
  getCurrentMinutes,
  getItemId,
  getItemState,
  getNextItem,
  groupByArea,
  isFestivalActive,
  toMinutes,
} from "@/lib/timetable";
import { AreaSchedule } from "./AreaSchedule";
import { AreaTabs, type ActiveTab } from "./AreaTabs";
import { NowPlaying } from "./NowPlaying";
import { UpcomingList } from "./UpcomingList";
import { ProfileMenu, ProfileSetup } from "@/social-intents/ProfileSetup";
import { useSocialIntents } from "@/social-intents/useSocialIntents";

export function TimetableApp() {
  const [now, setNow] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [activeView, setActiveView] = useState<"timetable" | "map">("timetable");
  const [search, setSearch] = useState("");
  const nowMinutes = now ? getCurrentMinutes(now) : -1;
  const social = useSocialIntents(nowMinutes);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = useMemo(() => {
    return timetable.filter((item) => {
      const matchesSearch = normalizedSearch === "" || item.artist.toLowerCase().includes(normalizedSearch);
      const matchesTab = activeTab === "all" || item.area === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [activeTab, normalizedSearch]);

  const allAreaGroups = groupByArea(filteredItems);
  const activeNow = filteredItems.filter((item) => getItemState(item, nowMinutes) === "now");

  const nextItems = useMemo(() => {
    if (activeTab !== "all") {
      const next = getNextItem(filteredItems, nowMinutes);
      return next ? [next] : [];
    }

    return AREAS.map((area) => getNextItem(timetable.filter((item) => item.area === area), nowMinutes)).filter(
      (item): item is (typeof timetable)[number] => Boolean(item),
    );
  }, [activeTab, filteredItems, nowMinutes]);

  const beforeFestival = nowMinutes < toMinutes("13:00");
  const afterFestival = nowMinutes >= toMinutes("23:00");

  // Future feature: use geolocation or manual area check-in to suggest nearest area.

  return (
    <main className="app-shell">
      <header className="sticky-header">
        <div className="hero-row">
          <div>
            <p className="eyebrow">Festival timetable</p>
            <h1>Awakenings Sunday</h1>
          </div>
          <div className="hero-actions">
            <div className="clock-block">
              <strong>{now ? formatClock(now) : "--:--"}</strong>
              {now && isFestivalActive(nowMinutes) ? <span>Now</span> : null}
            </div>
            {social.enabled && social.profile?.displayName ? (
              <ProfileMenu displayName={social.profile.displayName} onSave={social.saveDisplayName} />
            ) : null}
          </div>
        </div>

        <div className="view-switch" role="tablist" aria-label="Primary view">
          <button
            type="button"
            role="tab"
            aria-selected={activeView === "timetable"}
            className={activeView === "timetable" ? "is-active" : ""}
            onClick={() => setActiveView("timetable")}
          >
            Timetable
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeView === "map"}
            className={activeView === "map" ? "is-active" : ""}
            onClick={() => setActiveView("map")}
          >
            Map
          </button>
        </div>

        {activeView === "timetable" ? (
          <>
            <label className="search-field">
          <span className="sr-only">Search artists</span>
          <input
            type="search"
            placeholder="Search artist"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
            </label>

            <AreaTabs activeTab={activeTab} onChange={setActiveTab} />
          </>
        ) : null}
      </header>

      {activeView === "timetable" ? (
        <div className="content-stack">
        {social.enabled && social.profile && !social.profile.displayName ? (
          <ProfileSetup displayName={social.profile.displayName} onSave={social.saveDisplayName} />
        ) : null}

        <NowPlaying
          items={activeNow}
          socialIntentsByItemId={social.intentsByItemId}
          socialIntentsEnabled={social.enabled}
          canChooseSocialIntent={Boolean(social.profile?.displayName)}
          isSelectedSocialIntent={social.isSelected}
          onChooseSocialIntent={social.chooseIntent}
          onClearSocialIntent={social.clearIntent}
          emptyMessage={
            beforeFestival
              ? "The first sets start at 13:00."
              : afterFestival
                ? "The festival day has ended."
                : "No active sets right now."
          }
        />

        <UpcomingList
          title="Coming up next"
          items={nextItems}
          socialIntentsByItemId={social.intentsByItemId}
          socialIntentsEnabled={social.enabled}
          canChooseSocialIntent={Boolean(social.profile?.displayName)}
          isSelectedSocialIntent={social.isSelected}
          onChooseSocialIntent={social.chooseIntent}
          onClearSocialIntent={social.clearIntent}
        />

        {activeTab === "all" ? (
          AREAS.map((area) => {
            const items = allAreaGroups[area] ?? [];
            return items.length > 0 ? (
              <AreaSchedule
                key={area}
                area={area}
                items={items}
                nowMinutes={nowMinutes}
                socialIntentsByItemId={social.intentsByItemId}
                socialIntentsEnabled={social.enabled}
                canChooseSocialIntent={Boolean(social.profile?.displayName)}
                isSelectedSocialIntent={social.isSelected}
                onChooseSocialIntent={social.chooseIntent}
                onClearSocialIntent={social.clearIntent}
              />
            ) : null;
          })
        ) : (
          <AreaSchedule
            area={activeTab}
            items={filteredItems}
            nowMinutes={nowMinutes}
            socialIntentsByItemId={social.intentsByItemId}
            socialIntentsEnabled={social.enabled}
            canChooseSocialIntent={Boolean(social.profile?.displayName)}
            isSelectedSocialIntent={social.isSelected}
            onChooseSocialIntent={social.chooseIntent}
            onClearSocialIntent={social.clearIntent}
          />
        )}
        </div>
      ) : (
        <section className="map-view" aria-label="Festival map">
          <img src="/map.jpg" alt="Awakenings Sunday festival map" />
        </section>
      )}
    </main>
  );
}
