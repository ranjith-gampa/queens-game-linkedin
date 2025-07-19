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

const level445 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "C", "C", "D", "D", "D", "D"],
    ["A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "C", "C", "D", "D", "D", "D"],
    ["A", "A", "A", "A", "A", "A", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C"],
    ["A", "A", "E", "E", "A", "A", "C", "C", "F", "F", "C", "C", "C", "C", "G", "G", "C", "C"],
    ["E", "E", "E", "E", "A", "A", "F", "F", "F", "F", "F", "F", "C", "C", "G", "G", "G", "G"],
    ["A", "A", "E", "E", "A", "A", "A", "A", "F", "F", "C", "C", "C", "C", "G", "G", "A", "A"],
    ["A", "A", "H", "H", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "H", "H", "A", "A", "I", "I", "I", "I", "I", "I", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "I", "I", "A", "A", "A", "A", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: saharaSand,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: lightOrchid,
    H: nomad,
    I: lightWisteria,
  },
  isNew: true,
};

export default level445;
