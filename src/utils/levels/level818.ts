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

const level818 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "B", "B", "C", "C", "A", "A"],
    ["A", "B", "B", "C", "C", "C", "A", "A"],
    ["A", "D", "D", "A", "A", "A", "E", "E"],
    ["A", "A", "D", "A", "A", "A", "E", "E"],
    ["A", "A", "D", "A", "A", "A", "E", "F"],
    ["A", "A", "A", "A", "G", "G", "F", "F"],
    ["H", "H", "H", "G", "G", "G", "G", "F"],
  ],
  regionColors: {
    A: anakiwa,
    B: chardonnay,
    C: bittersweet,
    D: saharaSand,
    E: altoMain,
    F: celadon,
    G: lightWisteria,
    H: nomad,
  },
};

export default level818;
