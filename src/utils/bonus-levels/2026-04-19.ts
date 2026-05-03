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
  path: "/bonus-level/2026-04-19",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B", "B"],
    ["A", "A", "C", "C", "C", "B", "C", "C", "B"],
    ["A", "C", "C", "D", "C", "C", "C", "B", "B"],
    ["A", "A", "D", "D", "D", "D", "B", "B", "B"],
    ["A", "A", "E", "E", "E", "D", "E", "E", "B"],
    ["A", "E", "E", "F", "E", "E", "E", "F", "G"],
    ["A", "A", "F", "F", "F", "F", "F", "F", "G"],
    ["A", "A", "H", "H", "H", "F", "H", "H", "G"],
    ["A", "H", "H", "I", "H", "H", "H", "G", "G"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: lightOrchid,
    H: nomad,
    I: saharaSand,
  },
};

export default level;
