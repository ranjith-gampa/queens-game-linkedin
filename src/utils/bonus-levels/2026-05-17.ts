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
  path: "/bonus-level/2026-05-17",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "B", "B", "B", "B"],
    ["A", "A", "C", "C", "A", "B", "B", "B", "B"],
    ["A", "C", "C", "D", "D", "E", "E", "B", "B"],
    ["A", "C", "D", "D", "E", "E", "F", "F", "B"],
    ["A", "D", "D", "G", "E", "F", "F", "H", "B"],
    ["A", "A", "G", "G", "F", "F", "H", "H", "B"],
    ["A", "A", "G", "I", "F", "H", "H", "B", "B"],
    ["A", "A", "I", "I", "H", "H", "B", "B", "B"],
    ["I", "I", "I", "B", "B", "B", "B", "B", "B"],
  ],
  regionColors: {
    A: nomad,
    B: altoMain,
    C: lightOrchid,
    D: celadon,
    E: bittersweet,
    F: lightWisteria,
    G: anakiwa,
    H: chardonnay,
    I: saharaSand,
  },
  isNew: true,
};

export default level;
