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

const level459 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "A", "A", "A", "C", "C", "C", "C", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "A", "C", "C", "C", "C", "C", "C", "C", "C", "B", "B", "B", "B"],
    ["D", "D", "C", "C", "C", "C", "E", "E", "E", "E", "C", "C", "C", "C", "B", "B"],
    ["D", "D", "C", "C", "C", "C", "F", "F", "F", "F", "C", "C", "C", "C", "B", "B"],
    ["D", "D", "D", "D", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "B", "B"],
    ["D", "D", "F", "F", "F", "F", "G", "G", "H", "H", "F", "F", "B", "B", "B", "B"],
    ["D", "D", "D", "D", "G", "G", "G", "G", "H", "H", "H", "H", "B", "B", "B", "B"],
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

export default level459;
