import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level622 = {
  size: 7,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B"],
    ["C", "A", "A", "A", "B", "B", "B"],
    ["A", "A", "D", "A", "B", "B", "B"],
    ["D", "D", "D", "E", "E", "E", "B"],
    ["D", "D", "D", "D", "D", "F", "B"],
    ["D", "G", "F", "F", "F", "F", "B"],
    ["G", "G", "B", "B", "B", "B", "B"],
  ],
  regionColors: {
    A: chardonnay,
    B: saharaSand,
    C: lightWisteria,
    D: bittersweet,
    E: anakiwa,
    F: celadon,
    G: altoMain,
  },
};

export default level622;
