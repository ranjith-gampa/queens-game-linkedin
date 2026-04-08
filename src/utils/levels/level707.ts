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

const level707 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "C", "C", "C"],
    ["A", "B", "B", "D", "B", "B", "C", "C"],
    ["A", "B", "B", "D", "D", "B", "B", "C"],
    ["A", "B", "B", "B", "B", "B", "B", "C"],
    ["E", "B", "B", "B", "B", "B", "B", "C"],
    ["E", "B", "B", "F", "F", "B", "B", "C"],
    ["E", "E", "B", "B", "F", "B", "B", "G"],
    ["E", "H", "H", "B", "B", "B", "G", "G"],
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

export default level707;
