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
  path: "/bonus-level/2026-08-09",
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "B", "B", "C", "B", "B", "D", "D"],
    ["A", "B", "B", "E", "C", "C", "B", "B", "D"],
    ["B", "B", "E", "E", "F", "C", "G", "D", "D"],
    ["B", "E", "E", "F", "F", "F", "G", "G", "D"],
    ["B", "B", "E", "H", "F", "I", "G", "D", "D"],
    ["B", "B", "E", "H", "H", "I", "I", "D", "D"],
    ["B", "B", "H", "H", "I", "I", "I", "D", "D"],
    ["B", "B", "B", "I", "I", "I", "D", "D", "D"],
  ],
  regionColors: {
    A: anakiwa,
    B: lightOrchid,
    C: chardonnay,
    D: nomad,
    E: lightWisteria,
    F: altoMain,
    G: celadon,
    H: saharaSand,
    I: bittersweet,
  },
  isNew: true,
};

export default level;
