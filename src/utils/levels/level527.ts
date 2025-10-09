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

const level527 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "B", "B", "C", "C", "C", "C", "C", "C", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "B", "B", "D", "D", "D", "D", "C", "C", "A", "A", "A", "A"],
    ["E", "E", "A", "A", "F", "F", "D", "D", "D", "D", "C", "C", "G", "G", "G", "G"],
    ["E", "E", "E", "E", "F", "F", "D", "D", "D", "D", "C", "C", "G", "G", "G", "G"],
    ["E", "E", "E", "E", "F", "F", "F", "F", "F", "F", "C", "C", "G", "G", "G", "G"],
    ["E", "E", "E", "E", "E", "E", "H", "H", "H", "H", "H", "H", "H", "H", "G", "G"],
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

export default level527;
