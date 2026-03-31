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

const level699 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B"],
    ["B", "C", "B", "D", "E", "E", "E", "B"],
    ["B", "C", "B", "D", "B", "B", "F", "B"],
    ["B", "C", "B", "G", "G", "B", "F", "B"],
    ["B", "C", "B", "G", "G", "B", "F", "B"],
    ["B", "C", "B", "B", "B", "B", "F", "B"],
    ["B", "C", "H", "H", "H", "H", "F", "B"],
    ["B", "B", "B", "B", "B", "B", "B", "B"],
  ],
  regionColors: {
    A: saharaSand,
    B: altoMain,
    C: bittersweet,
    D: chardonnay,
    E: anakiwa,
    F: celadon,
    G: lightWisteria,
    H: nomad,
  },
  isNew: true,
};

export default level699;
