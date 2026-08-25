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

const level844 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "C", "C"],
    ["A", "D", "D", "D", "D", "D", "D", "D", "C"],
    ["E", "E", "E", "E", "E", "E", "E", "D", "C"],
    ["E", "E", "F", "E", "E", "E", "F", "C", "C"],
    ["E", "F", "F", "F", "E", "F", "F", "F", "C"],
    ["E", "F", "F", "F", "F", "F", "F", "F", "G"],
    ["E", "E", "F", "F", "H", "F", "F", "G", "G"],
    ["E", "E", "E", "F", "F", "F", "G", "G", "G"],
    ["E", "E", "I", "I", "F", "G", "G", "G", "G"],
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

export default level844;
