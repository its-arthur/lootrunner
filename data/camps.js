/**
 * Wynncraft Lootrunning - Lootrun Camps
 * Source: https://wynncraft.wiki.gg/wiki/Lootrunning
 *
 * There are currently 5 Lootrun Camps across the endgame regions of Wynncraft.
 * Players can start a lootrun at any of these camps after signing up with
 * the Lootrun Chief inside the Silverbull Trading Company Headquarters
 * (located east of Cinfras).
 */

export const camps = [
  {
    id: "canyon_of_the_lost",
    name: "Canyon of the Lost Excursion",
    shortName: "Canyon (South)",
    region: "Canyon of the Lost",
    location: "Outside Thesead (South)",
    description:
      "A lootrun camp situated in the harsh Canyon of the Lost region, south of Thesead. Features desert and canyon-themed caves and challenges.",
    difficulty: "Endgame",
    terrain: "Desert / Canyon",
    nearestCity: "Thesead",
    tips: [
      "Desert terrain — be prepared for heat-related environmental hazards.",
      "Canyon geography can make mob kiting tricky.",
    ],
  },
  {
    id: "corkus_traversal",
    name: "The Corkus Traversal",
    shortName: "Corkus",
    region: "Corkus",
    location: "South of Corkus City",
    description:
      "A lootrun camp on the mechanical island of Corkus. Features industrial and tech-themed environments with unique Corkus-style mobs.",
    difficulty: "Endgame",
    terrain: "Industrial / Mechanical",
    nearestCity: "Corkus City",
    tips: [
      "Corkus mobs can have unique mechanical abilities.",
      "South of Corkus City — fast to reach via boat from Selchar.",
    ],
  },
  {
    id: "molten_heights",
    name: "Molten Heights Hike",
    shortName: "Molten Heights",
    region: "Molten Heights",
    location: "Outside Rodoroc",
    description:
      "A lootrun camp in the volcanic Molten Heights region, near the dwarven city of Rodoroc. Features lava-filled caves and fire-themed challenges.",
    difficulty: "Endgame",
    terrain: "Volcanic / Lava",
    nearestCity: "Rodoroc",
    tips: [
      "Fire and lava hazards throughout — use fire resistance if available.",
      "Dwarven region with unique mob types.",
    ],
  },
  {
    id: "sky_islands",
    name: "Sky Islands Exploration",
    shortName: "Sky Islands",
    region: "Sky Islands",
    location: "South of Ahmsord",
    description:
      "A lootrun camp in the floating Sky Islands region, south of Ahmsord. Features aerial and cloud-themed challenges on floating platforms.",
    difficulty: "Endgame",
    terrain: "Sky / Floating Islands",
    nearestCity: "Ahmsord",
    tips: [
      "Watch for fall damage on floating island terrain.",
      "Aerial mobs may have unique movement patterns.",
    ],
  },
  {
    id: "silent_expanse",
    name: "Silent Expanse Expedition",
    shortName: "Silent Expanse",
    region: "Silent Expanse",
    location: "North of Lutho",
    description:
      "A lootrun camp in the eerie Silent Expanse, north of Lutho. Features otherworldly, void-themed environments and some of the most dangerous mobs in the game.",
    difficulty: "Endgame (Hardest)",
    terrain: "Void / Otherworldly",
    nearestCity: "Lutho",
    tips: [
      "The most difficult lootrun camp — requires strong builds.",
      "Void-themed mobs can have unique and dangerous abilities.",
      "North of Lutho — far from fast travel points.",
    ],
  },
];

export const campRegistration = {
  npc: "Lootrun Chief",
  location: "Silverbull Trading Company Headquarters",
  locationDetails: "East of Cinfras",
  requirements: "Endgame level (recommend level 100+)",
  cost: "Free to join",
  description:
    "Players must speak to the Lootrun Chief to sign up before they can start a lootrun at any camp.",
};

export const campFeatures = {
  challengesPerRun: {
    base: 10,
    withWhiteBeacon: 15,
    withRedBeacons: "Variable (no extra time)",
  },
  beaconChoices: {
    default: 2,
    withSentinelII: 3,
    withOrangeBeacon: "3+",
  },
  maxMissions: 4,
  maxTrials: 2,
  missionCutoff: "Challenge 30 (missions stop appearing)",
  trialStart: "Challenge 20 (Crimson Beacons begin appearing)",
  trialCutoff: "~Challenge 50 (Crimson Beacons stop appearing)",
};

export default camps;
