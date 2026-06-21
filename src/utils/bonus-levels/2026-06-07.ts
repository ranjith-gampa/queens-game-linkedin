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
  path: "/bonus-level/2026-06-07",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "A", "A", "C", "C", "A", "A", "B", "B"],
    ["A", "A", "C", "C", "A", "A", "A", "A", "A"],
    ["A", "A", "D", "C", "C", "A", "A", "A", "A"],
    ["A", "D", "D", "D", "E", "A", "E", "A", "A"],
    ["F", "D", "F", "D", "E", "E", "E", "A", "A"],
    ["F", "F", "F", "G", "G", "E", "A", "A", "A"],
    ["H", "F", "H", "G", "G", "H", "I", "I", "A"],
    ["H", "H", "H", "H", "H", "H", "I", "I", "A"],
  ],
  regionColors: {
    A: lightOrchid,
    B: nomad,
    C: bittersweet,
    D: altoMain,
    E: anakiwa,
    F: celadon,
    G: chardonnay,
    H: saharaSand,
    I: lightWisteria,
  },
};

export default level;
