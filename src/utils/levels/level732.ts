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

const level732 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "C", "C"],
    ["A", "D", "D", "A", "A", "B", "B", "C", "C"],
    ["A", "D", "D", "E", "A", "A", "B", "B", "C"],
    ["A", "A", "E", "E", "E", "A", "A", "B", "B"],
    ["F", "A", "A", "G", "G", "G", "A", "A", "B"],
    ["F", "F", "A", "A", "G", "H", "H", "A", "A"],
    ["F", "F", "F", "A", "A", "H", "H", "I", "A"],
    ["F", "F", "F", "F", "A", "A", "I", "I", "A"],
    ["F", "F", "F", "F", "F", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: lightOrchid,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
    H: nomad,
    I: anakiwa,
  },
  isNew: true,
};

export default level732;
