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

const level820 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B", "B"],
    ["A", "C", "C", "C", "C", "A", "B", "D", "D"],
    ["A", "C", "C", "C", "C", "A", "B", "D", "D"],
    ["A", "A", "A", "B", "B", "B", "B", "D", "D"],
    ["E", "E", "A", "A", "A", "A", "B", "D", "D"],
    ["E", "E", "F", "A", "B", "B", "B", "B", "B"],
    ["E", "E", "F", "G", "H", "H", "H", "H", "B"],
    ["E", "E", "F", "G", "H", "H", "H", "H", "B"],
    ["I", "I", "I", "G", "G", "G", "G", "G", "G"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: lightOrchid,
    E: altoMain,
    F: nomad,
    G: saharaSand,
    H: bittersweet,
    I: celadon,
  },
  isNew: true,
};

export default level820;
