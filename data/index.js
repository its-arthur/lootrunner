/**
 * Wynncraft Lootrunning - Data Index
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 *
 * Central export for all lootrunning data categories.
 */

export { default as beacons, beacons as beaconList } from "./beacons.js";
export { default as boons, boons as boonList, boonTypes, boonCategories } from "./boons.js";
export { default as challenges, challengeTypes, challengeScaling, challengeMilestones, challengeRewards, endRewardSystem } from "./challenges.js";
export { default as missions, missions as missionList } from "./missions.js";
export { default as trials, trials as trialList, trialTiers, trialRules } from "./trials.js";
export { default as curses, curseEffects, curseSources, curseStrategies, curseRules } from "./curses.js";
export { default as camps, camps as campList, campRegistration, campFeatures } from "./camps.js";
