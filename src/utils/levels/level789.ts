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

const level789 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "A", "C", "C", "A", "D", "D"],
    ["B", "A", "A", "C", "A", "A", "D", "E"],
    ["B", "B", "A", "C", "C", "A", "D", "D"],
    ["B", "B", "F", "C", "C", "A", "D", "D"],
    ["G", "B", "F", "F", "C", "H", "H", "D"],
    ["B", "B", "H", "C", "C", "H", "D", "D"],
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

export default level789;
