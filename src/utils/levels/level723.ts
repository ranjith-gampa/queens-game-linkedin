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

const level723 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "B", "B", "A", "A", "A", "A"],
    ["B", "C", "C", "B", "D", "E", "E", "A"],
    ["B", "C", "C", "C", "E", "E", "E", "E"],
    ["B", "F", "F", "F", "E", "E", "E", "E"],
    ["B", "F", "F", "B", "G", "E", "E", "G"],
    ["B", "B", "B", "B", "G", "G", "G", "G"],
    ["H", "H", "G", "G", "G", "G", "G", "G"],
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

export default level723;
