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

const level791 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "B", "A", "A", "C", "C", "A"],
    ["A", "B", "D", "D", "D", "D", "C", "A"],
    ["A", "B", "B", "E", "E", "C", "C", "A"],
    ["A", "A", "F", "E", "E", "F", "A", "A"],
    ["A", "A", "F", "F", "F", "F", "A", "A"],
    ["A", "G", "F", "F", "F", "H", "A", "A"],
    ["G", "G", "F", "F", "F", "H", "A", "A"],
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

export default level791;
