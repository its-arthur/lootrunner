/**
 * Wynncraft Lootrunning - Curses
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 *
 * Curses are negative effects applied when completing Purple or Dark Grey Beacon
 * challenges. They buff all mobs for the rest of the lootrun.
 *
 * Curses are applied to each spawned mob's base stats before scaling.
 * They stack additively with each other and with normal scaling buffs.
 *
 * There is no hard limit to the number of Curses that can be applied.
 *
 * Strategic note: The static Curse Harvest boon scales based on up to 8 curses
 * for maximum effect — intentional curse stacking is a valid strategy.
 */

export const curseSources = {
  PURPLE_BEACON: {
    id: "purple_beacon",
    name: "Purple Beacon",
    cursesApplied: 1,
    reward: "+1 End Reward item",
  },
  DARK_GREY_BEACON: {
    id: "dark_grey_beacon",
    name: "Dark Grey Beacon",
    cursesApplied: 3,
    reward: "+3 End Reward items",
  },
  AQUA_DOUBLED_PURPLE: {
    id: "aqua_purple",
    name: "Aqua-boosted Purple Beacon",
    cursesApplied: 2,
    reward: "+2 End Reward items",
  },
  AQUA_DOUBLED_DARK_GREY: {
    id: "aqua_dark_grey",
    name: "Aqua-boosted Dark Grey Beacon",
    cursesApplied: 6,
    reward: "+6 End Reward items",
  },
  MISSIONS: {
    id: "missions",
    name: "Certain Missions (e.g., Jester's Trick)",
    cursesApplied: 1,
    reward: "Varies by mission",
  },
};

export const curseEffects = [
  {
    id: "mob_resistance",
    name: "Mob Resistance",
    stat: "resistance",
    description:
      "Increases the resistance of all mobs, causing them to take reduced damage from your attacks.",
    stacksWith: "Other resistance curses and normal mob scaling",
    severity: "high",
  },
  {
    id: "mob_health",
    name: "Mob Health",
    stat: "health",
    description:
      "Increases the maximum health of all mobs, making them take longer to kill.",
    stacksWith: "Other health curses and normal mob scaling",
    severity: "medium",
  },
  {
    id: "mob_damage",
    name: "Mob Damage",
    stat: "damage",
    description:
      "Increases the damage dealt by all mobs, making them more dangerous.",
    stacksWith: "Other damage curses and normal mob scaling",
    severity: "high",
  },
  {
    id: "mob_attack_speed",
    name: "Mob Attack Speed",
    stat: "attack_speed",
    description:
      "Increases the attack speed of all mobs, causing them to strike more frequently.",
    stacksWith: "Other attack speed curses and normal mob scaling",
    severity: "high",
  },
  {
    id: "mob_walk_speed",
    name: "Mob Walk Speed",
    stat: "walk_speed",
    description:
      "Increases the movement speed of all mobs, making them harder to escape.",
    stacksWith: "Other walk speed curses and normal mob scaling",
    severity: "medium",
  },
];

export const curseStrategies = [
  {
    id: "curse_stacking",
    name: "Intentional Curse Stacking",
    description:
      "A strategy where players deliberately accumulate Curses to maximize the Curse Harvest static boon and enable curse-scaling mission combos (Equilibrium + Porphyrophobia).",
    optimalCurseCount: 8,
    requiredBoons: ["Curse Harvest (static boon)"],
    requiredMissions: ["Equilibrium", "Porphyrophobia"],
    tips: [
      "Activate the Curse Harvest static boon only after reaching 8+ curses.",
      "Use Cleansing Ritual mission to safely manage curse count.",
      "Complete the White Beacon before stacking curses for best static boon value.",
      "Ensure your build can survive heavily buffed mobs before attempting this strategy.",
    ],
  },
  {
    id: "curse_minimization",
    name: "Curse Minimization",
    description:
      "A safer strategy for newer runners where curses are kept minimal to avoid dangerous mob buffing. Purple/Dark Grey Beacons are avoided.",
    optimalCurseCount: 0,
    requiredBoons: [],
    requiredMissions: [],
    tips: [
      "Avoid Purple and Dark Grey Beacons unless your build can handle the curse penalty.",
      "Focus on Blue, Yellow, and Green Beacons instead.",
      "Cleansing Ritual mission can remove curses if accidentally gained.",
    ],
  },
];

export const curseRules = {
  maxCurses: null,
  stackingBehavior: "Additive with each other and with normal mob scaling",
  appliedTo: "Each spawned mob's base stats before scaling",
  persistence: "Permanent for the rest of the lootrun once applied",
  boonInteraction:
    "The Curse Harvest static boon scales with up to 8 curses for maximum effect",
  missionInteraction:
    "Cleansing Ritual mission can remove curses; some missions (Equilibrium, Porphyrophobia) interact with curse count",
};

export default curseEffects;
