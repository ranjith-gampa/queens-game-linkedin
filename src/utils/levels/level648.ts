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

const level648 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "B", "B", "B", "C", "A", "A", "A"],
    ["B", "B", "B", "C", "C", "C", "C", "C", "C"],
    ["B", "C", "C", "C", "D", "D", "D", "D", "C"],
    ["C", "C", "D", "D", "D", "E", "D", "D", "D"],
    ["C", "F", "F", "E", "E", "E", "G", "G", "D"],
    ["F", "F", "E", "E", "H", "H", "H", "G", "G"],
    ["F", "E", "E", "H", "H", "I", "H", "H", "H"],
    ["E", "E", "H", "H", "I", "I", "I", "I", "I"],
  ],
  regionColors: {
    A: lightOrchid,
    B: nomad,
    C: saharaSand,
    D: bittersweet,
    E: celadon,
    F: altoMain,
    G: anakiwa,
    H: lightWisteria,
    I: chardonnay,
  },
  isNew: true,
};

export default level648;
