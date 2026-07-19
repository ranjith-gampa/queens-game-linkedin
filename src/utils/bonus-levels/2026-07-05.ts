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
  path: "/bonus-level/2026-07-05",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    ["A", "D", "A", "A", "B", "B", "D", "E", "C"],
    ["A", "D", "D", "A", "A", "A", "D", "E", "E"],
    ["F", "D", "D", "D", "D", "D", "D", "E", "E"],
    ["F", "F", "D", "D", "G", "D", "D", "E", "H"],
    ["F", "F", "D", "D", "D", "D", "D", "D", "H"],
    ["F", "I", "D", "I", "I", "I", "D", "D", "H"],
    ["I", "I", "D", "I", "I", "I", "I", "D", "H"],
    ["I", "I", "I", "I", "I", "I", "H", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: altoMain,
    E: bittersweet,
    F: celadon,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
};

export default level;
