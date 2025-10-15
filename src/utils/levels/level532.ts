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

const level532 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "C", "C", "C", "C", "C", "C", "C", "C", "D", "D"],
    ["A", "A", "B", "B", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D", "D", "D"],
    ["A", "A", "B", "B", "B", "B", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D"],
    ["A", "A", "A", "A", "B", "B", "E", "E", "E", "E", "F", "F", "F", "F", "D", "D"],
    ["A", "A", "B", "B", "B", "B", "E", "E", "E", "E", "F", "F", "D", "D", "D", "D"],
    ["A", "A", "G", "G", "G", "G", "G", "G", "E", "E", "F", "F", "F", "F", "D", "D"],
    ["H", "H", "G", "G", "G", "G", "G", "G", "E", "E", "F", "F", "D", "D", "D", "D"],
    ["H", "H", "G", "G", "G", "G", "E", "E", "E", "E", "F", "F", "D", "D", "D", "D"],
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

export default level532;
