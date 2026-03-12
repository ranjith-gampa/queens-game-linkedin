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

const level679 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "C", "C", "C", "C", "C"],
    ["A", "D", "B", "C", "C", "C", "C", "C"],
    ["E", "D", "B", "C", "C", "C", "C", "C"],
    ["E", "B", "B", "B", "C", "C", "C", "C"],
    ["E", "E", "E", "E", "F", "F", "C", "C"],
    ["G", "G", "E", "E", "E", "F", "C", "C"],
    ["G", "G", "G", "G", "G", "F", "H", "H"],
    ["G", "G", "G", "G", "F", "F", "F", "H"],
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

export default level679;
