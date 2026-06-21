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

const level779 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "C", "C", "C", "C", "D", "D", "B"],
    ["A", "C", "E", "E", "E", "E", "D", "B"],
    ["A", "C", "E", "F", "G", "E", "D", "B"],
    ["A", "C", "E", "F", "G", "E", "D", "B"],
    ["A", "C", "H", "F", "G", "G", "D", "B"],
    ["A", "C", "H", "F", "F", "G", "G", "B"],
    ["B", "B", "B", "B", "B", "B", "B", "B"],
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

export default level779;
