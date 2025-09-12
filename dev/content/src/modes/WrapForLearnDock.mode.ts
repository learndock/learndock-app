import { Katalog } from '../Types';
import fs from 'fs';
import path from 'path';
import { getCurrentTimestamp, levenshtein } from '../Util';

interface LearnDockExample {
  text: string;
  type: string;
}

interface LearnDockCompetence {
  title: string;
  description: string;
}

interface LearnDockTopic {
  title: string;
  competences: LearnDockCompetence[];
}

interface LearnDockEntry {
  title: string;
  relatedLearningFields: string[];
  locationInRegulation: string;
  examples: LearnDockExample[];
  topics: LearnDockTopic[];
}

export function wrapForLearnDock(katalog: Katalog, fileArg: string) {
  const outputFile = `./output/wrap-learn-dock/${fileArg}_${getCurrentTimestamp()}.json`;

  // Ensure folder exists
  const folder = path.dirname(outputFile);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`📁 Created folder: ${folder}`);
  }

  const entries: LearnDockEntry[] = [];

  // Process katalog
  for (const fkKey in katalog) {
    const fragenkomplex = katalog[fkKey];

    const topics: LearnDockTopic[] = Object.keys(fragenkomplex.themen).map((themaKey) => {
      const thema = fragenkomplex.themen[themaKey];

      if (!Array.isArray(thema.themenkreise)) {
        console.warn(`⚠ Thema "${thema.name}" has no themenkreise array.`);
        return { title: thema.name, competences: [] };
      }

      const competences: LearnDockCompetence[] = thema.themenkreise.map((tk) => ({
        title: tk,
        description: ``
      }));

      return { title: thema.name, competences };
    });

    entries.push({
      title: fragenkomplex.name,
      relatedLearningFields: [],
      locationInRegulation: "",
      examples: [{ text: "", type: "" }],
      topics
    });
  }

  console.log(`📋 Generated ${entries.length} LearnDock entries`);

  // Write JSON output
  fs.writeFileSync(outputFile, JSON.stringify(entries, null, 2), "utf-8");
  console.log(`💾 Results saved to ${outputFile}`);

  return entries;
}
