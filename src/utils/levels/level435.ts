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

const level435 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D", "D", "D"],
    ["A", "A", "B", "B", "B", "B", "C", "C", "D", "D", "D", "D", "D", "D", "D", "D"],
    ["A", "A", "B", "B", "E", "E", "E", "E", "E", "E", "E", "E", "D", "D", "D", "D"],
    ["A", "A", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "D", "D"],
    ["A", "A", "A", "A", "E", "E", "F", "F", "F", "F", "E", "E", "D", "D", "D", "D"],
    ["A", "A", "A", "A", "A", "A", "G", "G", "G", "G", "D", "D", "D", "D", "D", "D"],
    ["A", "A", "A", "A", "A", "A", "G", "G", "G", "G", "D", "D", "D", "D", "D", "D"],
    ["A", "A", "A", "A", "H", "H", "H", "H", "H", "H", "H", "H", "D", "D", "D", "D"],
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

export default level435;
