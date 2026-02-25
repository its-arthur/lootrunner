/**
 * Wynncraft Lootrunning - Missions
 * https://wynncraft.wiki.gg/wiki/Lootrunning (Lootrun Missions table)
 *
 * Only fields from the wiki table: Name, Reward Effect.
 * id is derived from name (snake_case). Mission objectives are randomized (wiki).
 * nameColor: Tailwind text class so mission name matches wiki table styling (Name column).
 * Trials (Crimson Beacon) are separate on the wiki and not included.
 */

// nameColor matches wiki table: orange-yellow (default), purple, green, red
export const missions = [
  { id: "cleansing_greed", name: "Cleansing Greed", nameColor: "text-yellow-300", effect: "After opening a Flying Chest, remove one of your Curses." },
  { id: "materialism", name: "Materialism", nameColor: "text-yellow-300", effect: "All Challenges now additionally have the Yellow Beacon effect. Yellow Beacons cannot appear anymore." },
  { id: "hubris", name: "Hubris", nameColor: "text-yellow-300", effect: "All flying chests contain 75% less loot but yellow beacons add +120s to your timer." },
  { id: "orphions_grace", name: "Orphion's Grace", nameColor: "text-blue-400", effect: "Boons are now 50% more effective." },
  { id: "porphyrophobia", name: "Porphyrophobia", nameColor: "text-white", effect: "All Challenges now additionally have the Blue Beacon effect. Purple Beacons cannot appear anymore." },
  { id: "high_roller", name: "High Roller", nameColor: "text-purple-400", effect: "Gain +2 End Reward Rerolls. Get 1 curse every other challenge." },
  { id: "cleansing_ritual", name: "Cleansing Ritual", nameColor: "text-purple-400", effect: "After finishing a Challenge, consume 1 Curse to gain +1 Challenge." },
  { id: "equilibrium", name: "Equilibrium", nameColor: "text-purple-400", effect: "After getting a Curse, gain +1 Beacon Reroll." },
  { id: "inner_peace", name: "Inner Peace", nameColor: "text-purple-400", effect: "Curses are now half as effective." },
  { id: "backup_beat", name: "Backup Beat", nameColor: "text-lime-400", effect: "Every time you add +360s to your timer, gain +1 Beacon Reroll." },
  { id: "stasis", name: "Stasis", nameColor: "text-lime-400", effect: "While picking a Beacon, your timer does not decrease. (Max 5m)" },
  { id: "gambling_beast", name: "Gambling Beast", nameColor: "text-red-400", effect: "After finishing a Challenge, consume 300s from your timer and gain +1 End Reward Reroll." },
  { id: "redemption", name: "Redemption", nameColor: "text-red-400", effect: "Gain +1 End Reward Sacrifice." },
  { id: "ultimate_sacrifice", name: "Ultimate Sacrifice", nameColor: "text-red-400", effect: "Gain +1 End Reward Sacrifice and +2 End Reward Rerolls. When 120s drops on the timer, lose 1 Boon. Gaining time can delay this." },
];

export default missions;
