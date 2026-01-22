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

const level631 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "C", "C", "D", "D"],
    ["E", "E", "A", "B", "C", "C", "D", "D"],
    ["A", "A", "A", "B", "C", "C", "C", "D"],
    ["A", "B", "B", "B", "C", "C", "F", "G"],
    ["A", "A", "A", "C", "C", "F", "F", "G"],
    ["H", "C", "C", "C", "C", "C", "F", "G"],
    ["H", "C", "C", "C", "C", "C", "F", "G"],
    ["H", "C", "C", "C", "C", "F", "F", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: altoMain,
    C: saharaSand,
    D: bittersweet,
    E: chardonnay,
    F: anakiwa,
    G: celadon,
    H: nomad,
  },
  isNew: true,
};

export default level631;
