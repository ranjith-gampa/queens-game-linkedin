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

const level681 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    ["A", "B", "B", "B", "B", "B", "B", "B", "C"],
    ["A", "B", "B", "D", "E", "E", "B", "B", "C"],
    ["A", "B", "B", "D", "F", "F", "B", "B", "C"],
    ["A", "A", "B", "B", "F", "B", "B", "G", "G"],
    ["H", "A", "A", "B", "F", "B", "G", "G", "G"],
    ["H", "I", "A", "B", "F", "B", "G", "G", "G"],
    ["H", "I", "B", "B", "F", "B", "B", "G", "G"],
  ],
  regionColors: {
    A: lightOrchid,
    B: chardonnay,
    C: bittersweet,
    D: celadon,
    E: altoMain,
    F: anakiwa,
    G: saharaSand,
    H: nomad,
    I: lightWisteria,
  },
  isNew: true,
};

export default level681;
