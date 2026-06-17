import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level775 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "B", "A", "A", "A", "C"],
    ["D", "D", "D", "A", "A", "A", "C"],
    ["D", "D", "D", "A", "E", "E", "E"],
    ["D", "F", "D", "A", "E", "E", "E"],
    ["D", "D", "D", "G", "E", "E", "E"],
    ["D", "D", "D", "G", "E", "E", "E"],
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
};

export default level775;
