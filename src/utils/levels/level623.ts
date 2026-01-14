import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level623 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "B", "C", "C", "C"],
    ["A", "A", "A", "B", "C", "C", "C"],
    ["A", "A", "B", "B", "B", "C", "C"],
    ["D", "B", "B", "E", "B", "B", "C"],
    ["D", "D", "B", "E", "B", "F", "F"],
    ["D", "D", "G", "G", "G", "F", "F"],
    ["D", "D", "D", "D", "G", "F", "F"],
  ],
  regionColors: {
    A: saharaSand,
    B: lightWisteria,
    C: altoMain,
    D: bittersweet,
    E: chardonnay,
    F: celadon,
    G: anakiwa,
  },
  isNew: true,
};

export default level623;
