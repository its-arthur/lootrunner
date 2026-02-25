"use client";

import { useState, useRef } from "react";
import { boons, boonCategories } from "@/data/boons";
import { beacons } from "@/data/beacons";
import { missions } from "@/data/missions";
import { stats, statCategories } from "@/data/stats";

// ── Type casts for JS data ────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const boonList = boons as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const beaconList = beacons as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const missionList = missions as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryList = boonCategories as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const statCategoryList = statCategories as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const statList = stats as any[];

type Tab = "boons" | "beacons" | "missions" | "stats" | "overview";

// ── Persistence format ────────────────────────────────────────────────────────
interface SaveData {
  version: 1;
  exportedAt: string;
  boons: string[];
  beacons: string[];
  missions: string[];
  statsInOverview: string[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function gamePriorityStyle(priority: string): string {
  switch (priority) {
    case "highest":
      return "text-red-400 border-red-800 bg-red-950/40";
    case "high":
      return "text-orange-400 border-orange-800 bg-orange-950/40";
    case "medium":
      return "text-yellow-400 border-yellow-800 bg-yellow-950/40";
    default:
      return "text-slate-400 border-slate-700 bg-slate-800/40";
  }
}

function gamePriorityLabel(priority: string): string {
  switch (priority) {
    case "highest":
      return "Highest";
    case "high":
      return "High";
    case "medium":
      return "Medium";
    default:
      return "Low";
  }
}

function downloadJson(data: SaveData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lootrunner-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Shared atoms ──────────────────────────────────────────────────────────────

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function SelectionBadge({ n }: { n: number }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-900">
      {n}
    </span>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-slate-400 bg-slate-700 text-slate-100"
          : "border-slate-700 bg-transparent text-slate-400 hover:border-slate-500 hover:text-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-800 py-10 text-center">
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

// Shadcn-style card for Overview
function OverviewCard({
  title,
  count,
  emptyMessage,
  children,
  className = "",
}: {
  title: string;
  count: number;
  emptyMessage: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex h-full min-h-0 flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm ${className}`.trim()}>
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--border)] px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          {title}
        </span>
        <span className="rounded-md bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-[var(--foreground)]">
          {count}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {count === 0 ? (
          <p className="text-[11px] text-[var(--muted-foreground)]">{emptyMessage}</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

// Compact item card for overview lists (each row = one card)
function OverviewItemCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border border-[var(--border)] bg-[var(--muted)]/30 px-2.5 py-1.5 ${className}`}
    >
      {children}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("boons");

  // Ordered arrays — index 0 = priority 1
  const [selectedBoons, setSelectedBoons] = useState<string[]>([]);
  const [selectedBeacons, setSelectedBeacons] = useState<string[]>([]);
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);
  // Stats to show in Overview (by stat id)
  const [statsInOverview, setStatsInOverview] = useState<string[]>([]);
  const [statFilter, setStatFilter] = useState("all");

  // Filters
  const [boonFilter, setBoonFilter] = useState("all");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Selection helpers ─────────────────────────────────────────────────────
  function toggle(
    id: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    setter(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }

  function rank(id: string, list: string[]): number {
    const i = list.indexOf(id);
    return i === -1 ? 0 : i + 1;
  }

  // ── Import / Export ───────────────────────────────────────────────────────
  function handleExport() {
    downloadJson({
      version: 1,
      exportedAt: new Date().toISOString(),
      boons: selectedBoons,
      beacons: selectedBeacons,
      missions: selectedMissions,
      statsInOverview,
    });
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target?.result as string) as SaveData;
        if (data.version === 1) {
          setSelectedBoons(Array.isArray(data.boons) ? data.boons : []);
          setSelectedBeacons(Array.isArray(data.beacons) ? data.beacons : []);
          setSelectedMissions(Array.isArray(data.missions) ? data.missions : []);
          setStatsInOverview(
            Array.isArray(data.statsInOverview) ? data.statsInOverview : []
          );
        }
      } catch {
        alert("Could not parse file — make sure it's a valid Lootrunner JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  // ── Derived lists ─────────────────────────────────────────────────────────
  const visibleBoons =
    boonFilter === "all"
      ? boonList
      : boonList.filter((b) => b.category === boonFilter);

  const visibleMissions = missionList;

  const visibleStats =
    statFilter === "all"
      ? statList
      : statList.filter((s) => s.category === statFilter);

  // ── Tabs config ───────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "boons", label: "Boons", count: selectedBoons.length },
    { id: "beacons", label: "Beacons", count: selectedBeacons.length },
    { id: "missions", label: "Missions", count: selectedMissions.length },
    { id: "stats", label: "Stats", count: statsInOverview.length },
    { id: "overview", label: "Overview" },
  ];

  const totalSelected =
    selectedBoons.length + selectedBeacons.length + selectedMissions.length;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#020817]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#020817]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-slate-100">
                Lootrunner
              </span>
              <span className="hidden rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-500 sm:inline">
                Wynncraft
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-transparent px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-slate-500 hover:text-slate-200"
              >
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M8 2v9M4 7l4 4 4-4M2 13h12" />
                </svg>
                Import
              </button>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-700"
              >
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M8 11V2M4 6l4-4 4 4M2 13h12" />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* Tab bar */}
          <div className="-mb-px flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none ${
                  activeTab === tab.id
                    ? "text-slate-100 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-slate-100"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab.label}
                {typeof tab.count === "number" && tab.count > 0 && (
                  <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-slate-700 px-1 text-[10px] font-semibold text-slate-300">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* ══════════════════════════════════════════════
            BOONS
        ══════════════════════════════════════════════ */}
        {activeTab === "boons" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">Boons</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Offered on Blue Beacon completion. Click to pick — selection
                order sets priority.
              </p>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-1.5">
              <FilterPill
                active={boonFilter === "all"}
                onClick={() => setBoonFilter("all")}
              >
                All
              </FilterPill>
              {categoryList.map((cat) => (
                <FilterPill
                  key={cat.id}
                  active={boonFilter === cat.id}
                  onClick={() => setBoonFilter(cat.id)}
                >
                  {cat.label}
                </FilterPill>
              ))}
            </div>

            {/* Sections by category */}
            {categoryList
              .filter((cat) => boonFilter === "all" || cat.id === boonFilter)
              .map((cat) => {
                const boonsInCategory = boonList.filter(
                  (b) => b.category === cat.id
                );
                if (boonsInCategory.length === 0) return null;
                return (
                  <section key={cat.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {cat.label}
                      </h3>
                      <span className="h-px flex-1 bg-slate-800" />
                      <span className="text-xs text-slate-600">
                        {boonsInCategory.length} boons
                      </span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {boonsInCategory.map((boon) => {
                        const r = rank(boon.id, selectedBoons);
                        const selected = r > 0;
                        return (
                          <button
                            key={boon.id}
                            onClick={() =>
                              toggle(boon.id, selectedBoons, setSelectedBoons)
                            }
                            className={`group relative text-left rounded-lg border p-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                              selected
                                ? "border-slate-500 bg-slate-800/70 shadow-sm"
                                : "border-slate-800 bg-slate-900 hover:border-slate-600 hover:bg-slate-800/40"
                            }`}
                          >
                            {selected && (
                              <div className="absolute right-3 top-3">
                                <SelectionBadge n={r} />
                              </div>
                            )}
                            <div className={`mb-2 ${selected ? "pr-7" : ""}`}>
                              <p className="text-sm font-semibold text-slate-100 leading-snug">
                                {boon.name}
                              </p>
                            </div>
                            <p className="mb-1.5 text-xs font-medium text-slate-300">
                              {boon.effect}
                            </p>
                            <p className="text-xs leading-relaxed text-slate-500">
                              {boon.description}
                            </p>
                            {boon.notes && (
                              <p className="mt-2 text-xs italic leading-snug text-amber-500/80">
                                {boon.notes}
                              </p>
                            )}
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              <Badge className={gamePriorityStyle(boon.priority)}>
                                {gamePriorityLabel(boon.priority)}
                              </Badge>
                              <Badge className="border-slate-700 text-slate-500">
                                {boon.type}
                              </Badge>
                              {boon.maxStacks != null && (
                                <Badge className="border-slate-700 text-slate-500">
                                  max ×{boon.maxStacks}
                                </Badge>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
          </div>
        )}

        {/* ══════════════════════════════════════════════
            BEACONS
        ══════════════════════════════════════════════ */}
        {activeTab === "beacons" && (
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">Beacons</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Challenge types offered after each completed challenge. Click to
                pick.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {beaconList.map((beacon) => {
                const r = rank(beacon.id, selectedBeacons);
                const selected = r > 0;
                return (
                  <button
                    key={beacon.id}
                    onClick={() =>
                      toggle(beacon.id, selectedBeacons, setSelectedBeacons)
                    }
                    className={`group relative text-left rounded-lg border p-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                      selected
                        ? "border-slate-500 bg-slate-800/70 shadow-sm"
                        : "border-slate-800 bg-slate-900 hover:border-slate-600 hover:bg-slate-800/40"
                    }`}
                  >
                    {selected && (
                      <div className="absolute right-3 top-3">
                        <SelectionBadge n={r} />
                      </div>
                    )}

                    <div
                      className={`mb-2 flex items-center gap-2 ${selected ? "pr-7" : ""}`}
                    >
                      <span className="text-lg leading-none">
                        {beacon.emoji}
                      </span>
                      <span className="flex-1 text-sm font-semibold leading-snug text-slate-100">
                        {beacon.name}
                      </span>
                      {beacon.color !== "rainbow" && (
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-slate-700"
                          style={{ backgroundColor: beacon.color }}
                        />
                      )}
                    </div>

                    <p className="mb-1.5 text-xs font-medium text-slate-300">
                      {beacon.effect}
                    </p>
                    <p className="mb-2 text-xs leading-relaxed text-slate-500">
                      {beacon.description}
                    </p>

                    {beacon.tips && beacon.tips.length > 0 && (
                      <ul className="space-y-1">
                        {beacon.tips.map((tip: string, i: number) => (
                          <li key={i} className="text-xs text-amber-500/75">
                            · {tip}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-3">
                      <Badge className="border-slate-700 text-slate-500">
                        {beacon.category}
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            MISSIONS
        ══════════════════════════════════════════════ */}
        {activeTab === "missions" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Missions
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Bonus objectives via Grey Beacons. Max 4 per run — stop
                appearing after Challenge 30.
              </p>
            </div>

            {/* Grid — wiki only has Name + Reward Effect */}
            {visibleMissions.length === 0 ? (
              <EmptyState message="No missions loaded." />
            ) : (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {visibleMissions.map((mission) => {
                  const r = rank(mission.id, selectedMissions);
                  const selected = r > 0;
                  return (
                    <button
                      key={mission.id}
                      onClick={() =>
                        toggle(
                          mission.id,
                          selectedMissions,
                          setSelectedMissions
                        )
                      }
                      className={`group relative text-left rounded-lg border p-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                        selected
                          ? "border-slate-500 bg-slate-800/70 shadow-sm"
                          : "border-slate-800 bg-slate-900 hover:border-slate-600 hover:bg-slate-800/40"
                      }`}
                    >
                      {selected && (
                        <div className="absolute right-3 top-3">
                          <SelectionBadge n={r} />
                        </div>
                      )}
                      <div
                        className={`mb-2 ${selected ? "pr-7" : ""}`}
                      >
                        <span className={`text-sm font-semibold leading-snug ${mission.nameColor ?? "text-slate-100"}`}>
                          {mission.name}
                        </span>
                      </div>
                      <p className="text-xs font-medium leading-relaxed text-slate-300">
                        {mission.effect}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STATS
        ══════════════════════════════════════════════ */}
        {activeTab === "stats" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">Stats</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Toggle which stats to show in the Overview tab. From{" "}
                <a
                  href="https://wynncraft.wiki.gg/wiki/Identifications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 underline hover:text-slate-300"
                >
                  Identifications
                </a>
                .
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <FilterPill
                active={statFilter === "all"}
                onClick={() => setStatFilter("all")}
              >
                All
              </FilterPill>
              {statCategoryList.map((cat) => (
                <FilterPill
                  key={cat.id}
                  active={statFilter === cat.id}
                  onClick={() => setStatFilter(cat.id)}
                >
                  {cat.label}
                </FilterPill>
              ))}
            </div>

            {visibleStats.length > 0 &&
              statCategoryList
                .filter((cat) => statFilter === "all" || cat.id === statFilter)
                .map((cat) => {
                  const statsInCategory = statList.filter(
                    (s) => s.category === cat.id
                  );
                  if (statsInCategory.length === 0) return null;
                  return (
                    <section key={cat.id} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {cat.label}
                        </h3>
                        <span className="h-px flex-1 bg-slate-800" />
                        <span className="text-xs text-slate-600">
                          {statsInCategory.length} stats
                        </span>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {statsInCategory.map((stat) => {
                          const inOverview = statsInOverview.includes(stat.id);
                          return (
                            <button
                              key={stat.id}
                              onClick={() =>
                                toggle(
                                  stat.id,
                                  statsInOverview,
                                  setStatsInOverview
                                )
                              }
                              className={`group relative text-left rounded-lg border p-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${inOverview
                                  ? "border-slate-500 bg-slate-800/70 shadow-sm"
                                  : "border-slate-800 bg-slate-900 hover:border-slate-600 hover:bg-slate-800/40"
                                }`}
                            >
                              {inOverview && (
                                <div className="absolute right-3 top-3">
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                                    ✓
                                  </span>
                                </div>
                              )}
                              <p
                                className={`text-sm font-semibold text-slate-100 leading-snug ${inOverview ? "pr-7" : ""
                                  }`}
                              >
                                {stat.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {inOverview
                                  ? "Shown in Overview"
                                  : "Click to show in Overview"}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
          </div>
        )}

        {/* ══════════════════════════════════════════════
            OVERVIEW — single-screen dashboard
        ══════════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <div className="flex h-[calc(100vh-8rem)] max-h-[720px] flex-col gap-3">
            {/* Header: title + actions */}
            <div className="flex shrink-0 items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-[var(--foreground)]">
                  Overview
                </h2>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  Priority order · Export/import JSON
                </p>
              </div>
            </div>

            {/* Empty state when nothing selected */}
            {totalSelected === 0 && statsInOverview.length === 0 && (
              <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)]">
                <p className="text-center text-sm text-[var(--muted-foreground)]">
                  Nothing selected — pick Boons, Beacons, Missions, or Stats in their tabs.
                </p>
              </div>
            )}

            {/* Bento grid: Row1 Beacons(1) | Boons(2) | Row2 Missions(2) | Stats(1) */}
            {(totalSelected > 0 || statsInOverview.length > 0) && (
              <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-3 sm:grid-rows-2">
                {/* Beacons — top left (1 cell) */}
                <OverviewCard
                  title="Beacons"
                  count={selectedBeacons.length}
                  emptyMessage="No beacons selected"
                >
                  <ul className="space-y-1.5 text-[11px]">
                    {selectedBeacons.map((id, idx) => {
                      const b = beaconList.find((x) => x.id === id);
                      if (!b) return null;
                      return (
                        <li key={id}>
                          <OverviewItemCard>
                            <div className="flex items-center gap-2">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[var(--accent)] font-mono text-[10px] font-semibold text-[var(--foreground)]">
                                {idx + 1}
                              </span>
                              <span className="shrink-0 text-base leading-none">{b.emoji}</span>
                              <span className="min-w-0 truncate font-medium text-[var(--foreground)]">{b.name}</span>
                            </div>
                          </OverviewItemCard>
                        </li>
                      );
                    })}
                  </ul>
                </OverviewCard>

                {/* Boons — top right (spans 2 cols) */}
                <OverviewCard
                  title="Boons"
                  count={selectedBoons.length}
                  emptyMessage="No boons selected"
                  className="sm:col-span-2"
                >
                  <ul className="space-y-1.5 text-[11px]">
                    {selectedBoons.map((id, idx) => {
                      const b = boonList.find((x) => x.id === id);
                      if (!b) return null;
                      return (
                        <li key={id}>
                          <OverviewItemCard>
                            <div className="flex items-center gap-2">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[var(--accent)] font-mono text-[10px] font-semibold text-[var(--foreground)]">
                                {idx + 1}
                              </span>
                              <span className="min-w-0 flex-1 truncate font-medium text-[var(--foreground)]">{b.name}</span>
                              <Badge className={gamePriorityStyle(b.priority)}>{gamePriorityLabel(b.priority)}</Badge>
                            </div>
                          </OverviewItemCard>
                        </li>
                      );
                    })}
                  </ul>
                </OverviewCard>

                {/* Missions — bottom left (spans 2 cols) */}
                <OverviewCard
                  title="Missions"
                  count={selectedMissions.length}
                  emptyMessage="No missions selected"
                  className="sm:col-span-2"
                >
                  <div className="space-y-1.5">
                    {selectedMissions.length > 4 && (
                      <p className="text-[10px] text-amber-500">Max 4 per run — you have {selectedMissions.length}</p>
                    )}
                    <ul className="space-y-1.5 text-[11px]">
                      {selectedMissions.map((id, idx) => {
                        const m = missionList.find((x) => x.id === id);
                        if (!m) return null;
                        return (
                          <li key={id}>
                            <OverviewItemCard>
                              <div className="flex items-center gap-2">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[var(--accent)] font-mono text-[10px] font-semibold text-[var(--foreground)]">
                                  {idx + 1}
                                </span>
                                <span className={`min-w-0 flex-1 truncate font-medium ${m.nameColor ?? "text-[var(--foreground)]"}`}>{m.name}</span>
                              </div>
                            </OverviewItemCard>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </OverviewCard>

                {/* Stats — bottom right (1 cell), grouped by category */}
                <OverviewCard
                  title="Stats"
                  count={statsInOverview.length}
                  emptyMessage="None selected for overview"
                >
                  <div className="space-y-3">
                    {statCategoryList.map((cat) => {
                      const statsInCategory = statsInOverview.filter((id) => {
                        const s = statList.find((x) => x.id === id);
                        return s && s.category === cat.id;
                      });
                      if (statsInCategory.length === 0) return null;
                      return (
                        <div key={cat.id} className="space-y-1.5">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                            {cat.label}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {statsInCategory.map((id) => {
                              const s = statList.find((x) => x.id === id);
                              if (!s) return null;
                              return (
                                <OverviewItemCard key={id} className="inline-flex w-fit">
                                  <span className="text-[11px] font-medium text-[var(--foreground)]">{s.name}</span>
                                </OverviewItemCard>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </OverviewCard>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
