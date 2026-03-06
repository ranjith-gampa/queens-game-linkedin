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

const level674 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "C", "C", "C", "C", "C", "A"],
    ["A", "B", "C", "C", "C", "C", "D", "A"],
    ["E", "E", "E", "C", "C", "C", "D", "A"],
    ["F", "E", "C", "C", "C", "D", "D", "D"],
    ["F", "E", "C", "C", "C", "G", "H", "G"],
    ["F", "F", "F", "F", "G", "G", "H", "G"],
    ["F", "F", "F", "F", "G", "G", "G", "G"],
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

export default level674;
