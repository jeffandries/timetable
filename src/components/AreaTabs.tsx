"use client";

import { AREAS } from "@/data/timetable";

export type ActiveTab = "all" | (typeof AREAS)[number];

export function AreaTabs({ activeTab, onChange }: { activeTab: ActiveTab; onChange: (tab: ActiveTab) => void }) {
  const tabs: ActiveTab[] = ["all", ...AREAS];

  return (
    <nav className="area-tabs" aria-label="Timetable filters">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`area-tab ${activeTab === tab ? "is-active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab === "all" ? "All" : tab}
        </button>
      ))}
    </nav>
  );
}
