import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level802 = {
  size: 7,
  colorRegions: [
    ["A", "B", "A", "A", "C", "C", "A"],
    ["A", "B", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A", "D", "D"],
    ["A", "A", "E", "E", "A", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "A"],
    ["A", "F", "F", "A", "A", "G", "A"],
    ["A", "A", "A", "A", "A", "G", "A"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
  },
  isNew: true,
};

export default level802;
