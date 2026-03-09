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

const level676 = {
  size: 8,
  colorRegions: [
    ["A", "B", "C", "D", "E", "F", "F", "F"],
    ["A", "B", "C", "D", "E", "E", "F", "F"],
    ["A", "B", "C", "D", "D", "G", "G", "F"],
    ["A", "B", "C", "C", "G", "G", "F", "F"],
    ["A", "B", "B", "G", "G", "G", "F", "F"],
    ["A", "A", "H", "G", "G", "G", "G", "G"],
    ["H", "H", "H", "H", "H", "G", "G", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H"],
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

export default level676;
