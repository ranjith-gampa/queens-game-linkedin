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

const level714 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "B"],
    ["A", "A", "C", "A", "A", "D", "B", "B"],
    ["A", "A", "C", "C", "D", "D", "B", "B"],
    ["A", "A", "A", "D", "D", "B", "B", "B"],
    ["A", "A", "D", "D", "E", "E", "B", "B"],
    ["A", "D", "D", "F", "F", "E", "E", "B"],
    ["D", "D", "F", "F", "F", "F", "G", "G"],
    ["H", "F", "F", "F", "F", "F", "F", "G"],
  ],
  regionColors: {
    A: nomad,
    B: saharaSand,
    C: anakiwa,
    D: lightWisteria,
    E: chardonnay,
    F: bittersweet,
    G: celadon,
    H: altoMain,
  },
};

export default level714;
