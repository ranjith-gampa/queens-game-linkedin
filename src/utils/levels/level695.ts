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

const level695 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "C", "C"],
    ["A", "A", "B", "B", "D", "D", "C", "C"],
    ["B", "B", "B", "B", "D", "D", "B", "B"],
    ["B", "E", "E", "B", "B", "B", "B", "B"],
    ["B", "E", "E", "F", "F", "F", "F", "B"],
    ["B", "B", "B", "F", "F", "F", "F", "B"],
    ["B", "G", "G", "F", "F", "F", "F", "B"],
    ["B", "G", "G", "F", "F", "F", "F", "H"],
  ],
  regionColors: {
    A: chardonnay,
    B: nomad,
    C: celadon,
    D: saharaSand,
    E: bittersweet,
    F: lightWisteria,
    G: anakiwa,
    H: altoMain,
  },
};

export default level695;
