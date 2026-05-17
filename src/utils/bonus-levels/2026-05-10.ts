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
  path: "/bonus-level/2026-05-10",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "B", "B", "B", "A", "A", "A"],
    ["A", "A", "C", "C", "C", "C", "C", "A", "A"],
    ["A", "D", "D", "D", "D", "D", "D", "E", "A"],
    ["A", "D", "F", "F", "F", "G", "G", "E", "A"],
    ["A", "D", "F", "H", "H", "H", "G", "E", "A"],
    ["A", "D", "F", "F", "H", "I", "G", "E", "A"],
    ["F", "F", "F", "F", "H", "I", "I", "E", "E"],
    ["F", "F", "F", "H", "H", "H", "I", "I", "E"],
  ],
  regionColors: {
    A: anakiwa,
    B: nomad,
    C: saharaSand,
    D: altoMain,
    E: bittersweet,
    F: chardonnay,
    G: lightOrchid,
    H: lightWisteria,
    I: celadon,
  },
  isNew: true,
};

export default level;
