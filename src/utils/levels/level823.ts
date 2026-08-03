import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level823 = {
  size: 7,
  colorRegions: [
    ["A", "A", "B", "B", "B", "C", "C"],
    ["A", "A", "B", "D", "B", "B", "C"],
    ["A", "A", "D", "D", "D", "B", "B"],
    ["E", "D", "D", "F", "D", "D", "D"],
    ["E", "E", "D", "D", "D", "E", "D"],
    ["G", "E", "E", "D", "E", "E", "E"],
    ["G", "G", "E", "E", "E", "E", "E"],
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

export default level823;
