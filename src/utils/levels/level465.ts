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

const level465 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "C", "C", "A", "A", "B", "B", "A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "D", "D", "D", "D", "B", "B"],
    ["E", "E", "E", "E", "A", "A", "A", "A", "D", "D", "D", "D", "F", "F", "B", "B"],
    ["E", "E", "A", "A", "A", "A", "G", "G", "G", "G", "H", "H", "F", "F", "B", "B"],
    ["E", "E", "A", "A", "G", "G", "G", "G", "H", "H", "H", "H", "F", "F", "B", "B"],
    ["E", "E", "A", "A", "G", "G", "E", "E", "E", "E", "F", "F", "F", "F", "B", "B"],
    ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
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
};

export default level465;
