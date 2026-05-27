import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level755 = {
  size: 7,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B"],
    ["A", "C", "C", "B", "B", "B", "B"],
    ["B", "B", "B", "B", "D", "B", "E"],
    ["B", "F", "F", "F", "D", "B", "E"],
    ["B", "F", "G", "G", "D", "E", "E"],
    ["B", "F", "F", "G", "D", "E", "E"],
    ["B", "F", "F", "D", "D", "E", "E"],
  ],
  regionColors: {
    A: lightWisteria,
    B: anakiwa,
    C: chardonnay,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
  },
  isNew: true,
};

export default level755;
