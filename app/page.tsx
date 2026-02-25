"use client";

import { useState } from "react";
import { boons, boonCategories } from "@/data/boons";
import { beacons } from "@/data/beacons";
import { missions } from "@/data/missions";

type Tab = "quickpick" | "boons" | "beacons" | "missions";
type FocusId = "flying_chests" | "curse_stacking" | "beacon_reroll";

const focusConfig: Record<
  FocusId,
  {
    label: string;
    emoji: string;
    description: string;
    boonIds: string[];
    beaconIds: string[];
    missionIds: string[];
    tip: string;
  }
> = {
  flying_chests: {
    label: "Flying Chests",
    emoji: "🟡",
    description:
      "Farm flying chests for Mythic items. Maximize loot from every chest.",
    boonIds: [
      "loot_bonus",
      "loot_quality",
      "looter",
      "hp_regen",
      "spell_damage",
    ],
    beaconIds: ["yellow", "grey", "blue", "aqua", "orange", "white"],
    missionIds: [
      "jesters_trick",
      "interest_scheme",
      "hoarder",
      "orphions_grace",
      "cleansing_ritual",
      "materialism",
    ],
    tip: "If Jester's Trick, Interest Scheme, or Hoarder don't appear in your first mission offers, consider restarting (/kill).",
  },
  curse_stacking: {
    label: "Curse Stacking",
    emoji: "🟣",
    description:
      "Intentionally accumulate 8+ Curses to power up the Curse Harvest static boon.",
    boonIds: [
      "curse_scaling_static",
      "life_steal",
      "hp_regen",
      "health_bonus",
      "spell_damage",
      "dexterity",
    ],
    beaconIds: ["purple", "dark_grey", "grey", "blue", "green"],
    missionIds: [
      "equilibrium",
      "porphyrophobia",
      "cleansing_ritual",
      "high_roller",
      "redemption",
      "inner_peace",
    ],
    tip: "Stack 8+ Curses before taking the Curse Harvest static boon. Cleansing Ritual lets you safely manage Curse count.",
  },
  beacon_reroll: {
    label: "Beacon Reroll Spam",
    emoji: "🟠",
    description:
      "Maximize beacon choices and rerolls. Always Aqua-boost Grey Beacons.",
    boonIds: [
      "loot_bonus",
      "loot_quality",
      "spell_damage",
      "walk_speed",
      "dexterity",
    ],
    beaconIds: ["orange", "grey", "aqua", "green", "blue", "white"],
    missionIds: [
      "gourmand",
      "optimism",
      "backup_beat",
      "thrill_seeker",
      "orphions_grace",
      "cleansing_ritual",
    ],
    tip: "Always Aqua-boost Grey Beacons. Four beacon choices (+2 from Orange) is optimal.",
  },
};

function priorityBadge(priority: string) {
  switch (priority) {
    case "highest":
      return "bg-red-500 text-white";
    case "high":
      return "bg-orange-500 text-white";
    case "medium":
      return "bg-yellow-500 text-black";
    default:
      return "bg-zinc-600 text-zinc-200";
  }
}

