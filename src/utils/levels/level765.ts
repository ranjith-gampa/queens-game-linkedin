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

const level765 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    ["D", "D", "E", "B", "E", "B", "C", "F", "F"],
    ["D", "E", "E", "E", "E", "C", "C", "C", "F"],
    ["D", "D", "E", "E", "C", "C", "C", "F", "F"],
    ["E", "E", "E", "E", "E", "C", "G", "G", "G"],
    ["E", "E", "H", "H", "E", "I", "I", "G", "G"],
    ["E", "E", "H", "E", "E", "E", "I", "G", "G"],
    ["G", "G", "H", "H", "G", "I", "I", "G", "G"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: lightOrchid,
    E: altoMain,
    F: saharaSand,
    G: bittersweet,
    H: nomad,
    I: celadon,
  },
};

export default level765;
