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

const level568 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "C", "C", "C", "C", "C", "C", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "C", "C", "C", "C", "C", "C", "C", "C", "B", "B", "D", "D", "D", "D"],
    ["A", "A", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "D", "D"],
    ["E", "E", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "D", "D"],
    ["E", "E", "F", "F", "F", "F", "C", "C", "C", "C", "C", "C", "C", "C", "D", "D"],
    ["E", "E", "E", "E", "F", "F", "G", "G", "C", "C", "C", "C", "C", "C", "H", "H"],
    ["E", "E", "E", "E", "F", "F", "G", "G", "G", "G", "G", "G", "H", "H", "H", "H"],
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

export default level568;
