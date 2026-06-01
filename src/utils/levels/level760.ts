import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level760 = {
  size: 7,
  colorRegions: [
    ["A", "B", "A", "C", "C", "C", "C"],
    ["A", "A", "A", "D", "D", "D", "C"],
    ["A", "E", "A", "D", "D", "D", "C"],
    ["E", "E", "E", "E", "D", "C", "C"],
    ["E", "E", "E", "E", "F", "F", "F"],
    ["E", "E", "E", "E", "E", "F", "G"],
    ["E", "E", "E", "E", "F", "F", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: saharaSand,
    D: bittersweet,
    E: anakiwa,
    F: altoMain,
    G: celadon,
  },
  isNew: true,
};

export default level760;
