import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level629 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "B", "B"],
    ["A", "C", "A", "D", "A", "B", "B"],
    ["A", "D", "D", "D", "A", "B", "B"],
    ["D", "D", "B", "B", "B", "B", "B"],
    ["D", "D", "E", "E", "E", "E", "E"],
    ["F", "F", "E", "G", "G", "G", "E"],
    ["F", "F", "E", "E", "E", "E", "E"],
  ],
  regionColors: {
    A: lightWisteria,
    B: saharaSand,
    C: altoMain,
    D: bittersweet,
    E: chardonnay,
    F: celadon,
    G: anakiwa,
  },
  isNew: true,
};

export default level629;
