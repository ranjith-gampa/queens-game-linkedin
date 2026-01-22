import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level630 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "C", "C", "C", "B", "B"],
    ["B", "B", "C", "D", "D", "B", "B"],
    ["B", "E", "C", "C", "F", "F", "B"],
    ["B", "E", "E", "F", "F", "G", "B"],
    ["B", "E", "E", "G", "G", "G", "B"],
    ["B", "B", "B", "B", "B", "B", "B"],
  ],
  regionColors: {
    A: bittersweet,
    B: saharaSand,
    C: lightWisteria,
    D: chardonnay,
    E: altoMain,
    F: anakiwa,
    G: celadon,
  },
};

export default level630;
