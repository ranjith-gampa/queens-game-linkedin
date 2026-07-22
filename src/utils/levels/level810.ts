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

const level810 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "B", "B", "A", "A"],
    ["A", "A", "A", "C", "C", "C", "A", "A"],
    ["D", "D", "D", "A", "A", "A", "A", "A"],
    ["E", "E", "E", "E", "A", "A", "A", "A"],
    ["F", "F", "F", "F", "F", "A", "A", "A"],
    ["G", "G", "G", "G", "G", "G", "A", "A"],
    ["H", "H", "H", "H", "H", "H", "H", "A"],
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

export default level810;
