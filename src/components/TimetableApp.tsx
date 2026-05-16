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

export function TimetableApp() {
  const [now, setNow] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [activeView, setActiveView] = useState<"timetable" | "map">("timetable");
  const [previewTime, setPreviewTime] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const liveMinutes = now ? getCurrentMinutes(now) : -1;
  const nowMinutes = previewTime ? toMinutes(previewTime) : liveMinutes;

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
          <div className="clock-block">
            <strong>{previewTime ?? (now ? formatClock(now) : "--:--")}</strong>
            {now && isFestivalActive(nowMinutes) ? <span>{previewTime ? "Preview" : "Now"}</span> : null}
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
            <div className="preview-row">
          <button
            type="button"
            className={`preview-button ${previewTime ? "is-active" : ""}`}
            onClick={() => setPreviewTime((current) => (current ? null : "15:00"))}
          >
            {previewTime ? "Back to live time" : "Preview 15:00"}
          </button>
        </div>

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
        <NowPlaying
          items={activeNow}
          emptyMessage={
            beforeFestival
              ? "The first sets start at 13:00."
              : afterFestival
                ? "The festival day has ended."
                : "No active sets right now."
          }
        />

        <UpcomingList title="Coming up next" items={nextItems} />

        {activeTab === "all" ? (
          AREAS.map((area) => {
            const items = allAreaGroups[area] ?? [];
            return items.length > 0 ? (
              <AreaSchedule
                key={area}
                area={area}
                items={items}
                nowMinutes={nowMinutes}
              />
            ) : null;
          })
        ) : (
          <AreaSchedule
            area={activeTab}
            items={filteredItems}
            nowMinutes={nowMinutes}
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
