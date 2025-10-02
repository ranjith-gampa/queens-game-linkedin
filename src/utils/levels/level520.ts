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

const level520 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "A", "A", "C", "C", "D", "D", "E", "E", "D", "D"],
    ["A", "A", "B", "B", "B", "B", "A", "A", "C", "C", "D", "D", "D", "D", "D", "D"],
    ["A", "A", "B", "B", "B", "B", "A", "A", "C", "C", "D", "D", "D", "D", "D", "D"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "C", "C", "D", "D", "D", "D", "D", "D"],
    ["F", "F", "A", "A", "A", "A", "F", "F", "C", "C", "C", "C", "D", "D", "C", "C"],
    ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "C", "C", "C", "C", "C", "C"],
    ["G", "G", "F", "F", "F", "F", "F", "F", "C", "C", "C", "C", "C", "C", "C", "C"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "H", "H", "H", "H", "H", "H"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "H", "H", "H", "H", "H", "H"],
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

export default level520;
