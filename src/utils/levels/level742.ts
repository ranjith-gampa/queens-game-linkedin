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

const level742 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "C", "C", "D", "D", "A"],
    ["A", "A", "B", "A", "C", "A", "D", "A"],
    ["A", "A", "B", "A", "A", "A", "D", "A"],
    ["A", "A", "B", "A", "A", "A", "A", "A"],
    ["E", "A", "A", "A", "A", "A", "A", "A"],
    ["E", "A", "F", "A", "A", "A", "A", "A"],
    ["E", "A", "F", "A", "G", "A", "A", "H"],
    ["E", "E", "F", "F", "G", "G", "A", "H"],
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

export default level742;
