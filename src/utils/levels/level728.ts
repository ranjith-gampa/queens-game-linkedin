import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  nomad,
  saharaSand,
} from "../colors";

const level728 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "C", "D", "E", "E", "E"],
    ["A", "B", "C", "C", "D", "E", "E", "E"],
    ["A", "B", "C", "D", "D", "E", "E", "E"],
    ["A", "A", "A", "F", "F", "G", "H", "E"],
    ["A", "A", "A", "F", "G", "G", "H", "E"],
    ["A", "A", "A", "F", "G", "H", "H", "E"],
    ["A", "A", "A", "A", "A", "A", "A", "E"],
    ["A", "E", "E", "E", "E", "E", "E", "E"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
    H: nomad,
  },
  isNew: true,
};

export default level728;
