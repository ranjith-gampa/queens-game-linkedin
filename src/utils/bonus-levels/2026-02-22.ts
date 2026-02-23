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

const level = {
  path: "/bonus-level/2026-02-22",
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "C", "C"],
    ["A", "B", "B", "D", "D", "D", "D", "D", "C"],
    ["E", "B", "B", "F", "F", "D", "D", "D", "C"],
    ["E", "B", "F", "F", "D", "D", "D", "D", "G"],
    ["E", "E", "E", "D", "D", "D", "H", "D", "G"],
    ["I", "I", "D", "D", "D", "H", "H", "D", "G"],
    ["I", "D", "D", "D", "H", "H", "H", "G", "G"],
    ["I", "D", "D", "H", "H", "H", "H", "H", "G"],
    ["I", "I", "I", "I", "H", "G", "G", "G", "G"],
  ],
  regionColors: {
    A: lightWisteria,
    B: lightOrchid,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: nomad,
    G: saharaSand,
    H: bittersweet,
    I: chardonnay,
  },
  isNew: true,
};

export default level;
