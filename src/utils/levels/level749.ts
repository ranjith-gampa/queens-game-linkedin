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

const level749 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "B", "C", "C", "D", "D", "A"],
    ["A", "B", "E", "E", "C", "C", "D", "A"],
    ["A", "B", "E", "E", "E", "C", "D", "A"],
    ["A", "F", "E", "E", "C", "C", "D", "A"],
    ["A", "F", "F", "G", "G", "D", "D", "A"],
    ["A", "F", "D", "D", "D", "D", "D", "A"],
    ["A", "F", "H", "H", "H", "H", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: bittersweet,
    D: celadon,
    E: nomad,
    F: altoMain,
    G: saharaSand,
    H: anakiwa,
  },
};

export default level749;
