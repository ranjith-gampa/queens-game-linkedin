import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightOrchid,
  lightWisteria,
  nomad,
  saharaSand,
} from "../colors";

const level = {
  path: "/bonus-level/2026-04-05",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "B", "B", "B", "B"],
    ["C", "C", "A", "B", "B", "B", "B", "B", "B"],
    ["C", "C", "A", "B", "B", "B", "B", "B", "B"],
    ["C", "C", "A", "B", "D", "D", "D", "D", "D"],
    ["C", "C", "A", "B", "B", "B", "D", "E", "E"],
    ["A", "A", "A", "A", "A", "F", "D", "E", "E"],
    ["G", "G", "G", "H", "H", "F", "D", "E", "E"],
    ["I", "G", "H", "H", "F", "F", "D", "E", "E"],
    ["I", "I", "I", "H", "D", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: lightOrchid,
    D: celadon,
    E: bittersweet,
    F: altoMain,
    G: saharaSand,
    H: nomad,
    I: anakiwa,
  },
  isNew: true,
};

export default level;
