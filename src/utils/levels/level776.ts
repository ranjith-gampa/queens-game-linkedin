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

const level776 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B"],
    ["C", "D", "D", "A", "E", "E", "E", "B"],
    ["C", "C", "D", "A", "F", "F", "E", "B"],
    ["C", "C", "D", "A", "F", "F", "E", "B"],
    ["C", "C", "D", "A", "F", "E", "E", "B"],
    ["C", "C", "D", "A", "F", "G", "E", "H"],
    ["C", "D", "D", "D", "G", "G", "E", "H"],
    ["C", "C", "G", "G", "G", "G", "H", "H"],
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

export default level776;
