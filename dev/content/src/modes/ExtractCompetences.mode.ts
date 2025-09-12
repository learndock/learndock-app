import { getCurrentTimestamp, levenshtein } from "../Util";
import { Katalog } from "../Types";
import fs from "fs";
import path from "path";

export function extractCompetences(katalog: Katalog, fileArg: string) {
  const ignoredCompetences = ["KEIN THEMENKREIS ANGEGEBEN"];
  const outputFile = `./output/extract-competences/${fileArg}_${getCurrentTimestamp()}.json`;

  // Ensure folder exists
  const folder = path.dirname(outputFile);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`📁 Created folder: ${folder}`);
  }

  const competences: string[] = [];

  // Extract all competences safely
  for (const fkKey in katalog) {
    const fragenkomplex = katalog[fkKey];
    for (const themaKey in fragenkomplex.themen) {
      const thema = fragenkomplex.themen[themaKey];

      if (!Array.isArray(thema.themenkreise)) {
        console.warn(`⚠ Thema "${thema.name}" has no themenkreise array.`);
        continue;
      }

      for (const c of thema.themenkreise) {
        if (!ignoredCompetences.includes(c)) {
          competences.push(c);
        }
      }
    }
  }

  console.log(`📋 Found ${competences.length} competences`);

  // Detect exact duplicates
  const seen = new Set<string>();
  const matched_duplicates: string[] = [];
  for (const c of competences) {
    if (seen.has(c)) matched_duplicates.push(c);
    else seen.add(c);
  }

  if (matched_duplicates.length) {
    console.log("🔁 Exact duplicates found:");
    matched_duplicates.forEach(d => console.log("  -", d));
  } else {
    console.log("✅ No exact duplicates found");
  }

  // Detect near matches
  const uniqueCompetences = Array.from(new Set(competences));
  const possible_duplicates: [string, string][] = [];

  for (let i = 0; i < uniqueCompetences.length; i++) {
    for (let j = i + 1; j < uniqueCompetences.length; j++) {
      const a = uniqueCompetences[i];
      const b = uniqueCompetences[j];
      const distance = levenshtein(a.toLowerCase(), b.toLowerCase());
      const similarity = 1 - distance / Math.max(a.length, b.length);
      if (similarity > 0.8 && similarity < 1) possible_duplicates.push([a, b]);
    }
  }

  if (possible_duplicates.length) {
    console.log("🔍 Possible near matches:");
    possible_duplicates.forEach(([a, b]) => console.log(`  - "${a}" ~ "${b}"`));
  } else {
    console.log("✅ No near matches found");
  }

  const result = {
    competences: Array.from(new Set(competences)),
    matched_duplicates,
    possible_duplicates
  };

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
  console.log(`💾 Results saved to ${outputFile}`);

  return result;
}
