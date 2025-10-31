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

const level549 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "B", "B"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "D", "D", "B", "B", "D", "D", "D", "D"],
    ["A", "A", "A", "A", "E", "E", "D", "D", "D", "D", "D", "D", "D", "D", "F", "F"],
    ["E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "F"],
    ["E", "E", "G", "G", "E", "E", "H", "H", "H", "H", "F", "F", "F", "F", "F", "F"],
    ["E", "E", "E", "E", "E", "E", "H", "H", "H", "H", "H", "H", "F", "F", "F", "F"],
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

export default level549;
