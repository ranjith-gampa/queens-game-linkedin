import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level713 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B"],
    ["C", "A", "C", "D", "B", "D", "B"],
    ["C", "C", "C", "D", "D", "D", "B"],
    ["B", "B", "B", "B", "B", "B", "B"],
    ["E", "B", "E", "F", "B", "F", "B"],
    ["E", "E", "E", "F", "F", "F", "B"],
    ["G", "B", "B", "B", "B", "B", "B"],
  ],
  regionColors: {
    A: bittersweet,
    B: saharaSand,
    C: anakiwa,
    D: celadon,
    E: chardonnay,
    F: altoMain,
    G: lightWisteria,
  },
};

export default level713;
