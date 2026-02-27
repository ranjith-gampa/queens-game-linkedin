import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level667 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "A", "A", "A", "C", "C"],
    ["B", "D", "D", "E", "F", "F", "C"],
    ["B", "D", "E", "E", "E", "F", "C"],
    ["B", "D", "D", "E", "F", "F", "C"],
    ["B", "B", "E", "E", "E", "C", "C"],
    ["G", "E", "E", "E", "E", "E", "E"],
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

export default level667;
