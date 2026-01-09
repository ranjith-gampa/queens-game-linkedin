import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level617 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B"],
    ["A", "A", "A", "C", "D", "D", "B"],
    ["A", "C", "A", "C", "D", "C", "B"],
    ["A", "C", "C", "C", "C", "C", "B"],
    ["A", "E", "E", "E", "E", "E", "B"],
    ["A", "E", "F", "E", "G", "E", "B"],
    ["A", "E", "F", "E", "G", "E", "B"],
  ],
  regionColors: {
    A: altoMain,
    B: saharaSand,
    C: chardonnay,
    D: bittersweet,
    E: anakiwa,
    F: celadon,
    G: lightWisteria,
  },
};

export default level617;
