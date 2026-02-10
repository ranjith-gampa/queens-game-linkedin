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

const level649 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "D", "D"],
    ["A", "A", "A", "E", "B", "B", "C", "C", "D"],
    ["A", "E", "E", "E", "B", "A", "C", "D", "D"],
    ["A", "A", "E", "F", "F", "A", "A", "G", "D"],
    ["A", "A", "F", "F", "A", "A", "G", "G", "D"],
    ["A", "A", "A", "F", "A", "H", "H", "G", "G"],
    ["A", "I", "A", "A", "A", "A", "H", "H", "A"],
    ["A", "I", "I", "A", "A", "A", "H", "A", "A"],
    ["I", "I", "A", "A", "A", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: lightOrchid,
    B: chardonnay,
    C: anakiwa,
    D: saharaSand,
    E: lightWisteria,
    F: nomad,
    G: celadon,
    H: altoMain,
    I: bittersweet,
  },
};

export default level649;
