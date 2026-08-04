import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level824 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "B", "B", "C", "A", "C"],
    ["D", "B", "E", "B", "C", "A", "C"],
    ["D", "B", "B", "B", "C", "C", "C"],
    ["D", "D", "D", "B", "F", "F", "F"],
    ["D", "D", "D", "B", "B", "G", "G"],
    ["D", "D", "D", "D", "D", "D", "G"],
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

export default level824;
