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

const level833 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "B", "B", "B"],
    ["A", "C", "C", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "B", "D", "D", "B", "B", "B"],
    ["E", "E", "B", "B", "D", "D", "B", "B", "B"],
    ["E", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["E", "B", "B", "B", "F", "B", "B", "G", "B"],
    ["E", "B", "B", "F", "F", "B", "B", "G", "G"],
    ["E", "B", "B", "F", "H", "B", "I", "I", "I"],
    ["E", "B", "B", "H", "H", "B", "I", "I", "I"],
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

export default level833;
