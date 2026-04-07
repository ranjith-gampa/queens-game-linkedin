import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level705 = {
  size: 7,
  colorRegions: [
    ["A", "A", "B", "B", "A", "C", "A"],
    ["A", "A", "A", "A", "A", "C", "A"],
    ["A", "A", "A", "A", "A", "A", "A"],
    ["A", "D", "A", "A", "A", "A", "E"],
    ["A", "D", "A", "A", "F", "A", "E"],
    ["A", "A", "A", "A", "F", "A", "A"],
    ["A", "G", "G", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: saharaSand,
    B: lightWisteria,
    C: chardonnay,
    D: altoMain,
    E: anakiwa,
    F: celadon,
    G: bittersweet,
  },
};

export default level705;
