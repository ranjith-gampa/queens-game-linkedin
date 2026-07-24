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

const level812 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "B", "C"],
    ["D", "D", "A", "B", "E", "B", "B", "C"],
    ["A", "A", "A", "B", "E", "E", "B", "B"],
    ["A", "E", "E", "E", "E", "F", "F", "F"],
    ["A", "A", "A", "E", "E", "E", "E", "F"],
    ["G", "G", "E", "E", "G", "F", "F", "F"],
    ["H", "G", "G", "E", "G", "G", "G", "F"],
    ["H", "G", "G", "G", "G", "F", "F", "F"],
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

export default level812;
