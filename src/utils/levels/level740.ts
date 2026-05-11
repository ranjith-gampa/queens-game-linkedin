import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level740 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "B"],
    ["A", "C", "A", "B", "B", "B", "B"],
    ["A", "A", "A", "A", "D", "B", "B"],
    ["E", "E", "E", "D", "D", "D", "F"],
    ["E", "E", "D", "D", "D", "D", "D"],
    ["E", "E", "E", "E", "D", "G", "G"],
    ["E", "E", "E", "D", "D", "D", "G"],
  ],
  regionColors: {
    A: saharaSand,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: lightWisteria,
  },
  isNew: true,
};

export default level740;
