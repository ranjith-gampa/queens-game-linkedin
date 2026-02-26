import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level665 = {
  size: 7,
  colorRegions: [
    ["A", "B", "C", "C", "A", "D", "D"],
    ["A", "B", "B", "B", "A", "D", "D"],
    ["A", "A", "A", "A", "A", "D", "D"],
    ["D", "D", "D", "D", "D", "D", "D"],
    ["D", "E", "F", "F", "F", "F", "F"],
    ["D", "E", "F", "G", "F", "G", "F"],
    ["E", "E", "F", "G", "G", "G", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: celadon,
    C: chardonnay,
    D: anakiwa,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
  },
};

export default level665;
