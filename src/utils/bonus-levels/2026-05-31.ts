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
  path: "/bonus-level/2026-05-31",
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B"],
    ["A", "C", "C", "B", "B", "B", "B", "B"],
    ["C", "C", "D", "D", "B", "E", "E", "B"],
    ["C", "D", "D", "D", "F", "F", "E", "E"],
    ["C", "C", "D", "D", "D", "F", "F", "E"],
    ["G", "C", "C", "H", "D", "F", "E", "E"],
    ["G", "G", "G", "H", "D", "E", "E", "D"],
    ["G", "H", "H", "H", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: lightWisteria,
    B: anakiwa,
    C: celadon,
    D: altoMain,
    E: bittersweet,
    F: chardonnay,
    G: saharaSand,
    H: nomad,
  },
  isNew: true,
};

export default level;
