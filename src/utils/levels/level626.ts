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

const level626 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "B", "C", "C"],
    ["A", "D", "A", "A", "B", "B", "B", "C"],
    ["D", "D", "D", "A", "E", "E", "E", "C"],
    ["A", "A", "A", "A", "A", "E", "C", "C"],
    ["A", "A", "A", "A", "F", "F", "F", "C"],
    ["G", "A", "A", "A", "A", "F", "C", "C"],
    ["G", "G", "H", "A", "A", "C", "C", "A"],
    ["G", "H", "H", "H", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: nomad,
    B: bittersweet,
    C: saharaSand,
    D: celadon,
    E: anakiwa,
    F: chardonnay,
    G: lightWisteria,
    H: altoMain,
  },
  isNew: true,
};

export default level626;
