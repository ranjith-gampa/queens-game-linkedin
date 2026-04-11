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

const level709 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "B", "C", "D", "D", "D"],
    ["A", "A", "B", "B", "C", "C", "D", "D"],
    ["E", "A", "F", "B", "B", "C", "G", "D"],
    ["E", "E", "F", "F", "B", "B", "G", "G"],
    ["E", "F", "F", "B", "B", "G", "G", "H"],
    ["F", "F", "B", "B", "G", "G", "B", "H"],
    ["F", "B", "B", "B", "G", "B", "B", "B"],
    ["B", "B", "B", "B", "B", "B", "B", "B"],
  ],
  regionColors: {
    A: chardonnay,
    B: nomad,
    C: altoMain,
    D: bittersweet,
    E: lightWisteria,
    F: anakiwa,
    G: celadon,
    H: saharaSand,
  },
};

export default level709;
