import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level650 = {
  size: 7,
  colorRegions: [
    ["A", "B", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "C", "A", "A"],
    ["A", "D", "A", "A", "C", "A", "A"],
    ["E", "D", "E", "F", "F", "F", "A"],
    ["E", "D", "E", "E", "G", "A", "A"],
    ["E", "D", "D", "E", "G", "A", "A"],
    ["E", "E", "E", "E", "G", "G", "A"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: bittersweet,
    F: altoMain,
    G: saharaSand,
  },
  isNew: true,
};

export default level650;
