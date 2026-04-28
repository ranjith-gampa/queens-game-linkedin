import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level726 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "B", "B"],
    ["A", "C", "A", "A", "A", "A", "B"],
    ["A", "C", "D", "D", "D", "A", "A"],
    ["A", "C", "E", "F", "D", "A", "A"],
    ["A", "C", "C", "F", "F", "F", "A"],
    ["A", "C", "C", "A", "A", "A", "A"],
    ["G", "C", "C", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: anakiwa,
    B: saharaSand,
    C: celadon,
    D: lightWisteria,
    E: altoMain,
    F: chardonnay,
    G: bittersweet,
  },
};

export default level726;
