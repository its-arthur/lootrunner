/**
 * Wynncraft Lootrunning - Missions
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 *
 * Missions are bonus objectives offered via Grey Beacons after completing
 * 4 challenges, and then whenever a Grey Beacon appears. Only one Mission
 * can be active at a time. A maximum of 4 Missions can be completed per run.
 * Missions stop appearing after Challenge 30.
 *
 * Completing missions grants End Reward Rerolls, Sacrifices, and other rewards.
 */

export const missionTiers = {
  S: "S",
  A: "A",
  B: "B",
  C: "C",
};

export const missions = [
  // --- Top Tier: Flying Chests Combo ---
  {
    id: "jesters_trick",
    name: "Jester's Trick",
    tier: missionTiers.S,
    combo: ["flying_chests"],
    effect:
      "When you obtain 20 items from a flying chest to clear the mission, randomly receive one of: 3 Pulls, 1 Boon, 1 Curse, or 30 seconds of time.",
    description:
      "A mission that rewards you for looting flying chests. The random reward keeps things exciting but averages out very well over many runs.",
    objective: "Obtain 20 items total from Flying Chests",
    tips: [
      "Core of the Flying Chests mission combo.",
      "If this doesn't appear in your first 4 missions, consider restarting the run.",
    ],
  },
  {
    id: "interest_scheme",
    name: "Interest Scheme",
    tier: missionTiers.S,
    combo: ["flying_chests"],
    effect:
      "Grants bonus End Reward Pulls based on the number of items collected during the run.",
    description:
      "Scales with your total item collection throughout the run, making it excellent in loot-heavy setups.",
    objective: "Collect a set number of items throughout the run",
    tips: [
      "Pairs excellently with Hoarder and Jester's Trick.",
      "Great in flying chest runs where many items are collected.",
    ],
  },
  {
    id: "hoarder",
    name: "Hoarder",
    tier: missionTiers.S,
    combo: ["flying_chests"],
    effect:
      "When you obtain 20 items from any chest to clear the mission, receive a random Boon.",
    description:
      "Rewards chest looting with a free Boon. Easy to complete by simply looting treasure chests.",
    objective: "Obtain 20 items total from any chests",
    tips: [
      "Easiest mission to complete — just loot chests naturally.",
      "The free Boon is always valuable.",
      "Core of the Flying Chests combo: Jester's Trick + Interest Scheme + Hoarder.",
    ],
  },

  // --- Top Tier: Curse Stacking Combo ---
  {
    id: "equilibrium",
    name: "Equilibrium",
    tier: missionTiers.S,
    combo: ["curse_stacking"],
    effect:
      "Provides a powerful ongoing effect related to balancing Curses and Boons.",
    description:
      "One of the rarest and best Mission effects. Excellent for curse-stacking builds.",
    objective: "Varies (predetermined based on run state)",
    tips: [
      "One of the best mission effects in the game — rarer than most.",
      "Core of the Curse Stacking combo: Equilibrium + Porphyrophobia.",
    ],
  },
  {
    id: "porphyrophobia",
    name: "Porphyrophobia",
    tier: missionTiers.S,
    combo: ["curse_stacking"],
    effect: "Powerful effect tied to Curse management and accumulation.",
    description:
      "Pairs exceptionally well with Equilibrium for the curse-stacking strategy.",
    objective: "Varies (predetermined based on run state)",
    tips: [
      "Core of the Curse Stacking combo: Equilibrium + Porphyrophobia.",
      "Best taken alongside Equilibrium for maximum synergy.",
    ],
  },

  // --- Top Tier: Beacon Reroll Spam Combo ---
  {
    id: "gourmand",
    name: "Gourmand",
    tier: missionTiers.S,
    combo: ["beacon_reroll"],
    effect: "Effect related to beacon selection and rerolling.",
    description:
      "Core mission for the Beacon Reroll Spam combo, allowing frequent beacon rerolls.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Core of Beacon Reroll Spam: Gourmand + Optimism."],
  },
  {
    id: "optimism",
    name: "Optimism",
    tier: missionTiers.S,
    combo: ["beacon_reroll"],
    effect: "Effect related to beacon rerolling and selection optimization.",
    description: "Pairs with Gourmand for the Beacon Reroll Spam strategy.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Core of Beacon Reroll Spam: Gourmand + Optimism."],
  },

  // --- A Tier ---
  {
    id: "cleansing_ritual",
    name: "Cleansing Ritual",
    tier: missionTiers.A,
    combo: ["flying_chests", "curse_stacking", "beacon_reroll"],
    effect:
      "Upon activation, immediately removes one Curse. Allows you to gain a Curse without the permanent negative effect.",
    description:
      "One of the best and rarest Mission effects. Essentially lets you ignore Red and Green beacons and enables safer curse management.",
    objective: "Varies (predetermined based on run state)",
    tips: [
      "Considered one of the best missions in the game alongside Equilibrium.",
      "Allows safe use of Purple and Dark Grey beacons.",
      "Immediately eats a Curse upon activation.",
      "Rare — take it whenever it appears.",
    ],
  },
  {
    id: "orphions_grace",
    name: "Orphion's Grace",
    tier: missionTiers.A,
    combo: ["flying_chests", "beacon_reroll"],
    effect:
      "Provides a grace effect tied to Orphion, offering powerful run-sustaining benefits.",
    description: "A versatile top-tier complementary mission for multiple combos.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Top complementary mission for Flying Chests and Beacon Reroll combos."],
  },
  {
    id: "high_roller",
    name: "High Roller",
    tier: missionTiers.A,
    combo: ["flying_chests", "curse_stacking", "beacon_reroll"],
    effect:
      "Maximizes End Reward Rerolls when combined with Ultimate Sacrifice trial.",
    description:
      "A strong mission that complements both combat and loot strategies.",
    objective: "Varies (predetermined based on run state)",
    tips: [
      "High Roller + Ultimate Sacrifice (trial) maximizes rerolls.",
      "Solid A-tier complementary mission for most combos.",
    ],
  },
  {
    id: "redemption",
    name: "Redemption",
    tier: missionTiers.A,
    combo: ["flying_chests", "curse_stacking", "beacon_reroll"],
    effect: "Provides a redemption-style reward tied to run performance.",
    description:
      "A reliable A-tier complementary mission for multiple run strategies.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Solid pick across all main mission combos."],
  },

  // --- B Tier ---
  {
    id: "materialism",
    name: "Materialism",
    tier: missionTiers.B,
    combo: ["flying_chests"],
    effect: "Generates free chests during the run.",
    description:
      "Useful for Flying Chest runs as it generates free chests for Hoarder and Jester's Trick to interact with.",
    objective: "Varies (predetermined based on run state)",
    tips: [
      "Generates free chests that count for Hoarder and Jester's Trick.",
      "B-tier complementary for the Flying Chests combo.",
    ],
  },
  {
    id: "inner_peace",
    name: "Inner Peace",
    tier: missionTiers.B,
    combo: ["curse_stacking"],
    effect: "Provides a calming, sustain-focused effect during the run.",
    description: "A moderate-tier mission useful for curse-stacking strategies.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Complementary for the Curse Stacking combo."],
  },
  {
    id: "backup_beat",
    name: "Backup Beat",
    tier: missionTiers.B,
    combo: ["beacon_reroll"],
    effect: "Provides a backup effect tied to beacon selection.",
    description: "Useful in Beacon Reroll Spam strategies.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Complementary for Beacon Reroll Spam combo."],
  },
  {
    id: "thrill_seeker",
    name: "Thrill Seeker",
    tier: missionTiers.B,
    combo: ["beacon_reroll"],
    effect: "Rewards risky play and beacon selection.",
    description: "Useful in Beacon Reroll Spam strategies.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Complementary for Beacon Reroll Spam combo."],
  },

  // --- Other Named Missions ---
  {
    id: "ultimate_sacrifice",
    name: "Ultimate Sacrifice",
    tier: missionTiers.A,
    combo: [],
    effect:
      "Grants the final reward Sacrifice and Reroll 2. However, every 120 seconds the timer decreases by 120 seconds and you lose one Boon.",
    description:
      "High-risk, high-reward mission. Great for maximizing rerolls but the boon loss can be devastating in long runs.",
    objective: "Varies (predetermined based on run state)",
    tips: [
      "High Roller + Ultimate Sacrifice maximizes rerolls (except Gambling Beast trial).",
      "Be careful — losing Boons every 120 seconds is a significant downside.",
      "Best used in shorter or faster runs.",
    ],
  },
  {
    id: "gambling_beast",
    name: "Gambling Beast",
    tier: missionTiers.B,
    combo: [],
    effect: "High-risk gambling mechanic tied to End Reward Pulls.",
    description: "A gamble-focused mission with variable outcomes.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Variable results — only recommended for experienced runners."],
  },
  {
    id: "warmth_devourer",
    name: "Warmth Devourer",
    tier: missionTiers.B,
    combo: [],
    effect: "Consumes warmth/heat for powerful buffs.",
    description: "A unique mission with a specific playstyle requirement.",
    objective: "Varies (predetermined based on run state)",
    tips: [],
  },
  {
    id: "treasury_bill",
    name: "Treasury Bill",
    tier: missionTiers.B,
    combo: [],
    effect: "Provides bonus End Reward Pulls (approximately +75% pull bonus).",
    description: "A solid mission for increasing pull count at the end of a run.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Treasury Bill Trial gives approximately +75% pull bonus."],
  },
  {
    id: "side_hustle",
    name: "Side Hustle",
    tier: missionTiers.B,
    combo: [],
    effect: "Provides a secondary income/reward stream during the run.",
    description: "A moderate-tier mission with consistent rewards.",
    objective: "Varies (predetermined based on run state)",
    tips: [],
  },
  {
    id: "lights_out",
    name: "Lights Out",
    tier: missionTiers.C,
    combo: ["beacon_reroll"],
    effect: "Darkness-themed effect with conditional benefits.",
    description:
      "Only recommended for the Beacon Reroll Spam mission combo specifically.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Only useful in the Beacon Reroll Spam combo."],
  },
  {
    id: "all_in",
    name: "All In",
    tier: missionTiers.C,
    combo: [],
    effect: "Converts Sacrifices to End Reward Rerolls (+2 rerolls per Sacrifice).",
    description: "Previously offered an additional reroll but no longer does.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Lower value — All In no longer grants the additional reroll it once did."],
  },
  {
    id: "safety_seeker",
    name: "Safety Seeker",
    tier: missionTiers.C,
    combo: [],
    effect: "Rewards cautious, safe play during the lootrun.",
    description: "A conservative mission with modest rewards.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Listed in Sacrifice-type trial priority. Lower priority overall."],
  },
  {
    id: "hubris",
    name: "Hubris",
    tier: missionTiers.A,
    combo: [],
    effect: "Powerful high-confidence mission with significant rewards.",
    description: "One of the top-tier missions when available.",
    objective: "Varies (predetermined based on run state)",
    tips: ["Top-tier alongside Ultimate Sacrifice and Gambling Beast (situational)."],
  },
];

export const missionCombos = [
  {
    id: "flying_chests",
    name: "Flying Chests",
    description:
      "Optimized for farming Flying Chests and Mythic items. Prioritizes Loot Bonus and Loot Quality boons.",
    coremissions: ["jesters_trick", "interest_scheme", "hoarder"],
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
      "high_roller",
      "redemption",
      "inner_peace",
      "orphions_grace",
    ],
    tips: [
      "Keep at least 8 curses active to maximize the Curse Harvest static boon.",
      "Use Cleansing Ritual to safely manage Curse count.",
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
      "Lights Out is situationally useful in this combo.",
      "Maximize Grey Beacon opportunities for additional mission completions.",
    ],
  },
];

export default missions;
