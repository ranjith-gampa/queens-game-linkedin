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

const level847 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "C", "C"],
    ["A", "A", "D", "A", "A", "E", "C", "C"],
    ["A", "D", "D", "D", "E", "E", "E", "C"],
    ["A", "A", "D", "F", "F", "E", "A", "C"],
    ["A", "A", "G", "F", "F", "H", "A", "A"],
    ["A", "G", "G", "G", "H", "H", "H", "A"],
    ["A", "A", "G", "A", "A", "H", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: lightWisteria,
    B: anakiwa,
    C: nomad,
    D: chardonnay,
    E: celadon,
    F: altoMain,
    G: bittersweet,
    H: saharaSand,
  },
};

export default level847;
