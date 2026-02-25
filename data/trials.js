/**
 * Wynncraft Lootrunning - Trials
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 * Added in: Version 2.1.3 (Wardrobe Wonders)
 *
 * Trials are high-risk, high-reward objectives activated via Crimson Beacons.
 * They only appear after Challenge 20, stop appearing around Challenge 50,
 * and a maximum of 2 Trials can be completed in a single run.
 *
 * Unlike Missions, Trial objectives are predetermined (not randomized).
 * Completing Trials is your primary source of End Reward Rerolls and Sacrifices.
 *
 * Tier List: Hubris = Ultimate Sacrifice = Gambling Beast (situational)
 *            > Warmth Devourer = Treasury Bill > Side Hustle
 *            > Lights Out (Beacon Reroll Spam only) > All In
 */

export const trialTiers = {
  S: "S",
  A: "A",
  B: "B",
  C: "C",
};

export const trials = [
  {
    id: "hubris",
    name: "Hubris",
    tier: trialTiers.S,
    effect: "Powerful reward for confident, high-performance play.",
    description:
      "One of the best trials available. Hubris rewards aggressive, high-output runs with significant end rewards.",
    restrictions: "Predetermined objective tied to run performance metrics.",
    rewards: "High-value End Reward Rerolls and/or Sacrifices.",
    tips: [
      "Top S-tier trial alongside Ultimate Sacrifice.",
      "Take whenever offered alongside another top-tier trial.",
    ],
    addedInVersion: "2.1.3",
  },
  {
    id: "ultimate_sacrifice",
    name: "Ultimate Sacrifice",
    tier: trialTiers.S,
    effect:
      "Grants a Sacrifice and 2 End Reward Rerolls upon completion. Downside: every 120 seconds, the timer decreases by 120 seconds and you lose one Boon.",
    description:
      "Top-tier trial with a significant downside — you lose Boons over time. Plan around this limitation.",
    restrictions:
      "Lose 1 Boon every 120 seconds while the Trial is active. The timer also decreases every 120 seconds.",
    rewards: "1 Sacrifice + 2 End Reward Rerolls",
    tips: [
      "High Roller mission + Ultimate Sacrifice trial maximizes total rerolls.",
      "Be aware of the Boon loss — complete it quickly in shorter runs.",
      "The boon loss is significant in long runs — weigh the tradeoff carefully.",
    ],
    addedInVersion: "2.1.3",
  },
  {
    id: "gambling_beast",
    name: "Gambling Beast",
    tier: trialTiers.S,
    effect:
      "High-risk, variable reward trial. If you have this trial, Aqua-stack Green Beacons for extra time.",
    description:
      "Situationally S-tier. The Gambling Beast trial offers variable but potentially very high rewards.",
    restrictions: "Involves gambling mechanics with variable outcomes.",
    rewards: "Variable — potentially very high End Reward Rerolls/Sacrifices.",
    tips: [
      "Situationally S-tier depending on run setup.",
      "If Gambling Beast is active, Aqua-boost Green Beacons for extra time.",
      "Better in longer runs where the gambling mechanics can play out favorably.",
    ],
    addedInVersion: "2.1.3",
  },
  {
    id: "warmth_devourer",
    name: "Warmth Devourer",
    tier: trialTiers.A,
    effect: "Consumes warmth or heat-related stats for powerful trial completion rewards.",
    description:
      "A solid A-tier trial with a themed restriction. Reliably good rewards.",
    restrictions: "Involves warmth/heat mechanics during the trial period.",
    rewards: "End Reward Rerolls and/or Sacrifices.",
    tips: ["Reliable A-tier pick when S-tier trials aren't available."],
    addedInVersion: "2.1.3",
  },
  {
    id: "treasury_bill",
    name: "Treasury Bill",
    tier: trialTiers.A,
    effect: "Grants approximately +75% pull bonus upon completion.",
    description:
      "A reliable trial that significantly boosts your End Reward Pulls.",
    restrictions: "Predetermined objectives tied to economic/wealth metrics in the run.",
    rewards: "+75% End Reward Pull bonus",
    tips: [
      "Treasury Bill gives approximately +75% pull, making it very valuable.",
      "Great for maximizing End Reward Chest quality.",
    ],
    addedInVersion: "2.1.3",
  },
  {
    id: "side_hustle",
    name: "Side Hustle",
    tier: trialTiers.B,
    effect: "Provides a secondary reward stream tied to side activities during the run.",
    description:
      "A moderate trial that rewards engaging with non-primary lootrun activities.",
    restrictions: "Requires completion of specific side activities during the run.",
    rewards: "Moderate End Reward Rerolls and/or Sacrifices.",
    tips: ["B-tier — take when S and A-tier trials are not available."],
    addedInVersion: "2.1.3",
  },
  {
    id: "lights_out",
    name: "Lights Out",
    tier: trialTiers.B,
    effect: "Darkness-themed trial with conditional effects.",
    description:
      "Only particularly useful for Beacon Reroll Spam mission combos. Otherwise B-tier.",
    restrictions: "Involves darkness or vision-limiting mechanics.",
    rewards: "End Reward Rerolls (value depends on combo).",
    tips: [
      "Only recommended when running the Beacon Reroll Spam mission combo.",
      "Otherwise a lower priority than other trials.",
    ],
    addedInVersion: "2.1.3",
  },
  {
    id: "all_in",
    name: "All In",
    tier: trialTiers.C,
    effect:
      "Converts Sacrifices to End Reward Rerolls (+2 rerolls per converted Sacrifice). No longer grants an additional reroll.",
    description:
      "Previously stronger, All In was nerfed and no longer provides the extra reroll it once did.",
    restrictions: "Requires converting Sacrifices — limits use of Sacrifices elsewhere.",
    rewards: "+2 End Reward Rerolls per Sacrifice converted.",
    tips: [
      "Lowest priority trial after the nerf.",
      "Only take if no better trials are available.",
    ],
    addedInVersion: "2.1.3",
  },
  {
    id: "safety_seeker",
    name: "Safety Seeker",
    tier: trialTiers.C,
    effect: "Rewards conservative and careful play during the trial period.",
    description:
      "A low-tier trial that benefits cautious playstyles. Not recommended over higher-tier options.",
    restrictions: "Requires avoiding certain risky actions during the trial.",
    rewards: "Modest End Reward Rerolls and/or Sacrifices.",
    tips: [
      "Only take when no better options are available.",
      "Listed in Sacrifice-type trial priority.",
    ],
    addedInVersion: "2.1.3",
  },
  {
    id: "pressure",
    name: "Pressure",
    tier: trialTiers.B,
    effect: "Applies pressure mechanics — completing challenges under a strict restriction.",
    description:
      "A challenging trial that tests your ability to perform under pressure.",
    restrictions: "Strict time or performance restrictions during the trial.",
    rewards: "End Reward Rerolls and/or Sacrifices.",
    tips: ["Requires strong build and experience to complete reliably."],
    addedInVersion: "2.1.3",
  },
];

export const trialRules = {
  availability: "Only available after Challenge 20",
  disappearAfter: "Stop appearing around Challenge 50",
  maxPerRun: 2,
  beacon: "Crimson Beacon",
  defaultChoices: 2,
  maxChoices: 4,
  choiceModifiers: ["Aqua Beacon (doubles choices)", "Vibrant Beacon (doubles choices)"],
  simultaneousActive: 1,
  primaryRewards: ["End Reward Rerolls", "Sacrifices"],
};

export default trials;
