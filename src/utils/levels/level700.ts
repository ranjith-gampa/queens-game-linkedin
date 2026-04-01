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

const level700 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["B", "A", "B", "A", "C", "C", "A", "A"],
    ["B", "B", "B", "D", "D", "C", "A", "A"],
    ["E", "E", "B", "E", "C", "C", "C", "A"],
    ["E", "E", "E", "E", "E", "F", "F", "A"],
    ["E", "G", "G", "E", "E", "H", "F", "H"],
    ["E", "E", "G", "E", "E", "H", "H", "H"],
    ["E", "G", "G", "G", "E", "E", "E", "H"],
  ],
  regionColors: {
    A: saharaSand,
    B: lightWisteria,
    C: altoMain,
    D: bittersweet,
    E: nomad,
    F: chardonnay,
    G: anakiwa,
    H: celadon,
  },
  isNew: true,
};

export default level700;
