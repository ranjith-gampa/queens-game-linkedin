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

const level666 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "B", "B", "B", "C", "C", "B"],
    ["B", "B", "B", "D", "D", "C", "C", "B"],
    ["B", "E", "E", "D", "D", "B", "B", "B"],
    ["B", "E", "E", "B", "B", "B", "B", "B"],
    ["B", "B", "F", "F", "B", "B", "B", "B"],
    ["B", "B", "F", "F", "B", "B", "G", "G"],
    ["H", "B", "B", "B", "B", "B", "G", "G"],
  ],
  regionColors: {
    A: celadon,
    B: nomad,
    C: anakiwa,
    D: chardonnay,
    E: lightWisteria,
    F: saharaSand,
    G: bittersweet,
    H: altoMain,
  },
};

export default level666;
