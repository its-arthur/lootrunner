/**
 * Wynncraft Lootrunning - Boons
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 *
 * Boons are beneficial effects offered when you complete a Blue Beacon challenge.
 * Dynamic Boons have ongoing effects; Static Boons give an immediate buff
 * based on your progress so far.
 *
 * Most stackable boons have a maximum cap.
 */

export const boonTypes = {
  DYNAMIC: "dynamic",
  STATIC: "static",
};

export const boons = [
  // --- Loot Boons ---
  {
    id: "loot_bonus",
    name: "Loot Bonus",
    type: boonTypes.DYNAMIC,
    category: "loot",
    effect: "+Loot Bonus%",
    description:
      "Increases Loot Bonus, improving the quantity of items found in chests during the lootrun.",
    stackable: true,
    priority: "high",
    notes:
      "One of the most prioritized boons for flying chest runs. Does not affect the End Reward Chest.",
  },
  {
    id: "loot_quality",
    name: "Loot Quality",
    type: boonTypes.DYNAMIC,
    category: "loot",
    effect: "+Loot Quality%",
    description:
      "Increases Loot Quality, improving the rarity of items found in chests during the lootrun.",
    stackable: true,
    priority: "high",
    notes:
      "Highly prioritized for Mythic farming. Does not affect the End Reward Chest.",
  },

  // --- Mobility Boons ---
  {
    id: "looter",
    name: "Looter",
    type: boonTypes.DYNAMIC,
    category: "mobility",
    effect: "+10% Walk Speed per 4 items found in chests (max +150%)",
    description:
      "A dynamic boon that provides +10% Walk Speed for every four items found in chests throughout the lootrun.",
    stackable: false,
    maxValue: "+150% Walk Speed",
    priority: "medium",
    notes:
      "Caps at +150% Walk Speed regardless of how many items you find beyond 60.",
  },
  {
    id: "walk_speed",
    name: "Walk Speed",
    type: boonTypes.DYNAMIC,
    category: "mobility",
    effect: "+Walk Speed%",
    description: "Provides a flat bonus to Walk Speed for the rest of the run.",
    stackable: true,
    priority: "low",
  },

  // --- Combat Boons ---
  {
    id: "spell_damage",
    name: "Spell Damage",
    type: boonTypes.DYNAMIC,
    category: "combat",
    effect: "+Spell Damage%",
    description: "Increases Spell Damage dealt to enemies.",
    stackable: true,
    priority: "high",
    notes: "Becomes essential after ~80 challenges to keep up with mob scaling.",
  },
  {
    id: "dexterity",
    name: "Dexterity",
    type: boonTypes.DYNAMIC,
    category: "combat",
    effect: "+Dexterity skill points",
    description:
      "Grants bonus Dexterity skill points, increasing critical hit chance and damage.",
    stackable: true,
    priority: "high",
    notes:
      "Required to scale efficiently past ~80 challenges alongside critical damage boons.",
  },
  {
    id: "critical_damage",
    name: "Critical Damage",
    type: boonTypes.DYNAMIC,
    category: "combat",
    effect: "+Critical Damage%",
    description: "Increases the damage dealt by critical hits.",
    stackable: true,
    priority: "high",
    notes: "Required alongside Dexterity boons for scaling past ~80 challenges.",
  },

  // --- Survivability Boons ---
  {
    id: "health_bonus",
    name: "Health Bonus",
    type: boonTypes.DYNAMIC,
    category: "survivability",
    effect: "+Health Bonus",
    description: "Increases your maximum health for the rest of the run.",
    stackable: true,
    priority: "medium",
  },
  {
    id: "life_steal",
    name: "Life Steal",
    type: boonTypes.DYNAMIC,
    category: "survivability",
    effect: "+Life Steal",
    description:
      "Increases Life Steal, recovering health based on damage dealt.",
    stackable: true,
    priority: "medium",
  },
  {
    id: "hp_regen",
    name: "HP Regen",
    type: boonTypes.DYNAMIC,
    category: "survivability",
    effect: "+HP Regen%",
    description: "Increases health regeneration rate.",
    stackable: true,
    priority: "high",
    notes:
      "Prioritize for Mage builds or builds that passively bleed health. Take until you stop bleeding passively.",
  },

  // --- Mana Boons ---
  {
    id: "mana_regen",
    name: "Mana Regen",
    type: boonTypes.DYNAMIC,
    category: "mana",
    effect: "+Mana Regen",
    description: "Increases the rate at which mana regenerates.",
    stackable: true,
    priority: "medium",
  },
  {
    id: "mana_steal",
    name: "Mana Steal",
    type: boonTypes.DYNAMIC,
    category: "mana",
    effect: "+Mana Steal",
    description: "Steals mana from enemies when hitting them.",
    stackable: true,
    priority: "medium",
  },
  {
    id: "max_mana",
    name: "Max Mana",
    type: boonTypes.DYNAMIC,
    category: "mana",
    effect: "+Max Mana",
    description: "Increases your maximum mana pool.",
    stackable: true,
    priority: "low",
  },

  // --- Debuff Boons (applied to enemies) ---
  {
    id: "enemy_slowness",
    name: "Enemy Slowness",
    type: boonTypes.DYNAMIC,
    category: "debuff",
    effect: "+Enemy Slowness%",
    description: "Slows down enemies, making them easier to avoid and fight.",
    stackable: true,
    priority: "medium",
  },
  {
    id: "enemy_weakness",
    name: "Enemy Weakness",
    type: boonTypes.DYNAMIC,
    category: "debuff",
    effect: "+Enemy Weakness%",
    description:
      "Applies weakness to enemies, causing them to take more damage.",
    stackable: true,
    priority: "medium",
  },

  // --- Skill Point Boons ---
  {
    id: "strength",
    name: "Strength",
    type: boonTypes.DYNAMIC,
    category: "skill_points",
    effect: "+Strength skill points",
    description: "Grants bonus Strength skill points.",
    stackable: true,
    priority: "low",
  },
  {
    id: "agility",
    name: "Agility",
    type: boonTypes.DYNAMIC,
    category: "skill_points",
    effect: "+Agility skill points",
    description: "Grants bonus Agility skill points, increasing dodge chance.",
    stackable: true,
    priority: "low",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    type: boonTypes.DYNAMIC,
    category: "skill_points",
    effect: "+Intelligence skill points",
    description:
      "Grants bonus Intelligence skill points, improving mana-related stats.",
    stackable: true,
    priority: "low",
  },
  {
    id: "defense",
    name: "Defense",
    type: boonTypes.DYNAMIC,
    category: "skill_points",
    effect: "+Defense skill points",
    description:
      "Grants bonus Defense skill points, increasing resistance to damage.",
    stackable: true,
    priority: "low",
  },

  // --- Static Boons ---
  {
    id: "curse_scaling_static",
    name: "Curse Harvest",
    type: boonTypes.STATIC,
    category: "static",
    effect: "Massive buff scaling with current number of Curses (up to 8)",
    description:
      "A static boon that provides an immediate, powerful buff based on the number of active Curses. Scales up to 8 curses for maximum effect.",
    stackable: false,
    priority: "highest",
    notes:
      "The highest-value static boon available. Try to have at least 8 curses active when you take it. Best taken after completing your White Beacon.",
  },
];

export const boonCategories = [
  { id: "loot", label: "Loot", description: "Improves items found in chests" },
  {
    id: "combat",
    label: "Combat",
    description: "Increases damage output and combat effectiveness",
  },
  {
    id: "survivability",
    label: "Survivability",
    description: "Improves health and sustain",
  },
  { id: "mana", label: "Mana", description: "Improves mana management" },
  { id: "mobility", label: "Mobility", description: "Increases movement speed" },
  {
    id: "debuff",
    label: "Enemy Debuffs",
    description: "Applies negative effects to enemies",
  },
  {
    id: "skill_points",
    label: "Skill Points",
    description: "Grants bonus skill point allocations",
  },
  {
    id: "static",
    label: "Static",
    description: "One-time immediate buffs based on run progress",
  },
];

export default boons;
