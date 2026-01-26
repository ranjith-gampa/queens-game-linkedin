import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightOrchid,
  lightWisteria,
  nomad,
  saharaSand,
} from "../colors";

const level634 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "A", "A", "A", "A", "C", "A", "A"],
    ["B", "B", "B", "D", "A", "C", "C", "C", "A"],
    ["E", "B", "F", "D", "A", "A", "C", "A", "A"],
    ["E", "D", "D", "D", "D", "D", "A", "A", "A"],
    ["E", "E", "E", "D", "G", "A", "A", "A", "A"],
    ["E", "E", "H", "D", "G", "A", "I", "A", "A"],
    ["E", "H", "H", "H", "G", "I", "I", "I", "A"],
    ["E", "E", "H", "G", "G", "G", "I", "A", "A"],
  ],
  regionColors: {
    A: lightOrchid,
    B: chardonnay,
    C: altoMain,
    D: lightWisteria,
    E: anakiwa,
    F: bittersweet,
    G: nomad,
    H: saharaSand,
    I: celadon,
  },
};

export default level634;
