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
  path: "/bonus-level/2026-01-11",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "A", "A", "A"],
    ["A", "C", "A", "A", "A", "A", "A", "D", "A"],
    ["A", "C", "C", "E", "D", "D", "D", "D", "A"],
    ["A", "A", "C", "E", "E", "D", "D", "A", "A"],
    ["F", "A", "C", "E", "E", "E", "D", "A", "G"],
    ["F", "A", "C", "E", "E", "E", "D", "A", "G"],
    ["A", "A", "C", "A", "A", "A", "D", "A", "A"],
    ["A", "C", "C", "A", "H", "A", "I", "I", "A"],
    ["A", "A", "A", "A", "H", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: bittersweet,
    E: altoMain,
    F: celadon,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
};

export default level;
