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

const level827 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "C", "C"],
    ["A", "D", "D", "D", "D", "D", "B", "D", "C"],
    ["A", "D", "E", "E", "E", "D", "F", "D", "C"],
    ["A", "D", "E", "D", "E", "D", "F", "D", "G"],
    ["A", "D", "E", "D", "E", "D", "F", "D", "G"],
    ["H", "D", "I", "D", "D", "D", "F", "D", "G"],
    ["H", "D", "I", "I", "I", "F", "F", "D", "G"],
    ["H", "D", "D", "D", "D", "D", "D", "D", "G"],
    ["H", "H", "H", "H", "H", "H", "G", "G", "G"],
  ],
  regionColors: {
    A: lightOrchid,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: bittersweet,
    F: altoMain,
    G: saharaSand,
    H: nomad,
    I: lightWisteria,
  },
};

export default level827;
