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

const level798 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "B", "C", "C", "C", "C"],
    ["A", "A", "D", "D", "D", "D", "C", "C"],
    ["E", "F", "D", "D", "D", "G", "G", "C"],
    ["E", "F", "F", "D", "G", "G", "G", "E"],
    ["E", "F", "F", "F", "H", "G", "G", "E"],
    ["E", "F", "F", "H", "H", "H", "G", "E"],
    ["E", "E", "H", "H", "H", "H", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E", "E"],
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

export default level798;
