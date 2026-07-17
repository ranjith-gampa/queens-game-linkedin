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

const level806 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "C", "D", "B", "A", "A"],
    ["A", "A", "A", "B", "C", "D", "B", "A", "A"],
    ["A", "A", "A", "B", "C", "D", "B", "A", "A"],
    ["E", "A", "A", "B", "B", "B", "B", "A", "A"],
    ["E", "E", "A", "A", "A", "A", "A", "A", "F"],
    ["E", "G", "G", "A", "A", "A", "A", "A", "F"],
    ["E", "G", "H", "H", "A", "A", "A", "A", "F"],
    ["E", "G", "G", "G", "G", "A", "A", "A", "F"],
    ["I", "I", "I", "I", "I", "I", "A", "A", "F"],
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
  isNew: true,
};

export default level806;
