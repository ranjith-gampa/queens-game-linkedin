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

const level724 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "A", "A", "A", "A", "A"],
    ["A", "A", "B", "A", "A", "A", "C", "A", "D"],
    ["A", "E", "E", "E", "A", "C", "C", "D", "D"],
    ["A", "A", "E", "A", "A", "A", "C", "A", "D"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "F", "A", "G", "A", "A", "H", "A", "A"],
    ["A", "F", "F", "G", "G", "H", "H", "H", "A"],
    ["A", "F", "A", "G", "A", "A", "I", "A", "A"],
    ["A", "A", "A", "A", "A", "I", "I", "I", "A"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: celadon,
    D: altoMain,
    E: anakiwa,
    F: bittersweet,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
  isNew: true,
};

export default level724;
