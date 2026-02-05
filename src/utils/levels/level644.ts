import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level644 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "A", "A", "A", "A", "A"],
    ["A", "B", "C", "C", "A", "A", "A"],
    ["D", "D", "C", "C", "A", "A", "A"],
    ["D", "D", "E", "E", "E", "A", "A"],
    ["D", "D", "F", "F", "G", "G", "A"],
    ["D", "D", "F", "F", "G", "G", "A"],
  ],
  regionColors: {
    A: saharaSand,
    B: bittersweet,
    C: celadon,
    D: altoMain,
    E: anakiwa,
    F: lightWisteria,
    G: chardonnay,
  },
};

export default level644;
