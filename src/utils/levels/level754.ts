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

const level754 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "C", "C"],
    ["A", "D", "D", "E", "E", "E", "E", "C"],
    ["F", "D", "D", "D", "G", "E", "E", "C"],
    ["F", "D", "G", "G", "G", "E", "H", "F"],
    ["F", "D", "H", "G", "G", "G", "H", "F"],
    ["F", "H", "H", "G", "H", "H", "H", "F"],
    ["F", "H", "H", "H", "H", "H", "H", "F"],
    ["F", "F", "F", "F", "F", "F", "F", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: celadon,
    C: bittersweet,
    D: anakiwa,
    E: chardonnay,
    F: nomad,
    G: altoMain,
    H: saharaSand,
  },
};

export default level754;
