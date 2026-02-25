/**
 * Wynncraft Lootrunning - Stats (Identifications)
 *
 * Full list of identifications from the official wiki. Boons can provide
 * buffs to various identifications during lootruns.
 *
 * Source: https://wynncraft.wiki.gg/wiki/Identifications
 */

// Order and names match https://wynncraft.wiki.gg/wiki/Identifications

const skillPoints = [
  { id: "strength", name: "Strength", category: "skill_points" },
  { id: "dexterity", name: "Dexterity", category: "skill_points" },
  { id: "intelligence", name: "Intelligence", category: "skill_points" },
  { id: "defence", name: "Defence", category: "skill_points" },
  { id: "agility", name: "Agility", category: "skill_points" },
];

const attack = [
  { id: "raw_damages", name: "Raw Damages", category: "attack" },
  { id: "percent_damages", name: "Percent Damages", category: "attack" },
  { id: "attack_speed", name: "Attack Speed", category: "attack" },
  { id: "main_attack_range", name: "Main Attack Range", category: "attack" },
  { id: "knockback", name: "Knockback", category: "attack" },
  { id: "critical_damage_bonus", name: "Critical Damage Bonus", category: "attack" },
  { id: "spell_damage", name: "Spell Damage", category: "attack" },
  { id: "raw_spell_damage", name: "Raw Spell Damage", category: "attack" },
];

const healthAndMana = [
  { id: "health", name: "Health", category: "health_and_mana" },
  { id: "raw_health_regen", name: "Raw Health Regen", category: "health_and_mana" },
  { id: "percent_health_regen", name: "Percent Health Regen", category: "health_and_mana" },
  { id: "life_steal", name: "Life Steal", category: "health_and_mana" },
  { id: "healing_efficiency", name: "Healing Efficiency", category: "health_and_mana" },
  { id: "mana_regen", name: "Mana Regen", category: "health_and_mana" },
  { id: "mana_steal", name: "Mana Steal", category: "health_and_mana" },
  { id: "max_mana", name: "Max Mana", category: "health_and_mana" },
];

const elementalDefence = [
  { id: "earth_defence", name: "Earth Defence", category: "elemental_defence" },
  { id: "thunder_defence", name: "Thunder Defence", category: "elemental_defence" },
  { id: "water_defence", name: "Water Defence", category: "elemental_defence" },
  { id: "fire_defence", name: "Fire Defence", category: "elemental_defence" },
  { id: "air_defence", name: "Air Defence", category: "elemental_defence" },
  { id: "elemental_defence", name: "Elemental Defence", category: "elemental_defence" },
];

const passiveDamage = [
  { id: "exploding", name: "Exploding", category: "passive_damage" },
  { id: "poison", name: "Poison", category: "passive_damage" },
  { id: "thorns", name: "Thorns", category: "passive_damage" },
  { id: "reflection", name: "Reflection", category: "passive_damage" },
  { id: "slow_enemy", name: "Slow Enemy", category: "passive_damage" },
  { id: "weaken_enemy", name: "Weaken Enemy", category: "passive_damage" },
];

const movement = [
  { id: "walk_speed", name: "Walk Speed", category: "movement" },
  { id: "sprint", name: "Sprint", category: "movement" },
  { id: "sprint_regen", name: "Sprint Regen", category: "movement" },
  { id: "jump_height", name: "Jump Height", category: "movement" },
];

const xpAndGathering = [
  { id: "loot_bonus", name: "Loot Bonus", category: "xp_and_gathering" },
  { id: "loot_quality", name: "Loot Quality", category: "xp_and_gathering" },
  { id: "stealing", name: "Stealing", category: "xp_and_gathering" },
  { id: "xp_bonus", name: "XP Bonus", category: "xp_and_gathering" },
  { id: "gather_xp_bonus", name: "Gather XP Bonus", category: "xp_and_gathering" },
  { id: "gather_speed", name: "Gather Speed", category: "xp_and_gathering" },
];

const spellCost = [
  { id: "percent_spell_cost", name: "Percent Spell Cost", category: "spell_cost" },
  { id: "raw_spell_cost", name: "Raw Spell Cost", category: "spell_cost" },
];

export const stats = [
  ...skillPoints,
  ...attack,
  ...healthAndMana,
  ...elementalDefence,
  ...passiveDamage,
  ...movement,
  ...xpAndGathering,
  ...spellCost,
];

export const statCategories = [
  { id: "skill_points", label: "Skill Points" },
  { id: "attack", label: "Attack" },
  { id: "health_and_mana", label: "Health and Mana" },
  { id: "elemental_defence", label: "Elemental Defence" },
  { id: "passive_damage", label: "Passive Damage" },
  { id: "movement", label: "Movement" },
  { id: "xp_and_gathering", label: "XP and Gathering" },
  { id: "spell_cost", label: "Spell Cost" },
];

export default stats;
