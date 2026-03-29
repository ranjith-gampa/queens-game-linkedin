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

const level696 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "B", "B", "C", "D", "A", "A", "A"],
    ["A", "B", "C", "C", "C", "D", "A", "A", "A"],
    ["A", "B", "B", "B", "C", "D", "D", "D", "A"],
    ["A", "A", "A", "B", "C", "D", "E", "D", "F"],
    ["A", "B", "B", "B", "C", "D", "D", "D", "F"],
    ["A", "G", "G", "C", "C", "C", "H", "H", "F"],
    ["A", "G", "G", "G", "C", "I", "H", "H", "F"],
    ["A", "G", "G", "G", "I", "I", "H", "H", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
};

export default level696;
