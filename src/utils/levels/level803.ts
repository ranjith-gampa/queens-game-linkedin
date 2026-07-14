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

const level803 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "A", "A", "A", "C"],
    ["D", "D", "A", "B", "B", "A", "C", "C"],
    ["A", "D", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "E", "A", "A", "A", "A"],
    ["A", "A", "A", "E", "E", "A", "F", "F"],
    ["G", "G", "A", "A", "A", "A", "A", "F"],
    ["A", "G", "A", "A", "H", "H", "A", "A"],
    ["A", "A", "A", "A", "H", "A", "A", "A"],
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
  isNew: true,
};

export default level803;
