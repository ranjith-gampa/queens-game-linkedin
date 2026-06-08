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

const level767 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "C", "C", "A", "A", "D", "B", "A"],
    ["A", "C", "A", "A", "A", "D", "D", "A"],
    ["A", "A", "A", "E", "F", "F", "A", "A"],
    ["A", "A", "A", "E", "A", "F", "A", "A"],
    ["A", "A", "G", "G", "A", "A", "A", "A"],
    ["A", "A", "A", "H", "H", "A", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: nomad,
    D: anakiwa,
    E: altoMain,
    F: celadon,
    G: bittersweet,
    H: saharaSand,
  },
  isNew: true,
};

export default level767;
