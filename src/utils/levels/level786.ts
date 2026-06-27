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

const level786 = {
  size: 9,
  colorRegions: [
    ["A", "B", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "B", "A", "C", "A", "A", "A", "A"],
    ["A", "A", "B", "A", "C", "C", "A", "D", "A"],
    ["A", "A", "A", "A", "A", "C", "A", "D", "D"],
    ["E", "A", "A", "A", "A", "A", "A", "A", "D"],
    ["E", "E", "A", "F", "A", "A", "A", "A", "G"],
    ["A", "E", "A", "F", "F", "A", "H", "A", "G"],
    ["A", "A", "A", "A", "F", "I", "H", "H", "G"],
    ["A", "A", "A", "I", "I", "I", "I", "H", "G"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: lightOrchid,
    H: nomad,
    I: saharaSand,
  },
  isNew: true,
};

export default level786;
