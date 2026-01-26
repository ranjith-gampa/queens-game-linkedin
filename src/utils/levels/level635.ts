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

const level635 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "B", "B", "B", "A"],
    ["C", "C", "C", "A", "A", "B", "A", "B", "A"],
    ["C", "A", "C", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "D", "D", "A"],
    ["A", "A", "E", "A", "E", "F", "F", "D", "A"],
    ["A", "A", "E", "E", "E", "F", "D", "D", "A"],
    ["A", "A", "G", "G", "G", "F", "F", "A", "A"],
    ["A", "A", "G", "H", "G", "H", "I", "A", "I"],
    ["A", "A", "A", "H", "H", "H", "I", "I", "I"],
  ],
  regionColors: {
    A: lightOrchid,
    B: saharaSand,
    C: nomad,
    D: bittersweet,
    E: anakiwa,
    F: altoMain,
    G: lightWisteria,
    H: chardonnay,
    I: celadon,
  },
  isNew: true,
};

export default level635;
