/**
 * Wynncraft Lootrunning - Challenges
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 *
 * Challenges are the core gameplay loop of a lootrun. Each challenge is marked
 * by a Beacon and must be completed to progress the run and earn rewards.
 *
 * After completing each challenge, mobs scale up in difficulty (except after
 * Green Beacon challenges). Players are then offered a choice of Beacons for
 * the next challenge.
 *
 * Challenge rewards include:
 * - Challenge Reward Chests (appear after completing a challenge)
 * - Flying Chests (from Yellow Beacons)
 * - Boons (from Blue Beacons)
 * - Missions (from Grey Beacons)
 * - Trials (from Crimson Beacons, post-Challenge 20)
 */

export const challengeTypes = [
  {
    id: "cave",
    name: "Cave Challenge",
    description:
      "Navigate through a cave, defeating mobs and reaching the end. The most common challenge type.",
    objective: "Reach the end of the cave and defeat any required mobs.",
    tips: [
      "Stay moving to avoid getting surrounded by mobs.",
      "Use area-of-effect abilities to handle groups efficiently.",
    ],
  },
  {
    id: "boss",
    name: "Boss Challenge",
    description:
      "Defeat a powerful boss mob with elevated stats and unique abilities.",
    objective: "Defeat the boss within the time limit.",
    tips: [
      "Bosses have significantly higher health and damage than regular mobs.",
      "Watch for special attack patterns and dodge accordingly.",
      "Having high single-target DPS is advantageous for boss challenges.",
    ],
  },
  {
    id: "escort",
    name: "Escort / Defense Challenge",
    description:
      "Protect an objective or NPC while waves of mobs attempt to destroy it.",
    objective: "Keep the objective alive until the challenge timer ends or all waves are defeated.",
    tips: [
      "Position yourself between waves and the objective.",
      "AoE abilities are very useful for clearing waves quickly.",
    ],
  },
];

export const challengeScaling = {
  description:
    "After each completed challenge, all mobs in the run become stronger. This scaling is cumulative and permanent for the run.",
  exception:
    "Green Beacon challenges do NOT apply mob scaling after completion.",
  scalingStats: [
    "Health",
    "Damage",
    "Resistance",
    "Attack Speed",
    "Walk Speed",
  ],
  curseInteraction:
    "Curses from Purple/Dark Grey Beacons stack additively with challenge scaling on top of mob base stats.",
  notes:
    "The scaling is derived from mob base stats before applying Curses, meaning Curses multiply off the scaled values.",
};

export const challengeMilestones = [
  {
    challenge: 4,
    event: "First Mission offer",
    description:
      "After completing your 4th challenge, you are offered your first Mission choice (Grey Beacon).",
  },
  {
    challenge: 10,
    event: "Base run end (without White Beacon)",
    description:
      "The base number of challenges in a run is 10. Completing challenge 10 without a White Beacon ends the run.",
  },
  {
    challenge: 11,
    event: "White Beacon safe zone",
    description:
      "After challenge 11/12, picking a White Beacon will not prematurely end the run — there are enough challenges remaining.",
  },
  {
    challenge: 15,
    event: "Run end with White Beacon",
    description:
      "If a White Beacon was completed, the run extends to 15 total challenges.",
  },
  {
    challenge: 20,
    event: "Crimson Beacons begin appearing",
    description:
      "After Challenge 20, Crimson Beacons can appear, offering Trials.",
  },
  {
    challenge: 30,
    event: "Missions stop appearing",
    description:
      "Grey Beacons (and Mission offers) stop appearing after Challenge 30. Complete all 4 missions before this point.",
  },
  {
    challenge: 50,
    event: "Crimson Beacons stop appearing",
    description:
      "Crimson Beacons (and Trial offers) stop appearing around Challenge 50.",
  },
  {
    challenge: 80,
    event: "Dexterity/Crit scaling required",
    description:
      "Past ~80 challenges, raw damage boons become insufficient. Dexterity skill point and critical damage boons become required to scale damage effectively.",
  },
  {
    challenge: 100,
    event: "Extended run milestone",
    description:
      "Extended runs of 100+ challenges are pursued by advanced runners using the Flying Chests combo for maximum Mythic farming.",
  },
];

export const challengeRewards = [
  {
    id: "challenge_reward_chest",
    name: "Challenge Reward Chest",
    description:
      "A chest that appears after completing each challenge. Contains random loot scaled by Loot Bonus and Loot Quality boons.",
    frequency: "Every challenge",
    affectedBy: ["Loot Bonus boon", "Loot Quality boon"],
    notes: "Does not benefit from End Reward Chest modifiers (Pulls, Sacrifices).",
  },
  {
    id: "flying_chest",
    name: "Flying Chest",
    description:
      "Additional loot chests that fly around the challenge area. Spawned by Yellow Beacons and amplified by other beacon effects.",
    frequency: "When Yellow Beacons are completed",
    affectedBy: [
      "Loot Bonus boon",
      "Loot Quality boon",
      "Vibrant/Rainbow modifiers",
      "Aqua Beacon (doubles Yellow Beacon effect)",
    ],
    notes:
      "Flying Chests count for Jester's Trick and Hoarder mission objectives.",
  },
  {
    id: "end_reward_chest",
    name: "End Reward Chest",
    description:
      "The final reward chest at the end of a completed lootrun. Contains high-value loot including potential Mythics.",
    frequency: "Once per completed run",
    affectedBy: [
      "Pulls (base amount determines chest draws)",
      "Rerolls (allows rerolling chest contents)",
      "Sacrifices (trade a lesser item for a reroll)",
      "Purple Beacon (+1 Pull per beacon)",
      "Dark Grey Beacon (+3 Pulls per beacon)",
    ],
    notes:
      "Not affected by Loot Bonus or Loot Quality boons. Pulls, Rerolls, and Sacrifices from Missions and Trials directly improve this chest.",
  },
];

export const endRewardSystem = {
  pulls: {
    description:
      "Each Pull represents one draw from the End Reward Chest. More Pulls = more items.",
    sources: [
      "Purple Beacon (+1 per beacon)",
      "Dark Grey Beacon (+3 per beacon)",
      "Certain Missions (e.g., Jester's Trick's random reward)",
      "Treasury Bill Trial (~+75% pull bonus)",
    ],
  },
  rerolls: {
    description:
      "Rerolls allow you to redraw specific items from the End Reward Chest.",
    sources: [
      "Grey Beacon (Mission completion)",
      "Ultimate Sacrifice Trial (+2 rerolls)",
      "High Roller Mission",
      "All In Trial (+2 per Sacrifice converted)",
    ],
  },
  sacrifices: {
    description:
      "Sacrifices allow trading a lesser item in the End Reward Chest for a reroll of that slot.",
    sources: [
      "Certain Trials (Hubris, Ultimate Sacrifice, Warmth Devourer, etc.)",
      "Specific Mission completions",
    ],
  },
};

export default challengeTypes;
