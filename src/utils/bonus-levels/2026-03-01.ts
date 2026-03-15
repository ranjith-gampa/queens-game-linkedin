import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  nomad,
  saharaSand,
} from "../colors";

const level = {
  path: "/bonus-level/2026-03-01",
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B"],
    ["A", "B", "B", "C", "D", "D", "D", "B"],
    ["A", "B", "C", "C", "C", "C", "D", "D"],
    ["A", "A", "C", "C", "C", "C", "C", "E"],
    ["F", "C", "C", "C", "C", "C", "E", "E"],
    ["F", "F", "C", "C", "C", "C", "E", "G"],
    ["H", "F", "F", "F", "C", "E", "E", "G"],
    ["H", "H", "H", "E", "E", "E", "G", "G"],
  ],
  regionColors: {
    A: nomad,
    B: bittersweet,
    C: altoMain,
    D: saharaSand,
    E: celadon,
    F: chardonnay,
    G: anakiwa,
    H: lightWisteria,
  },
};

export default level;
