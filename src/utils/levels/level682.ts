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

const level682 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "C", "C"],
    ["A", "D", "D", "B", "E", "F", "C", "G"],
    ["A", "D", "D", "B", "E", "F", "C", "G"],
    ["A", "D", "D", "B", "E", "F", "C", "G"],
    ["A", "D", "D", "B", "H", "H", "C", "G"],
    ["D", "D", "H", "H", "H", "H", "H", "G"],
    ["D", "D", "D", "H", "H", "H", "H", "G"],
    ["D", "G", "G", "G", "G", "G", "G", "G"],
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

export default level682;
