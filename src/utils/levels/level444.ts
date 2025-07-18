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

const level444 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "C", "C", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D", "B", "B"],
    ["A", "A", "C", "C", "E", "E", "E", "E", "F", "F", "F", "F", "D", "D", "B", "B"],
    ["B", "B", "G", "G", "E", "E", "H", "H", "H", "H", "F", "F", "G", "G", "B", "B"],
    ["B", "B", "G", "G", "E", "E", "H", "H", "H", "H", "F", "F", "G", "G", "B", "B"],
    ["B", "B", "G", "G", "E", "E", "E", "E", "E", "E", "E", "E", "G", "G", "B", "B"],
    ["B", "B", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "B", "B"],
    ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
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

export default level444;
