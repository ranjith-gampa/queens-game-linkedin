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

const level632 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "A", "A", "A", "A", "C", "B", "B"],
    ["A", "A", "A", "D", "D", "C", "B", "B"],
    ["A", "A", "D", "D", "D", "D", "E", "E"],
    ["A", "F", "G", "G", "G", "G", "F", "H"],
    ["A", "F", "F", "G", "G", "F", "F", "H"],
    ["A", "F", "F", "F", "F", "F", "F", "H"],
    ["A", "A", "H", "H", "H", "H", "H", "H"],
  ],
  regionColors: {
    A: nomad,
    B: celadon,
    C: altoMain,
    D: anakiwa,
    E: bittersweet,
    F: lightWisteria,
    G: chardonnay,
    H: saharaSand,
  },
};

export default level632;
