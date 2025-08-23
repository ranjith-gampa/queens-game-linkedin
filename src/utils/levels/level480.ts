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

const level480 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "A", "A", "A", "A", "A", "A"],
    ["C", "C", "A", "A", "B", "B", "D", "D", "D", "D", "D", "D", "A", "A", "A", "A"],
    ["C", "C", "A", "A", "B", "B", "B", "B", "B", "B", "D", "D", "E", "E", "A", "A"],
    ["C", "C", "C", "C", "B", "B", "D", "D", "D", "D", "D", "D", "E", "E", "E", "E"],
    ["F", "F", "F", "F", "B", "B", "B", "B", "B", "B", "D", "D", "G", "G", "E", "E"],
    ["F", "F", "H", "H", "H", "H", "D", "D", "D", "D", "D", "D", "G", "G", "G", "G"],
    ["F", "F", "H", "H", "H", "H", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
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

export default level480;
