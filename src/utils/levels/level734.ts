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

const level734 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B"],
    ["C", "C", "A", "A", "B", "B", "D", "D"],
    ["C", "A", "A", "A", "A", "B", "D", "E"],
    ["C", "C", "A", "F", "F", "G", "D", "D"],
    ["H", "C", "A", "F", "G", "G", "G", "D"],
    ["C", "C", "A", "F", "F", "G", "D", "D"],
    ["A", "A", "A", "A", "F", "G", "G", "G"],
    ["A", "A", "A", "F", "F", "G", "G", "G"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: nomad,
    H: saharaSand,
  },
  isNew: true,
};

export default level734;
