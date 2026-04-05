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

const level704 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "C", "C"],
    ["A", "D", "D", "D", "D", "D", "B", "B", "C"],
    ["A", "D", "E", "E", "F", "D", "G", "G", "G"],
    ["A", "D", "E", "F", "F", "D", "D", "D", "G"],
    ["A", "D", "F", "F", "F", "F", "F", "D", "G"],
    ["A", "D", "D", "D", "F", "F", "H", "D", "G"],
    ["A", "A", "I", "D", "F", "H", "H", "D", "G"],
    ["I", "A", "I", "D", "D", "D", "D", "D", "G"],
    ["I", "I", "I", "I", "I", "I", "I", "I", "G"],
  ],
  regionColors: {
    A: bittersweet,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: lightWisteria,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
  isNew: true,
};

export default level704;