function tierBadge(tier: string) {
  switch (tier) {
    case "S":
      return "bg-amber-400 text-black";
    case "A":
      return "bg-orange-500 text-white";
    case "B":
      return "bg-blue-500 text-white";
    default:
      return "bg-zinc-600 text-zinc-200";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const boonList = boons as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const beaconList = beacons as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const missionList = missions as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryList = boonCategories as any[];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("quickpick");
  const [selectedFocus, setSelectedFocus] = useState<FocusId | null>(null);
  const [selectedBoons, setSelectedBoons] = useState<Set<string>>(new Set());
  const [selectedBeacons, setSelectedBeacons] = useState<Set<string>>(
    new Set()
  );
  const [selectedMissions, setSelectedMissions] = useState<Set<string>>(
    new Set()
  );
  const [boonFilter, setBoonFilter] = useState("all");
  const [missionTierFilter, setMissionTierFilter] = useState("all");
  const [missionComboFilter, setMissionComboFilter] = useState("all");

  function toggle(
    id: string,
    set: Set<string>,
    setter: (s: Set<string>) => void
  ) {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setter(next);
  }

  function applyFocus(focusId: FocusId) {
    const cfg = focusConfig[focusId];
    setSelectedFocus(focusId);
    setSelectedBoons(new Set(cfg.boonIds));
    setSelectedBeacons(new Set(cfg.beaconIds));
    setSelectedMissions(new Set(cfg.missionIds));
  }

  const filteredBoons =
    boonFilter === "all"
      ? boonList
      : boonList.filter((b) => b.category === boonFilter);

  const filteredMissions = missionList.filter((m) => {
    const tierOk = missionTierFilter === "all" || m.tier === missionTierFilter;
    const comboOk =
      missionComboFilter === "all" ||
      (m.combo && m.combo.includes(missionComboFilter));
    return tierOk && comboOk;
  });

  const tabs = [
    { id: "quickpick" as Tab, label: "⚡ Quick Pick" },
    { id: "boons" as Tab, label: "✨ Boons" },
    { id: "beacons" as Tab, label: "🔮 Beacons" },
    { id: "missions" as Tab, label: "📋 Missions" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            ⚔️ Lootrunner
          </h1>
          <p className="text-sm text-zinc-400">
            Wynncraft Lootrunning Companion
          </p>
        </div>
      </header>

      {/* Tab bar */}
      <nav className="border-b border-zinc-800 bg-zinc-900/50 px-6">
        <div className="mx-auto max-w-6xl flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* ── QUICK PICK ── */}
        {activeTab === "quickpick" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">
                Choose Your Focus
              </h2>
              <p className="text-sm text-zinc-400">
                Pick a run strategy and we'll auto-select the best Boons,
                Beacons, and Missions for you.
              </p>
            </div>

            {/* Focus cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {(Object.entries(focusConfig) as [FocusId, (typeof focusConfig)[FocusId]][]).map(
                ([id, cfg]) => (
                  <button
                    key={id}
                    onClick={() => applyFocus(id)}
                    className={`text-left rounded-xl border p-5 transition-all ${
                      selectedFocus === id
                        ? "border-blue-500 bg-blue-950/40 ring-1 ring-blue-500"
                        : "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="text-3xl mb-2">{cfg.emoji}</div>
                    <div className="font-semibold text-white">{cfg.label}</div>
                    <p className="text-zinc-400 text-sm mt-1">
                      {cfg.description}
                    </p>
                  </button>
                )
              )}
            </div>

            {/* Focus details */}
            {selectedFocus && (
              <div className="space-y-6">
                {/* Tip banner */}
                <div className="rounded-xl border border-amber-700/50 bg-amber-950/20 p-4 text-sm text-amber-300">
                  💡{" "}
                  <span className="font-medium">Tip:</span>{" "}
                  {focusConfig[selectedFocus].tip}
                </div>

                {/* Recommended Boons */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-3">
                    Recommended Boons
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {focusConfig[selectedFocus].boonIds.map((id) => {
                      const b = boonList.find((x) => x.id === id);
                      if (!b) return null;
                      return (
                        <span
                          key={id}
                          className="rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1 text-sm text-zinc-200"
                        >
                          {b.name}
                        </span>
                      );
                    })}
                  </div>
                </section>

                {/* Recommended Beacons */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-3">
                    Recommended Beacons
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {focusConfig[selectedFocus].beaconIds.map((id) => {
                      const b = beaconList.find((x) => x.id === id);
                      if (!b) return null;
                      return (
                        <span
                          key={id}
                          className="rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1 text-sm text-zinc-200"
                        >
                          {b.emoji} {b.name}
                        </span>
                      );
                    })}
                  </div>
                </section>

                {/* Core Missions */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-3">
                    Core Missions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {focusConfig[selectedFocus].missionIds.map((id) => {
                      const m = missionList.find((x) => x.id === id);
                      if (!m) return null;
                      return (
                        <span
                          key={id}
                          className={`rounded-full px-3 py-1 text-sm font-medium ${tierBadge(m.tier)}`}
                        >
                          [{m.tier}] {m.name}
                        </span>
                      );
                    })}
                  </div>
                </section>

                {/* Nav buttons */}
                <div className="flex gap-3 flex-wrap">
                  {(
                    [
                      { tab: "boons", label: "View Boons" },
                      { tab: "beacons", label: "View Beacons" },
                      { tab: "missions", label: "View Missions" },
                    ] as { tab: Tab; label: string }[]
                  ).map(({ tab, label }) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors"
                    >
                      {label} →
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── BOONS ── */}
        {activeTab === "boons" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Boons</h2>
                <p className="text-sm text-zinc-400">
                  Offered on Blue Beacon completion. Click to mark as picked.
                </p>
              </div>
              {selectedBoons.size > 0 && (
                <span className="rounded-full bg-blue-900/60 border border-blue-700 px-3 py-1 text-sm text-blue-300">
                  {selectedBoons.size} selected
                </span>
              )}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBoonFilter("all")}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  boonFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                All
              </button>
              {categoryList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setBoonFilter(cat.id)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    boonFilter === cat.id
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Boon grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBoons.map((boon) => (
                <button
                  key={boon.id}
                  onClick={() =>
                    toggle(boon.id, selectedBoons, setSelectedBoons)
                  }
                  className={`text-left rounded-xl border p-4 transition-all ${
                    selectedBoons.has(boon.id)
                      ? "border-blue-500 bg-blue-950/40 ring-1 ring-blue-500"
                      : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-semibold text-white text-sm leading-snug">
                      {boon.name}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadge(boon.priority)}`}
                    >
                      {boon.priority}
                    </span>
                  </div>
                  <p className="text-xs text-blue-300 mb-1">{boon.effect}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {boon.description}
                  </p>
                  {boon.notes && (
                    <p className="mt-2 text-xs text-amber-400/80 italic">
                      {boon.notes}
                    </p>
                  )}
                  <div className="mt-2 flex gap-1 flex-wrap">
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                      {boon.type}
                    </span>
                    {boon.stackable && (
                      <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                        stackable
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── BEACONS ── */}
        {activeTab === "beacons" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Beacons</h2>
                <p className="text-sm text-zinc-400">
                  Challenge types offered after each completed challenge. Click
                  to mark as picked.
                </p>
              </div>
              {selectedBeacons.size > 0 && (
                <span className="rounded-full bg-blue-900/60 border border-blue-700 px-3 py-1 text-sm text-blue-300">
                  {selectedBeacons.size} selected
                </span>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {beaconList.map((beacon) => (
                <button
                  key={beacon.id}
                  onClick={() =>
                    toggle(beacon.id, selectedBeacons, setSelectedBeacons)
                  }
                  className={`text-left rounded-xl border p-4 transition-all ${
                    selectedBeacons.has(beacon.id)
                      ? "border-blue-500 bg-blue-950/40 ring-1 ring-blue-500"
                      : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{beacon.emoji}</span>
                    <span className="font-semibold text-white text-sm leading-snug flex-1">
                      {beacon.name}
                    </span>
                    {beacon.color !== "rainbow" && (
                      <span
                        className="h-3 w-3 rounded-full shrink-0 border border-zinc-600"
                        style={{ backgroundColor: beacon.color }}
                      />
                    )}
                  </div>
                  <p className="text-xs text-blue-300 mb-1">{beacon.effect}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-2">
                    {beacon.description}
                  </p>
                  {beacon.tips && beacon.tips.length > 0 && (
                    <ul className="space-y-1">
                      {beacon.tips.map((tip: string, i: number) => (
                        <li key={i} className="text-xs text-amber-400/80">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-2">
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                      {beacon.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── MISSIONS ── */}
        {activeTab === "missions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Missions</h2>
                <p className="text-sm text-zinc-400">
                  Bonus objectives via Grey Beacons. Max 4 per run, stop
                  appearing after Challenge 30.
                </p>
              </div>
              {selectedMissions.size > 0 && (
                <span className="rounded-full bg-blue-900/60 border border-blue-700 px-3 py-1 text-sm text-blue-300">
                  {selectedMissions.size} / 4 selected
                </span>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-zinc-500">Tier:</span>
                {["all", "S", "A", "B", "C"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setMissionTierFilter(t)}
                    className={`rounded-full px-3 py-1 text-sm transition-colors ${
                      missionTierFilter === t
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {t === "all" ? "All" : `${t}-Tier`}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-zinc-500">Combo:</span>
                {[
                  { id: "all", label: "All" },
                  { id: "flying_chests", label: "🟡 Flying Chests" },
                  { id: "curse_stacking", label: "🟣 Curse Stacking" },
                  { id: "beacon_reroll", label: "🟠 Beacon Reroll" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setMissionComboFilter(id)}
                    className={`rounded-full px-3 py-1 text-sm transition-colors ${
                      missionComboFilter === id
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mission grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMissions.map((mission) => (
                <button
                  key={mission.id}
                  onClick={() =>
                    toggle(mission.id, selectedMissions, setSelectedMissions)
                  }
                  className={`text-left rounded-xl border p-4 transition-all ${
                    selectedMissions.has(mission.id)
                      ? "border-blue-500 bg-blue-950/40 ring-1 ring-blue-500"
                      : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-semibold text-white text-sm leading-snug">
                      {mission.name}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${tierBadge(mission.tier)}`}
                    >
                      {mission.tier}
                    </span>
                  </div>
                  <p className="text-xs text-blue-300 leading-relaxed mb-1">
                    {mission.effect}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-2">
                    {mission.description}
                  </p>
                  {mission.combo && mission.combo.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {mission.combo.map((c: string) => (
                        <span
                          key={c}
                          className="rounded-full bg-zinc-700 px-2 py-0.5 text-xs text-zinc-300"
                        >
                          {c === "flying_chests"
                            ? "🟡 Flying Chests"
                            : c === "curse_stacking"
                              ? "🟣 Curse Stacking"
                              : "🟠 Beacon Reroll"}
                        </span>
                      ))}
                    </div>
                  )}
                  {mission.tips && mission.tips.length > 0 && (
                    <ul className="space-y-1">
                      {mission.tips.slice(0, 2).map((tip: string, i: number) => (
                        <li key={i} className="text-xs text-amber-400/80">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
