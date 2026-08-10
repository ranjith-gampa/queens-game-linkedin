import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level830 = {
  size: 7,
  colorRegions: [
    ["A", "B", "B", "B", "C", "D", "D"],
    ["A", "B", "E", "B", "E", "D", "D"],
    ["A", "B", "E", "B", "E", "E", "D"],
    ["A", "F", "E", "E", "E", "D", "D"],
    ["A", "A", "E", "A", "E", "G", "G"],
    ["A", "E", "E", "A", "E", "E", "G"],
    ["A", "A", "A", "A", "A", "A", "G"],
  ],
  regionColors: {
    A: bittersweet,
    B: chardonnay,
    C: celadon,
    D: altoMain,
    E: anakiwa,
    F: lightWisteria,
    G: saharaSand,
  },
  isNew: true,
};

export default level830;
