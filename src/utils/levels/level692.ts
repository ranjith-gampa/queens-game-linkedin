import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level692 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "A", "C", "A", "A", "A"],
    ["B", "D", "A", "D", "A", "D", "A"],
    ["E", "D", "D", "D", "D", "D", "A"],
    ["E", "D", "D", "D", "D", "D", "F"],
    ["E", "G", "G", "G", "G", "F", "F"],
    ["E", "E", "E", "G", "F", "F", "F"],
  ],
  regionColors: {
    A: anakiwa,
    B: celadon,
    C: chardonnay,
    D: lightWisteria,
    E: altoMain,
    F: saharaSand,
    G: bittersweet,
  },
  isNew: true,
};

export default level692;
