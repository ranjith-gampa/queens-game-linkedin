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

const level619 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "B"],
    ["A", "C", "D", "D", "D", "D", "A", "B"],
    ["C", "C", "D", "E", "E", "D", "A", "B"],
    ["C", "F", "D", "D", "D", "D", "A", "B"],
    ["G", "F", "F", "F", "H", "D", "A", "B"],
    ["G", "G", "D", "H", "H", "D", "A", "B"],
    ["G", "G", "D", "D", "D", "D", "B", "B"],
    ["B", "B", "B", "B", "B", "B", "B", "B"],
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

export default level619;
