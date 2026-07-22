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

const level811 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "C", "C", "C"],
    ["B", "B", "B", "B", "B", "C", "C", "C"],
    ["B", "D", "D", "D", "B", "B", "B", "B"],
    ["B", "D", "D", "D", "B", "B", "B", "B"],
    ["B", "B", "B", "B", "B", "B", "B", "E"],
    ["B", "B", "F", "F", "F", "B", "B", "E"],
    ["G", "B", "F", "F", "F", "B", "B", "B"],
    ["G", "B", "F", "F", "F", "B", "H", "H"],
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

export default level811;
