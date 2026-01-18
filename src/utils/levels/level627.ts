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

const level627 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "A", "A", "A", "A"],
    ["A", "A", "B", "B", "A", "A", "C", "C", "A"],
    ["A", "A", "A", "A", "A", "C", "C", "A", "A"],
    ["A", "A", "A", "A", "D", "D", "E", "A", "A"],
    ["A", "A", "A", "D", "D", "E", "E", "F", "A"],
    ["A", "A", "G", "G", "H", "E", "F", "F", "A"],
    ["A", "G", "G", "H", "H", "A", "F", "A", "A"],
    ["A", "I", "I", "H", "A", "A", "A", "A", "A"],
    ["I", "I", "A", "A", "A", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: lightOrchid,
    B: saharaSand,
    C: bittersweet,
    D: anakiwa,
    E: altoMain,
    F: nomad,
    G: celadon,
    H: chardonnay,
    I: lightWisteria,
  },
  isNew: true,
};

export default level627;
