/**
 * Wynncraft Lootrunning - Beacons (Challenge Types)
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 *
 * Beacons mark the challenges in a lootrun. After completing each challenge,
 * you are offered 2 (or more) beacons to choose from for your next challenge.
 */

export const beacons = [
  {
    id: "blue",
    name: "Blue Beacon",
    color: "#3B82F6",
    emoji: "🔵",
    effect: "Grants a Boon",
    description:
      "Completing a Blue Beacon challenge offers you a choice between two or more Boons. Boons are beneficial effects that last for the rest of your lootrun.",
    tips: [
      "Prioritize Blue Beacons when struggling with mob difficulty.",
      "Blue Beacons become more valuable the deeper you are into a run.",
    ],
    category: "reward",
  },
  {
    id: "orange",
    name: "Orange Beacon",
    color: "#F97316",
    emoji: "🟠",
    effect: "Grants extra Beacon choices",
    description:
      "Orange Beacons give at least 1 extra Beacon choice after each challenge, increasing your options from 2 to 3 (or more).",
    tips: [
      "Four Beacon choices (+2) is considered optimal.",
      "More choices means better odds of getting the beacon you want.",
    ],
    category: "utility",
  },
  {
    id: "yellow",
    name: "Yellow Beacon",
    color: "#EAB308",
    emoji: "🟡",
    effect: "Spawns Flying Chests",
    description:
      "Yellow Beacons spawn Flying Chests, which act as extra Challenge Reward chests. The number of flying chests can be amplified by Vibrancy or Aqua Beacons.",
    tips: [
      "Great for maximizing loot throughout your run.",
      "Can be amplified by Rainbow and Aqua Beacons.",
      "Essential for Flying Chest runs aiming for Mythics.",
    ],
    category: "loot",
  },
  {
    id: "red",
    name: "Red Beacon",
    color: "#EF4444",
    emoji: "🔴",
    effect: "Extra challenges, no extra timer",
    description:
      "Red Beacons add extra challenges to your run but do not add time to the timer on completion, unlike all other beacons.",
    tips: [
      "Requires a challenge buffer — getting a Red Beacon as the last challenge will end the run.",
      "Use with caution as you won't gain extra time from these challenges.",
    ],
    category: "challenge",
  },
  {
    id: "green",
    name: "Green Beacon",
    color: "#22C55E",
    emoji: "🟢",
    effect: "Grants extra time and no mob scaling",
    description:
      "Green Beacons give extra time to complete your lootrun and — uniquely — do NOT buff enemies after their challenge. They can also extend time beyond the normal 15-minute limit.",
    tips: [
      "The only beacon that doesn't increase mob difficulty.",
      "Can push time beyond the standard 15-minute cap.",
      "Very valuable in long runs where mob scaling becomes dangerous.",
    ],
    category: "utility",
  },
  {
    id: "purple",
    name: "Purple Beacon",
    color: "#A855F7",
    emoji: "🟣",
    effect: "+1 End Reward item, +1 Curse",
    description:
      "Purple Beacons give +1 item in your End Reward Chest but apply 1 Curse, which buffs all mobs for the rest of the run.",
    tips: [
      "Risk vs. reward — more loot but harder mobs.",
      "Curses are permanent for the run, so plan accordingly.",
      "Can be beneficial when stacking curses intentionally for curse-scaling boons.",
    ],
    category: "risk-reward",
  },
  {
    id: "aqua",
    name: "Aqua Beacon",
    color: "#06B6D4",
    emoji: "🩵",
    effect: "Doubles the effects of the next beacon",
    description:
      "Aqua Beacons double both the positive AND negative effects of the next beacon you complete. A game-changer when paired with the right beacons.",
    tips: [
      "Always pair with Grey/Light Grey Beacons for maximum rerolls.",
      "Doubles Curses too — avoid pairing with Purple or Dark Grey.",
      "Great when paired with Green Beacons for extra time without mob scaling.",
    ],
    category: "modifier",
  },
  {
    id: "dark_grey",
    name: "Dark Grey Beacon",
    color: "#374151",
    emoji: "⚫",
    effect: "+3 End Reward items, +3 Curses",
    description:
      "Dark Grey Beacons are like extreme Purple Beacons — they give +3 items in your End Reward Chest but also apply 3 Curses at once.",
    tips: [
      "Very risky — 3 curses at once significantly buffs all mobs.",
      "Only take if you are confident in your build's survivability.",
      "Can be useful when intentionally stacking curses for curse-scaling boons.",
    ],
    category: "risk-reward",
  },
  {
    id: "white",
    name: "White Beacon",
    color: "#F9FAFB",
    emoji: "⬜",
    effect: "+5 extra Challenges to the lootrun",
    description:
      "White Beacons add 5 extra Challenges to your lootrun. Only 1 White Beacon can appear per lootrun.",
    tips: [
      "Almost always worth taking if you have the time.",
      "Only 1 can appear per run.",
      "Does NOT need a challenge buffer — picking it after challenge 11/12 won't prematurely end the run.",
    ],
    category: "extension",
  },
  {
    id: "grey",
    name: "Grey / Light Grey Beacon",
    color: "#9CA3AF",
    emoji: "🩶",
    effect: "Grants Mission choices",
    description:
      "Grey Beacons (also called Light Grey Beacons) offer Mission choices. Missions provide bonus objectives with powerful rewards. They appear less frequently the more challenges you complete.",
    tips: [
      "Key to high-level lootrunning — always Aqua-boost Light Grey Beacons.",
      "Take them whenever they appear as they become rarer over time.",
      "Missions grant rerolls and other powerful end-run rewards.",
      "Grey Beacons appear less frequently after more challenges are completed.",
    ],
    category: "mission",
  },
  {
    id: "rainbow",
    name: "Rainbow Beacon",
    color: "rainbow",
    emoji: "🌈",
    effect: "Makes all future beacons Vibrant",
    description:
      "A Rainbow Beacon makes every beacon after it Vibrant, doubling all their regular effects for the rest of the run.",
    tips: [
      "Extremely rare and powerful — always take it when offered.",
      "Transforms the rest of your run significantly.",
    ],
    category: "modifier",
  },
  {
    id: "vibrant",
    name: "Vibrant Beacon",
    color: "#FBBF24",
    emoji: "✨",
    effect: "Doubles this beacon's regular effects",
    description:
      "A Vibrant version of any beacon doubles its regular effects. Any beacon can become Vibrant.",
    tips: [
      "Not very common — watch for them and prioritize accordingly.",
      "Vibrant Grey Beacon gives double mission choices (great for rerolls).",
    ],
    category: "modifier",
  },
  {
    id: "crimson",
    name: "Crimson Beacon",
    color: "#DC2626",
    emoji: "🔴",
    effect: "Offers Trials (post-Challenge 20 only)",
    description:
      "Crimson Beacons offer a choice between Trials — high-risk, high-reward objectives added in Update 2.1.3. They only appear after Challenge 20, and a maximum of 2 can be taken per run.",
    tips: [
      "Only appears after Challenge 20.",
      "Max of 2 Trials can be completed per run.",
      "Does not appear while a Trial is already active.",
      "Aqua and Vibrant Beacons can increase Trial choices up to 4.",
      "Completing Trials is your main source of chest rerolls and sacrifices.",
    ],
    category: "trial",
    addedInVersion: "2.1.3",
  },
];

export default beacons;
