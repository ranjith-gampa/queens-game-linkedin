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
  path: "/bonus-level/2025-10-19",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C"],
    ["A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "D", "D", "D", "D", "C", "C", "C", "C"],
    ["A", "A", "B", "B", "B", "B", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D", "C", "C"],
    ["A", "A", "B", "B", "A", "A", "A", "A", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "E", "E", "E", "E", "E", "E"],
    ["F", "F", "F", "F", "A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "G", "G", "E", "E"],
    ["H", "H", "F", "F", "F", "F", "A", "A", "A", "A", "E", "E", "G", "G", "G", "G", "E", "E"],
    ["H", "H", "H", "H", "F", "F", "F", "F", "A", "A", "G", "G", "G", "G", "I", "I", "I", "I"],
    ["H", "H", "H", "H", "H", "H", "A", "A", "A", "A", "G", "G", "I", "I", "I", "I", "I", "I"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: lightOrchid,
    F: saharaSand,
    G: bittersweet,
    H: nomad,
    I: altoMain,
  },
  isNew: true,
};

export default level;
