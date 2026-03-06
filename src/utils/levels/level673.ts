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

const level673 = {
  size: 8,
  colorRegions: [
    ["A", "B", "C", "C", "C", "C", "C", "C"],
    ["B", "B", "B", "C", "C", "D", "C", "C"],
    ["C", "B", "C", "C", "D", "D", "D", "C"],
    ["C", "C", "C", "C", "C", "D", "C", "C"],
    ["C", "C", "E", "C", "C", "F", "F", "F"],
    ["C", "E", "E", "E", "C", "F", "G", "F"],
    ["C", "C", "E", "C", "C", "G", "G", "G"],
    ["C", "C", "C", "C", "C", "C", "G", "H"],
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

export default level673;
