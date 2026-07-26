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
  path: "/bonus-level/2026-07-19",
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "C", "C", "C", "D", "D", "D", "D", "B"],
    ["A", "A", "A", "C", "D", "D", "D", "D", "E"],
    ["A", "C", "C", "C", "D", "F", "F", "F", "E"],
    ["A", "C", "D", "D", "D", "F", "E", "E", "E"],
    ["A", "C", "C", "C", "D", "F", "F", "F", "G"],
    ["A", "D", "D", "D", "D", "F", "H", "F", "G"],
    ["A", "D", "D", "D", "D", "F", "F", "F", "G"],
    ["A", "A", "I", "I", "I", "I", "I", "G", "G"],
  ],
  regionColors: {
    A: celadon,
    B: altoMain,
    C: lightWisteria,
    D: lightOrchid,
    E: bittersweet,
    F: chardonnay,
    G: saharaSand,
    H: anakiwa,
    I: nomad,
  },
  isNew: true,
};

export default level;
