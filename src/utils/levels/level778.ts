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

const level778 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "D", "D"],
    ["E", "A", "F", "B", "B", "C", "C", "D", "D"],
    ["E", "F", "F", "B", "B", "C", "C", "C", "C"],
    ["E", "F", "F", "F", "B", "B", "C", "C", "C"],
    ["E", "F", "F", "F", "B", "B", "G", "G", "G"],
    ["H", "H", "H", "F", "F", "B", "G", "G", "G"],
    ["H", "H", "H", "H", "F", "G", "G", "G", "G"],
    ["I", "I", "H", "H", "G", "G", "G", "G", "G"],
    ["I", "I", "H", "H", "G", "G", "G", "G", "G"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: lightOrchid,
    E: altoMain,
    F: saharaSand,
    G: bittersweet,
    H: nomad,
    I: celadon,
  },
};

export default level778;
