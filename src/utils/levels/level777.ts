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

const level777 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "A", "C", "C", "D", "D", "B", "B"],
    ["A", "C", "C", "E", "E", "D", "D", "B"],
    ["A", "C", "E", "E", "E", "E", "D", "B"],
    ["A", "F", "E", "E", "E", "E", "G", "B"],
    ["A", "F", "F", "E", "E", "G", "G", "H"],
    ["A", "A", "F", "F", "G", "G", "A", "H"],
    ["A", "A", "A", "A", "A", "A", "A", "A"],
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

export default level777;
