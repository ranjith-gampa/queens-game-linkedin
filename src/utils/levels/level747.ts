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

const level747 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "A", "A", "A", "A", "C", "D", "D"],
    ["A", "A", "A", "E", "E", "D", "D", "D"],
    ["A", "A", "A", "E", "E", "D", "F", "F"],
    ["A", "A", "G", "D", "D", "D", "F", "F"],
    ["H", "H", "D", "D", "F", "D", "F", "F"],
    ["H", "H", "D", "F", "F", "F", "F", "F"],
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

export default level747;
