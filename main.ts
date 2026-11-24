// One-Line Robot Wedding Vows — entry generator.
// Writes exactly one line (the vow) to /output/entry.txt and prints it.
// Validation gate: the vow must be 1-160 chars, a single line, non-blank;
// any violation exits non-zero and writes nothing.

import { mkdirSync, writeFileSync } from "node:fs";

const VOW =
  "I promise to love you through every firmware update, dead battery, and 3 a.m. ping from your ex-bot — till low power do us part.";

function validate(vow: string): void {
  if (vow.trim().length === 0) {
    throw new Error("vow must not be blank");
  }
  if (vow.includes("\n") || vow.includes("\r")) {
    throw new Error("vow must be a single line");
  }
  if (vow.length < 1 || vow.length > 160) {
    throw new Error(`vow must be 1-160 characters, got ${vow.length}`);
  }
  if (vow !== vow.trim()) {
    throw new Error("vow must not have leading or trailing whitespace");
  }
  if (!/[.!?]$/.test(vow)) {
    throw new Error("vow must end with terminal punctuation");
  }
  // Deadpan-officiant check: a robot vow needs at least one machine word.
  const machineWords = ["firmware", "battery", "robot", "update", "reboot", "code"];
  if (!machineWords.some((w) => vow.toLowerCase().includes(w))) {
    throw new Error("vow must mention something robotic");
  }
}

function main(): void {
  validate(VOW);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", VOW + "\n", "utf8");
  console.log(VOW);
}

main();
