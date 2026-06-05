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

const level763 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "B"],
    ["A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "A", "A", "A", "C", "C", "B", "B"],
    ["A", "A", "A", "A", "C", "C", "C", "D"],
    ["A", "A", "E", "F", "F", "F", "F", "D"],
    ["A", "A", "E", "G", "F", "H", "D", "D"],
    ["A", "E", "E", "G", "H", "H", "D", "D"],
    ["G", "G", "G", "G", "H", "D", "D", "D"],
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

export default level763;
