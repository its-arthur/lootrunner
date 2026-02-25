"use client";

import { useState, useRef } from "react";
import { boons, boonCategories } from "@/data/boons";
import { beacons } from "@/data/beacons";
import { missions } from "@/data/missions";

// ── Type casts for JS data ────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const boonList = boons as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const beaconList = beacons as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const missionList = missions as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryList = boonCategories as any[];

type Tab = "boons" | "beacons" | "missions" | "overview";

// ── Persistence format ────────────────────────────────────────────────────────
interface SaveData {
  version: 1;
  exportedAt: string;
  boons: string[];
  beacons: string[];
  missions: string[];
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

function tierStyle(tier: string): string {
  switch (tier) {
    case "S":
      return "text-amber-300 border-amber-700 bg-amber-950/50";
    case "A":
      return "text-orange-300 border-orange-700 bg-orange-950/50";
    case "B":
      return "text-blue-300 border-blue-700 bg-blue-950/50";
    default:
      return "text-slate-400 border-slate-700 bg-slate-800/40";
  }
}

function comboLabel(id: string): string {
  switch (id) {
    case "flying_chests":
      return "🟡 Flying Chests";
    case "curse_stacking":
      return "🟣 Curse Stacking";
    case "beacon_reroll":
      return "🟠 Beacon Reroll";
    default:
      return id;
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

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("boons");

  // Ordered arrays — index 0 = priority 1
  const [selectedBoons, setSelectedBoons] = useState<string[]>([]);
  const [selectedBeacons, setSelectedBeacons] = useState<string[]>([]);
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);

  // Filters
  const [boonFilter, setBoonFilter] = useState("all");
  const [missionTierFilter, setMissionTierFilter] = useState("all");
  const [missionComboFilter, setMissionComboFilter] = useState("all");

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

  const visibleMissions = missionList.filter((m) => {
    const tierOk =
      missionTierFilter === "all" || m.tier === missionTierFilter;
    const comboOk =
      missionComboFilter === "all" ||
      (Array.isArray(m.combo) && m.combo.includes(missionComboFilter));
    return tierOk && comboOk;
  });

  // ── Tabs config ───────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "boons", label: "Boons", count: selectedBoons.length },
    { id: "beacons", label: "Beacons", count: selectedBeacons.length },
    { id: "missions", label: "Missions", count: selectedMissions.length },
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
          <div className="space-y-5">
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

            {/* Grid */}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {visibleBoons.map((boon) => {
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
                    {/* Selection rank badge */}
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
                      {boon.stackable && (
                        <Badge className="border-slate-700 text-slate-500">
                          stackable
                        </Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
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
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Missions
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Bonus objectives via Grey Beacons. Max 4 per run — stop
                appearing after Challenge 30.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-600">Tier</span>
                {["all", "S", "A", "B", "C"].map((t) => (
                  <FilterPill
                    key={t}
                    active={missionTierFilter === t}
                    onClick={() => setMissionTierFilter(t)}
                  >
                    {t === "all" ? "All" : t}
                  </FilterPill>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-600">Combo</span>
                {[
                  { id: "all", label: "All" },
                  { id: "flying_chests", label: "🟡 Flying Chests" },
                  { id: "curse_stacking", label: "🟣 Curse Stacking" },
                  { id: "beacon_reroll", label: "🟠 Beacon Reroll" },
                ].map(({ id, label }) => (
                  <FilterPill
                    key={id}
                    active={missionComboFilter === id}
                    onClick={() => setMissionComboFilter(id)}
                  >
                    {label}
                  </FilterPill>
                ))}
              </div>
            </div>

            {/* Grid */}
            {visibleMissions.length === 0 ? (
              <EmptyState message="No missions match the current filters." />
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
                        className={`mb-2 flex items-start gap-2 ${selected ? "pr-7" : ""}`}
                      >
                        <span className="flex-1 text-sm font-semibold leading-snug text-slate-100">
                          {mission.name}
                        </span>
                        <Badge className={tierStyle(mission.tier)}>
                          {mission.tier}
                        </Badge>
                      </div>

                      <p className="mb-1.5 text-xs font-medium leading-relaxed text-slate-300">
                        {mission.effect}
                      </p>
                      <p className="mb-2 text-xs leading-relaxed text-slate-500">
                        {mission.description}
                      </p>

                      {Array.isArray(mission.combo) &&
                        mission.combo.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1">
                            {mission.combo.map((c: string) => (
                              <Badge
                                key={c}
                                className="border-slate-700 text-slate-400"
                              >
                                {comboLabel(c)}
                              </Badge>
                            ))}
                          </div>
                        )}

                      {mission.tips && mission.tips.length > 0 && (
                        <ul className="space-y-1">
                          {mission.tips
                            .slice(0, 2)
                            .map((tip: string, i: number) => (
                              <li
                                key={i}
                                className="text-xs text-amber-500/75"
                              >
                                · {tip}
                              </li>
                            ))}
                        </ul>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════
            OVERVIEW
        ══════════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Overview header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">
                  Overview
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  All picks in selection-priority order. Export or import as
                  JSON.
                </p>
              </div>
              <div className="flex gap-2">
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
                  Import JSON
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
                  Export JSON
                </button>
              </div>
            </div>

            {/* Empty state */}
            {totalSelected === 0 && (
              <EmptyState message="Nothing selected yet — head to Boons, Beacons, or Missions to start picking." />
            )}

            {/* ── Selected Boons ── */}
            {selectedBoons.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Boons
                  </h3>
                  <span className="h-px flex-1 bg-slate-800" />
                  <span className="text-xs text-slate-600">
                    {selectedBoons.length} selected
                  </span>
                </div>
                <div className="space-y-1.5">
                  {selectedBoons.map((id, idx) => {
                    const b = boonList.find((x) => x.id === id);
                    if (!b) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5"
                      >
                        <SelectionBadge n={idx + 1} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-100">
                            {b.name}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {b.effect}
                          </p>
                        </div>
                        <Badge className={gamePriorityStyle(b.priority)}>
                          {gamePriorityLabel(b.priority)}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── Selected Beacons ── */}
            {selectedBeacons.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Beacons
                  </h3>
                  <span className="h-px flex-1 bg-slate-800" />
                  <span className="text-xs text-slate-600">
                    {selectedBeacons.length} selected
                  </span>
                </div>
                <div className="space-y-1.5">
                  {selectedBeacons.map((id, idx) => {
                    const b = beaconList.find((x) => x.id === id);
                    if (!b) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5"
                      >
                        <SelectionBadge n={idx + 1} />
                        <span className="text-base leading-none">
                          {b.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-100">
                            {b.name}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {b.effect}
                          </p>
                        </div>
                        {b.color !== "rainbow" && (
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-slate-700"
                            style={{ backgroundColor: b.color }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── Selected Missions ── */}
            {selectedMissions.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Missions
                  </h3>
                  <span className="h-px flex-1 bg-slate-800" />
                  <div className="flex items-center gap-2">
                    {selectedMissions.length > 4 && (
                      <Badge className="border-red-800 bg-red-950/40 text-red-400">
                        ⚠ Over limit
                      </Badge>
                    )}
                    <span className="text-xs text-slate-600">
                      {selectedMissions.length} / 4 selected
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {selectedMissions.map((id, idx) => {
                    const m = missionList.find((x) => x.id === id);
                    if (!m) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5"
                      >
                        <SelectionBadge n={idx + 1} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-100">
                            {m.name}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {m.effect}
                          </p>
                        </div>
                        <Badge className={tierStyle(m.tier)}>{m.tier}</Badge>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
