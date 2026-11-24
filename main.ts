// The Funniest Sick-Day Excuse — make.fun bounty
// u-zeroxfive-the-funniest-sick-day-excuse-37423a36
//
// Writes one line to <MAKEFUN_OUTPUT_DIR || "/output">/entry.txt:
// a single-line reason to call in sick, under 200 characters.
// No network, no secrets, no dynamic code — just fs.
//
// The line itself was chosen in NOTES.md after three rounds of drafting
// (22 candidates, scored against the judge's five criteria in order).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Can't come in today — I got my head stuck in the stair railing proving to my kid it couldn't happen.";

// The sealed gate requires entry.txt to be UTF-8 text of 1 to 200
// characters, not only whitespace, on exactly one line. Fail loudly
// here rather than shipping an entry that is never judged.
if (!LINE.trim()) {
  throw new Error("entry line must not be only whitespace");
}
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (/\r|\n/.test(LINE)) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
// Write exactly the line, no trailing newline: the file IS the entry.
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
