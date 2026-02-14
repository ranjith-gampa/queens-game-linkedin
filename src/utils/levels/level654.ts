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

const level654 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "B", "C", "C", "D", "D"],
    ["A", "A", "A", "A", "A", "C", "D", "D"],
    ["E", "E", "A", "A", "A", "A", "D", "D"],
    ["F", "E", "A", "A", "A", "A", "D", "D"],
    ["F", "E", "E", "A", "A", "A", "A", "A"],
    ["F", "G", "G", "G", "H", "A", "A", "A"],
    ["F", "F", "F", "G", "H", "A", "A", "A"],
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

export default level654;
