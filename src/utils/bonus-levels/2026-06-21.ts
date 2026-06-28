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
  path: "/bonus-level/2026-06-21",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "B", "C", "C", "C"],
    ["D", "D", "D", "D", "A", "B", "B", "C", "C"],
    ["E", "E", "E", "D", "A", "B", "B", "C", "C"],
    ["C", "C", "E", "D", "A", "B", "C", "C", "C"],
    ["C", "C", "C", "C", "C", "C", "C", "C", "C"],
    ["C", "F", "F", "F", "F", "F", "F", "F", "F"],
    ["C", "F", "G", "G", "G", "G", "G", "G", "F"],
    ["C", "F", "G", "H", "H", "H", "H", "G", "F"],
    ["C", "F", "G", "H", "I", "I", "H", "G", "F"],
  ],
  regionColors: {
    A: chardonnay,
    B: lightOrchid,
    C: nomad,
    D: celadon,
    E: lightWisteria,
    F: bittersweet,
    G: saharaSand,
    H: anakiwa,
    I: altoMain,
  },
  isNew: true,
};

export default level;
