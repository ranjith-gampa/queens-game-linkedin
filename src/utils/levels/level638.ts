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

const level638 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B"],
    ["A", "B", "B", "C", "C", "C", "B", "B"],
    ["B", "B", "B", "C", "D", "D", "B", "B"],
    ["B", "B", "B", "C", "E", "D", "B", "B"],
    ["B", "F", "F", "F", "E", "G", "B", "B"],
    ["B", "F", "E", "E", "E", "G", "G", "B"],
    ["B", "F", "B", "B", "B", "B", "B", "H"],
    ["B", "B", "B", "B", "B", "B", "H", "H"],
  ],
  regionColors: {
    A: saharaSand,
    B: nomad,
    C: altoMain,
    D: anakiwa,
    E: chardonnay,
    F: lightWisteria,
    G: celadon,
    H: bittersweet,
  },
};

export default level638;
