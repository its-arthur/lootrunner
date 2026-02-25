/**
 * Wynncraft Lootrunning - Missions
 * https://wynncraft.wiki.gg/wiki/Lootrunning (Lootrun Missions table)
 *
 * Only fields from the wiki table: Name, Reward Effect.
 * id is derived from name (snake_case). Mission objectives are randomized (wiki).
 * nameColor: Tailwind text class so mission name matches wiki table styling (Name column).
 * Trials (Crimson Beacon) are separate on the wiki and not included.
 */

// nameColor matches wiki table: orange-yellow (default), purple, green, red
export const missions = [
  { id: "cleansing_greed", name: "Cleansing Greed", nameColor: "text-amber-400", effect: "After opening a Flying Chest, remove one of your Curses." },
  { id: "materialism", name: "Materialism", nameColor: "text-amber-400", effect: "All Challenges will now additionally have the Yellow Beacon effect." },
  { id: "hoarder", name: "Hoarder", nameColor: "text-amber-400", effect: "After every time you are offered 30 items from any Chests, get a random Boon." },
  { id: "jesters_trick", name: "Jester's Trick", nameColor: "text-amber-400", effect: "After being offered 20 Items from Flying Chests, randomly get +3 Pulls, +1 Boon, +1 Curse, or +30s." },
  { id: "interest_scheme", name: "Interest Scheme", nameColor: "text-amber-400", effect: "Gaining 2 Pulls adds an additional Flying Chest to completing your next Yellow Beacon. (Max 12)" },
  { id: "orphions_grace", name: "Orphion's Grace", nameColor: "text-purple-400", effect: "Boons are now 50% more effective." },
  { id: "gourmand", name: "Gourmand", nameColor: "text-purple-400", effect: "Gain +1 Beacon Reroll for every 2 Boon choices offered to you." },
  { id: "porphyrophobia", name: "Porphyrophobia", nameColor: "text-purple-400", effect: "Getting offered a Purple Beacon gives +1 Curse. Purple Beacons now give twice as many Pulls." },
  { id: "cleansing_ritual", name: "Cleansing Ritual", nameColor: "text-amber-400", effect: "After finishing a Challenge, consume 1 Curse to gain +1 Challenge." },
  { id: "equilibrium", name: "Equilibrium", nameColor: "text-amber-400", effect: "After getting 2 Curses, gain a random Boon." },
  { id: "inner_peace", name: "Inner Peace", nameColor: "text-amber-400", effect: "Curses are now half as effective." },
  { id: "optimism", name: "Optimism", nameColor: "text-amber-400", effect: "Gain +1 Pull for every beacon you reroll." },
  { id: "backup_beat", name: "Backup Beat", nameColor: "text-amber-400", effect: "Every time you add +360s to your timer, gain +1 Beacon Reroll." },
  { id: "stasis", name: "Stasis", nameColor: "text-amber-400", effect: "While picking a Beacon, your timer does not decrease. (Max 5m)" },
  { id: "chronokinesis", name: "Chronokinesis", nameColor: "text-emerald-400", effect: "Chests now give +1 Pull, but consume 10s (+5s per chest) from your Timer. Completing a challenge reduces this penalty by -15s." },
  { id: "thrill_seeker", name: "Thrill Seeker", nameColor: "text-red-400", effect: "Red Beacons will reward 1 Boon out of 2." },
  { id: "high_roller", name: "High Roller", nameColor: "text-amber-400", effect: "Gain +10 Pulls and +1 End Reward Reroll." },
  { id: "redemption", name: "Redemption", nameColor: "text-amber-400", effect: "Gain +1 End Reward Sacrifice." },
  { id: "complete_chaos", name: "Complete Chaos", nameColor: "text-amber-400", effect: "After finishing a Challenge, get an additional random Beacon reward." },
];

export const missionCombos = [
  {
    id: "flying_chests",
    name: "Flying Chests",
    description:
      "Optimized for farming Flying Chests and Mythic items. Prioritizes Loot Bonus and Loot Quality boons.",
    coreMissions: ["jesters_trick", "interest_scheme", "hoarder"],
    complementaryMissions: [
      "orphions_grace",
      "cleansing_ritual",
      "materialism",
      "high_roller",
      "redemption",
    ],
    tips: [
      "If none of the core missions appear in your first offers, consider restarting (/kill).",
      "Pair with Loot Bonus and Loot Quality boons for best results.",
      "Can push runs to 100+ challenges for maximum Mythic drops.",
    ],
  },
  {
    id: "curse_stacking",
    name: "Curse Stacking",
    description:
      "Intentionally accumulates Curses to trigger powerful curse-scaling boons and static boons.",
    coreMissions: ["equilibrium", "porphyrophobia"],
    complementaryMissions: [
      "cleansing_ritual",
      "cleansing_greed",
      "high_roller",
      "redemption",
      "inner_peace",
      "orphions_grace",
    ],
    tips: [
      "Keep at least 8 curses active to maximize the Curse Harvest static boon.",
      "Use Cleansing Ritual or Cleansing Greed to safely manage Curse count.",
    ],
  },
  {
    id: "beacon_reroll",
    name: "Beacon Reroll Spam",
    description: "Maximizes beacon rerolls and selection options throughout the run.",
    coreMissions: ["gourmand", "optimism"],
    complementaryMissions: [
      "cleansing_ritual",
      "high_roller",
      "redemption",
      "backup_beat",
      "thrill_seeker",
      "orphions_grace",
    ],
    tips: [
      "Maximize Grey Beacon opportunities for additional mission completions.",
    ],
  },
];

export default missions;
