import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level720 = {
  size: 7,
  colorRegions: [
    ["A", "A", "B", "B", "B", "C", "C"],
    ["A", "D", "E", "E", "E", "D", "C"],
    ["A", "D", "E", "E", "E", "D", "D"],
    ["D", "D", "D", "E", "D", "D", "D"],
    ["D", "D", "D", "D", "D", "D", "D"],
    ["D", "D", "F", "D", "G", "G", "D"],
    ["D", "D", "F", "D", "G", "G", "D"],
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

export default level720;
