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

const level730 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "C", "C", "C", "C"],
    ["D", "A", "B", "B", "C", "E", "C", "C"],
    ["D", "A", "A", "F", "E", "E", "G", "G"],
    ["D", "D", "F", "F", "F", "E", "G", "G"],
    ["D", "D", "D", "F", "F", "F", "G", "G"],
    ["D", "D", "D", "D", "F", "H", "H", "G"],
    ["D", "D", "D", "D", "D", "D", "H", "G"],
    ["D", "D", "D", "D", "D", "D", "H", "H"],
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

export default level730;
