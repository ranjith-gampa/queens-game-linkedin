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

const level757 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "B", "B", "B", "B", "B", "A"],
    ["A", "B", "C", "C", "D", "D", "B", "A"],
    ["A", "B", "C", "E", "E", "D", "B", "A"],
    ["A", "F", "C", "E", "E", "D", "F", "A"],
    ["A", "F", "C", "C", "D", "D", "F", "A"],
    ["A", "F", "F", "F", "F", "F", "F", "G"],
    ["A", "A", "H", "H", "G", "G", "G", "G"],
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

export default level757;
