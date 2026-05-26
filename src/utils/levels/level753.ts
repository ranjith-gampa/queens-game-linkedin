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

const level753 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "C", "A", "A", "D", "B", "B", "B"],
    ["C", "C", "C", "D", "D", "D", "B", "B"],
    ["C", "C", "C", "D", "D", "D", "E", "B"],
    ["C", "C", "C", "D", "F", "D", "E", "B"],
    ["C", "C", "G", "D", "F", "D", "E", "B"],
    ["H", "C", "G", "D", "F", "D", "E", "B"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: celadon,
    D: anakiwa,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
    H: nomad,
  },
};

export default level753;
