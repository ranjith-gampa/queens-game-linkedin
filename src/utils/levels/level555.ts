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

const level555 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "C", "C"],
    ["A", "A", "A", "A", "D", "D", "D", "D", "D", "D", "C", "C", "C", "C", "C", "C"],
    ["A", "A", "A", "A", "A", "A", "D", "D", "D", "D", "C", "C", "C", "C", "C", "C"],
    ["E", "E", "A", "A", "A", "A", "F", "F", "F", "F", "C", "C", "C", "C", "C", "C"],
    ["E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "F", "C", "C", "C", "C"],
    ["E", "E", "G", "G", "G", "G", "G", "G", "C", "C", "C", "C", "C", "C", "C", "C"],
    ["H", "H", "H", "H", "G", "G", "G", "G", "C", "C", "C", "C", "C", "C", "C", "C"],
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

export default level555;
