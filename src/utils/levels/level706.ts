import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level706 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "B", "A", "A", "C", "D"],
    ["A", "B", "D", "E", "A", "F", "D"],
    ["G", "B", "D", "E", "A", "F", "D"],
    ["G", "B", "D", "E", "A", "F", "D"],
    ["G", "B", "D", "D", "F", "F", "D"],
    ["D", "D", "D", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: bittersweet,
    B: celadon,
    C: lightWisteria,
    D: saharaSand,
    E: chardonnay,
    F: anakiwa,
    G: altoMain,
  },
};

export default level706;
