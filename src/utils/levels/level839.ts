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

const level839 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "B", "B", "B", "B", "C"],
    ["A", "B", "A", "A", "A", "B", "C", "C"],
    ["A", "A", "A", "D", "A", "A", "A", "C"],
    ["A", "D", "D", "D", "D", "D", "A", "C"],
    ["A", "A", "D", "E", "D", "F", "F", "F"],
    ["A", "D", "D", "G", "D", "D", "H", "F"],
    ["A", "D", "G", "G", "G", "D", "H", "F"],
    ["G", "G", "G", "H", "H", "H", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: saharaSand,
    E: altoMain,
    F: bittersweet,
    G: celadon,
    H: nomad,
  },
  isNew: true,
};

export default level839;
