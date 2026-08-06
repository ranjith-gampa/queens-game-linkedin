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

const level825 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "C", "C", "C", "D"],
    ["A", "E", "A", "B", "C", "F", "C", "D"],
    ["A", "E", "A", "B", "C", "F", "C", "D"],
    ["A", "A", "A", "B", "C", "C", "C", "D"],
    ["A", "A", "A", "B", "A", "A", "G", "G"],
    ["A", "A", "A", "B", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "A", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H"],
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
};

export default level825;
