/**
 * Wynncraft Lootrunning - Boons
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 *
 * Dynamic Boons trigger on an ongoing condition for the rest of the run.
 * Static Boons give an immediate one-time buff scaled to your current progress.
 *
 * maxStacks: null = N/A (no stated cap or non-stacking)
 * nameColor: Tailwind text class for boon name styling.
 */

export const boonTypes = {
  DYNAMIC: "dynamic",
  STATIC: "static",
};

export const boons = [
  // ── Dynamic Boons ────────────────────────────────────────────────────────

  // Beacon-triggered
  {
    id: "persnickety",
    name: "Persnickety",
    nameColor: "text-amber-400",
    type: boonTypes.DYNAMIC,
    category: "beacon",
    description:
      "Once you've been offered a Blue or Purple Beacon more than 10 times this Lootrun, gain [+effect].",
    maxStacks: null,
    stackable: false,
  },
  {
    id: "picky_looter",
    name: "Picky Looter",
    nameColor: "text-amber-400",
    type: boonTypes.DYNAMIC,
    category: "beacon",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you get offered a Yellow Beacon.",
    maxStacks: 15,
    stackable: true,
  },
  {
    id: "heavensent",
    name: "Heavensent",
    nameColor: "text-amber-400",
    type: boonTypes.DYNAMIC,
    category: "beacon",
    description:
      "For the rest of your Lootrun, gain [+effect] for each Beacon offered.",
    maxStacks: 15,
    stackable: true,
  },

  // Timer-triggered
  {
    id: "slowrunner",
    name: "Slowrunner",
    nameColor: "text-lime-400",
    type: boonTypes.DYNAMIC,
    category: "timer",
    description:
      "For the rest of your Lootrun, gain [+effect] when less than 6m is left on the timer.",
    maxStacks: null,
    stackable: false,
  },
  {
    id: "clockworker",
    name: "Clockworker",
    nameColor: "text-lime-400",
    type: boonTypes.DYNAMIC,
    category: "timer",
    description:
      "For the rest of your Lootrun, gain [+effect] for every minute left on the timer.",
    maxStacks: 15,
    stackable: true,
  },

  // Chest/item-triggered
  {
    id: "looter",
    name: "Looter",
    nameColor: "text-yellow-300",
    type: boonTypes.DYNAMIC,
    category: "chest",
    description:
      "For the rest of your Lootrun, gain [+effect] for every 4 items offered to you from a Chest.",
    maxStacks: 15,
    stackable: true,
  },
  {
    id: "serendipity",
    name: "Serendipity",
    nameColor: "text-yellow-300",
    type: boonTypes.DYNAMIC,
    category: "chest",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you open a Chest.",
    maxStacks: 15,
    stackable: true,
  },

  // Curse-triggered
  {
    id: "bad_omen",
    name: "Bad Omen",
    nameColor: "text-purple-400",
    type: boonTypes.DYNAMIC,
    category: "curse",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you get a Curse.",
    maxStacks: 8,
    stackable: true,
  },

  // Boon-triggered
  {
    id: "midas_touch",
    name: "Midas Touch",
    nameColor: "text-blue-400",
    type: boonTypes.DYNAMIC,
    category: "boon",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you get a Boon.",
    maxStacks: 8,
    stackable: true,
  },

  // Kill-triggered
  {
    id: "killstreak",
    name: "Killstreak",
    nameColor: "text-red-400",
    type: boonTypes.DYNAMIC,
    category: "kill",
    description:
      "For the rest of your Lootrun, gain [+effect] for 60s everytime you kill 5 Mobs. Duration resets after every kill.",
    maxStacks: null,
    stackable: false,
  },

  // Challenge-triggered
  {
    id: "persistent_champion",
    name: "Persistent Champion",
    nameColor: "text-white",
    type: boonTypes.DYNAMIC,
    category: "challenge",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you complete a Challenge.",
    maxStacks: 15,
    stackable: true,
  },
  {
    id: "patient_champion",
    name: "Patient Champion",
    nameColor: "text-white",
    type: boonTypes.DYNAMIC,
    category: "challenge",
    description:
      "Once you reach 20 Challenges completed during your Lootrun, gain [+effect].",
    maxStacks: null,
    stackable: false,
  },

  // ── Static Boons ─────────────────────────────────────────────────────────

  {
    id: "parsimonious",
    name: "Parsimonious",
    nameColor: "text-yellow-300",
    type: boonTypes.STATIC,
    category: "chest",
    description:
      "This time only, immediately gain [+effect] for every 4 items offered to you from Chests this Lootrun.",
    maxStacks: 15,
    stackable: true,
  },
  {
    id: "madman",
    name: "Madman",
    nameColor: "text-purple-400",
    type: boonTypes.STATIC,
    category: "curse",
    description:
      "This time only, immediately gain [+effect] for every Curse you currently have.",
    maxStacks: 8,
    stackable: true,
  },
  {
    id: "lightbringer",
    name: "Lightbringer",
    nameColor: "text-blue-400",
    type: boonTypes.STATIC,
    category: "boon",
    description:
      "This time only, immediately gain [+effect] for every Boon you currently have.",
    maxStacks: 6,
    stackable: true,
  },
  {
    id: "mob_slaughter",
    name: "Mob Slaughter",
    nameColor: "text-red-400",
    type: boonTypes.STATIC,
    category: "kill",
    description:
      "This time only, immediately gain [+effect] for every 10 Mobs killed this Lootrun.",
    maxStacks: 15,
    stackable: true,
  },
  {
    id: "retrograde_champion",
    name: "Retrograde Champion",
    nameColor: "text-white",
    type: boonTypes.STATIC,
    category: "challenge",
    description:
      "This time only, immediately gain [+effect] for every Challenge completed during this Lootrun.",
    maxStacks: 15,
    stackable: true,
  },
];

export const boonCategories = [
  { id: "beacon", label: "Beacon", description: "Triggered by Beacon offers" },
  { id: "chest", label: "Chest", description: "Triggered by opening Chests or finding items" },
  { id: "challenge", label: "Challenge", description: "Triggered by completing Challenges" },
  { id: "curse", label: "Curse", description: "Triggered by gaining Curses" },
  { id: "boon", label: "Boon", description: "Triggered by gaining Boons" },
  { id: "kill", label: "Kill", description: "Triggered by killing Mobs" },
  { id: "timer", label: "Timer", description: "Triggered by the run timer" },
];

export default boons;
