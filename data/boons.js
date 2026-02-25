/**
 * Wynncraft Lootrunning - Boons
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 *
 * Dynamic Boons trigger on an ongoing condition for the rest of the run.
 * Static Boons give an immediate one-time buff scaled to your current progress.
 *
 * maxStacks: null = N/A (no stated cap or non-stacking)
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
    type: boonTypes.DYNAMIC,
    category: "beacon",
    effect: "Gain [+effect] once offered a Blue/Purple Beacon >10 times",
    description:
      "Once you've been offered a Blue or Purple Beacon more than 10 times this Lootrun, gain [+effect].",
    maxStacks: null,
    stackable: false,
    priority: "low",
  },
  {
    id: "picky_looter",
    name: "Picky Looter",
    type: boonTypes.DYNAMIC,
    category: "beacon",
    effect: "Gain [+effect] every time you are offered a Yellow Beacon",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you get offered a Yellow Beacon.",
    maxStacks: 15,
    stackable: true,
    priority: "medium",
  },
  {
    id: "heavensent",
    name: "Heavensent",
    type: boonTypes.DYNAMIC,
    category: "beacon",
    effect: "Gain [+effect] for each Beacon offered",
    description:
      "For the rest of your Lootrun, gain [+effect] for each Beacon offered.",
    maxStacks: 15,
    stackable: true,
    priority: "high",
  },

  // Timer-triggered
  {
    id: "slowrunner",
    name: "Slowrunner",
    type: boonTypes.DYNAMIC,
    category: "timer",
    effect: "Gain [+effect] when less than 6m is left on the timer",
    description:
      "For the rest of your Lootrun, gain [+effect] when less than 6m is left on the timer.",
    maxStacks: null,
    stackable: false,
    priority: "low",
  },
  {
    id: "clockworker",
    name: "Clockworker",
    type: boonTypes.DYNAMIC,
    category: "timer",
    effect: "Gain [+effect] for every minute left on the timer",
    description:
      "For the rest of your Lootrun, gain [+effect] for every minute left on the timer.",
    maxStacks: 15,
    stackable: true,
    priority: "medium",
  },

  // Chest/item-triggered
  {
    id: "looter",
    name: "Looter",
    type: boonTypes.DYNAMIC,
    category: "chest",
    effect: "Gain [+effect] for every 4 items offered from a Chest",
    description:
      "For the rest of your Lootrun, gain [+effect] for every 4 items offered to you from a Chest.",
    maxStacks: 15,
    stackable: true,
    priority: "high",
  },
  {
    id: "serendipity",
    name: "Serendipity",
    type: boonTypes.DYNAMIC,
    category: "chest",
    effect: "Gain [+effect] every time you open a Chest",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you open a Chest.",
    maxStacks: 15,
    stackable: true,
    priority: "high",
  },

  // Curse-triggered
  {
    id: "bad_omen",
    name: "Bad Omen",
    type: boonTypes.DYNAMIC,
    category: "curse",
    effect: "Gain [+effect] every time you get a Curse",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you get a Curse.",
    maxStacks: 8,
    stackable: true,
    priority: "medium",
  },

  // Boon-triggered
  {
    id: "midas_touch",
    name: "Midas Touch",
    type: boonTypes.DYNAMIC,
    category: "boon",
    effect: "Gain [+effect] every time you get a Boon",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you get a Boon.",
    maxStacks: 8,
    stackable: true,
    priority: "medium",
  },

  // Kill-triggered
  {
    id: "killstreak",
    name: "Killstreak",
    type: boonTypes.DYNAMIC,
    category: "kill",
    effect: "Gain [+effect] for 60s every time you kill 5 Mobs (resets per kill)",
    description:
      "For the rest of your Lootrun, gain [+effect] for 60s everytime you kill 5 Mobs. Duration resets after every kill.",
    maxStacks: null,
    stackable: false,
    priority: "medium",
  },

  // Challenge-triggered
  {
    id: "persistent_champion",
    name: "Persistent Champion",
    type: boonTypes.DYNAMIC,
    category: "challenge",
    effect: "Gain [+effect] every time you complete a Challenge",
    description:
      "For the rest of your Lootrun, gain [+effect] everytime you complete a Challenge.",
    maxStacks: 15,
    stackable: true,
    priority: "high",
  },
  {
    id: "patient_champion",
    name: "Patient Champion",
    type: boonTypes.DYNAMIC,
    category: "challenge",
    effect: "Gain [+effect] once you reach 20 Challenges completed",
    description:
      "Once you reach 20 Challenges completed during your Lootrun, gain [+effect].",
    maxStacks: null,
    stackable: false,
    priority: "medium",
  },

  // ── Static Boons ─────────────────────────────────────────────────────────

  {
    id: "parsimonious",
    name: "Parsimonious",
    type: boonTypes.STATIC,
    category: "static",
    effect: "Immediately gain [+effect] per 4 items offered from Chests this run",
    description:
      "This time only, immediately gain [+effect] for every 4 items offered to you from Chests this Lootrun.",
    maxStacks: 15,
    stackable: true,
    priority: "medium",
  },
  {
    id: "madman",
    name: "Madman",
    type: boonTypes.STATIC,
    category: "static",
    effect: "Immediately gain [+effect] per Curse you currently have",
    description:
      "This time only, immediately gain [+effect] for every Curse you currently have.",
    maxStacks: 8,
    stackable: true,
    priority: "highest",
    notes: "Best taken when you have as many active Curses as possible (up to 8).",
  },
  {
    id: "lightbringer",
    name: "Lightbringer",
    type: boonTypes.STATIC,
    category: "static",
    effect: "Immediately gain [+effect] per Boon you currently have",
    description:
      "This time only, immediately gain [+effect] for every Boon you currently have.",
    maxStacks: 6,
    stackable: true,
    priority: "high",
    notes: "Best taken late in the run once you've accumulated many Boons.",
  },
  {
    id: "mob_slaughter",
    name: "Mob Slaughter",
    type: boonTypes.STATIC,
    category: "static",
    effect: "Immediately gain [+effect] per 10 Mobs killed this run",
    description:
      "This time only, immediately gain [+effect] for every 10 Mobs killed this Lootrun.",
    maxStacks: 15,
    stackable: true,
    priority: "medium",
  },
  {
    id: "retrograde_champion",
    name: "Retrograde Champion",
    type: boonTypes.STATIC,
    category: "static",
    effect: "Immediately gain [+effect] per Challenge completed this run",
    description:
      "This time only, immediately gain [+effect] for every Challenge completed during this Lootrun.",
    maxStacks: 15,
    stackable: true,
    priority: "medium",
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
  { id: "static", label: "Static", description: "Immediate one-time buffs" },
];

export default boons;
