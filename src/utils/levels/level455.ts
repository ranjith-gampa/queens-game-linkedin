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

const level455 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "B", "B", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "A", "A"],
    ["D", "D", "B", "B", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "A", "A"],
    ["D", "D", "B", "B", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "A", "A"],
    ["D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "C", "C", "C", "C"],
    ["F", "F", "D", "D", "E", "E", "G", "G", "E", "E", "E", "E", "E", "E", "E", "E"],
    ["F", "F", "D", "D", "D", "D", "G", "G", "F", "F", "F", "F", "H", "H", "F", "F"],
    ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
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

export default level455;
