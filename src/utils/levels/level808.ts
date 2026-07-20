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

const level808 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "C", "D"],
    ["E", "A", "B", "B", "C", "C", "D", "D", "D"],
    ["E", "A", "E", "B", "B", "C", "C", "D", "D"],
    ["E", "E", "E", "D", "D", "D", "D", "D", "D"],
    ["F", "E", "F", "D", "D", "G", "G", "H", "H"],
    ["F", "F", "F", "D", "I", "I", "G", "G", "H"],
    ["H", "F", "I", "I", "I", "G", "G", "H", "H"],
    ["H", "F", "H", "H", "I", "I", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H"],
  ],
  regionColors: {
    A: saharaSand,
    B: altoMain,
    C: bittersweet,
    D: nomad,
    E: lightOrchid,
    F: anakiwa,
    G: lightWisteria,
    H: celadon,
    I: chardonnay,
  },
};

export default level808;
