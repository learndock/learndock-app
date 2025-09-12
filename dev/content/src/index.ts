import { loadKatalog } from "./Util";
import { extractCompetences } from "./modes/ExtractCompetences.mode";
import { wrapForLearnDock } from "./modes/WrapForLearnDock.mode";

type Mode = "extract-competences" | "wrap-for-learndock";
const availableModes: Mode[] = ["extract-competences", "wrap-for-learndock"]

const [, , rawMode, file] = process.argv;

if (!rawMode) {
  throw new Error("Please provide a mode");
}

if (!file) {
  throw new Error("Please provide a Katalog filename");
}

const mode = rawMode as Mode;

if (!availableModes.includes(mode)) {
  throw new Error(`Invalid mode "${mode}". Allowed: ${availableModes.join(",")}`);
}

(async () => {
  const katalog = await loadKatalog(file);
  switch (mode) {
    case "extract-competences":
      extractCompetences(katalog, file);
    case "wrap-for-learndock":
      wrapForLearnDock(katalog, file);
  }
})();
