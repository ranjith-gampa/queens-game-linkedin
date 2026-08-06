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

const level826 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "C"],
    ["A", "A", "B", "B", "B", "C", "C", "C"],
    ["D", "D", "B", "B", "E", "E", "C", "C"],
    ["D", "D", "D", "F", "E", "E", "E", "C"],
    ["C", "D", "D", "G", "G", "E", "E", "C"],
    ["C", "C", "G", "G", "G", "H", "H", "C"],
    ["C", "C", "G", "G", "C", "C", "C", "C"],
    ["C", "C", "C", "C", "C", "C", "C", "C"],
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

export default level826;
