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

const level751 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "C", "C", "C", "C", "C", "B"],
    ["A", "A", "A", "C", "D", "D", "D", "C", "B"],
    ["A", "A", "A", "E", "E", "E", "D", "C", "B"],
    ["A", "F", "F", "G", "G", "E", "D", "C", "B"],
    ["A", "F", "H", "H", "G", "E", "D", "C", "I"],
    ["A", "F", "F", "H", "H", "I", "I", "I", "I"],
    ["A", "A", "F", "F", "F", "I", "I", "I", "I"],
    ["I", "I", "I", "I", "I", "I", "I", "I", "I"],
  ],
  regionColors: {
    A: nomad,
    B: lightWisteria,
    C: chardonnay,
    D: anakiwa,
    E: celadon,
    F: saharaSand,
    G: altoMain,
    H: bittersweet,
    I: lightOrchid,
  },
  isNew: true,
};

export default level751;
