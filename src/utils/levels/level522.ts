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

const level522 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C", "D", "D", "D", "D"],
    ["A", "A", "B", "B", "B", "B", "C", "C", "C", "C", "C", "C", "C", "C", "D", "D"],
    ["B", "B", "B", "B", "B", "B", "E", "E", "C", "C", "C", "C", "C", "C", "D", "D"],
    ["F", "F", "B", "B", "E", "E", "E", "E", "G", "G", "G", "G", "C", "C", "C", "C"],
    ["F", "F", "B", "B", "E", "E", "E", "E", "G", "G", "G", "G", "G", "G", "G", "G"],
    ["F", "F", "E", "E", "E", "E", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
    ["F", "F", "E", "E", "E", "E", "G", "G", "G", "G", "G", "G", "G", "G", "H", "H"],
    ["F", "F", "F", "F", "E", "E", "E", "E", "H", "H", "H", "H", "H", "H", "H", "H"],
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

export default level522;
