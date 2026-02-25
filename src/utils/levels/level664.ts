import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level664 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "A", "A", "A", "A", "A"],
    ["B", "C", "C", "C", "C", "D", "D"],
    ["E", "E", "C", "F", "C", "D", "D"],
    ["E", "E", "C", "C", "C", "C", "D"],
    ["E", "G", "G", "G", "G", "D", "D"],
    ["G", "G", "G", "G", "G", "G", "G"],
  ],
  regionColors: {
    A: bittersweet,
    B: chardonnay,
    C: altoMain,
    D: lightWisteria,
    E: saharaSand,
    F: celadon,
    G: anakiwa,
  },
};

export default level664;
