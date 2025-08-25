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
  path: "/bonus-level/2025-08-17",
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "C", "C", "C", "C"],
    ["A", "A", "B", "B", "D", "D", "B", "B", "B", "B", "C", "C", "C", "C", "C", "C"],
    ["B", "B", "B", "B", "D", "D", "B", "B", "E", "E", "C", "C", "C", "C", "C", "C"],
    ["B", "B", "B", "B", "D", "D", "B", "B", "E", "E", "C", "C", "C", "C", "C", "C"],
    ["B", "B", "B", "B", "B", "B", "B", "B", "E", "E", "C", "C", "F", "F", "C", "C"],
    ["B", "B", "G", "G", "B", "B", "B", "B", "C", "C", "C", "C", "F", "F", "C", "C"],
    ["B", "B", "G", "G", "B", "B", "H", "H", "C", "C", "C", "C", "C", "C", "C", "C"],
    ["B", "B", "B", "B", "B", "B", "H", "H", "C", "C", "C", "C", "C", "C", "C", "C"],
    ["B", "B", "B", "B", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
    H: nomad,
  },
  isNew: true,
};

export default level;
