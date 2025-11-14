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

const level561 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "B", "B", "B", "B", "B", "B", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["C", "C", "B", "B", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "A", "A"],
    ["C", "C", "B", "B", "B", "B", "B", "B", "E", "E", "F", "F", "E", "E", "G", "G"],
    ["H", "H", "H", "H", "H", "H", "B", "B", "E", "E", "F", "F", "E", "E", "G", "G"],
    ["H", "H", "B", "B", "B", "B", "B", "B", "E", "E", "F", "F", "E", "E", "G", "G"],
    ["H", "H", "H", "H", "H", "H", "G", "G", "E", "E", "E", "E", "E", "E", "G", "G"],
    ["H", "H", "H", "H", "H", "H", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
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

export default level561;
