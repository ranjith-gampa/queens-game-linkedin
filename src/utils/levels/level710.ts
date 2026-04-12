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

const level710 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["B", "A", "A", "A", "A", "A", "A", "C"],
    ["B", "D", "A", "A", "A", "A", "E", "C"],
    ["B", "D", "F", "A", "A", "G", "E", "C"],
    ["B", "D", "F", "H", "A", "G", "E", "C"],
    ["B", "D", "H", "H", "A", "G", "E", "C"],
    ["B", "H", "H", "H", "A", "A", "E", "C"],
    ["H", "H", "H", "A", "A", "A", "A", "C"],
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

export default level710;
