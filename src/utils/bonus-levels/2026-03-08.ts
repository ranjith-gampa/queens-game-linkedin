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
  path: "/bonus-level/2026-03-08",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "C", "C", "C"],
    ["A", "D", "D", "B", "B", "B", "C", "C", "C"],
    ["A", "D", "B", "B", "B", "C", "C", "C", "C"],
    ["A", "B", "B", "B", "B", "E", "E", "E", "C"],
    ["B", "B", "B", "B", "B", "B", "E", "E", "E"],
    ["B", "B", "F", "G", "B", "B", "B", "E", "E"],
    ["H", "F", "F", "G", "G", "B", "B", "B", "E"],
    ["H", "H", "F", "I", "I", "I", "B", "B", "B"],
    ["H", "H", "H", "I", "I", "I", "I", "B", "B"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: bittersweet,
    D: lightOrchid,
    E: altoMain,
    F: anakiwa,
    G: saharaSand,
    H: nomad,
    I: celadon,
  },
};

export default level;
