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
  path: "/bonus-level/2026-06-14",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "C", "C"],
    ["D", "D", "A", "B", "C", "C", "E", "E", "E"],
    ["D", "D", "A", "B", "B", "E", "E", "F", "E"],
    ["A", "A", "A", "G", "B", "B", "F", "F", "E"],
    ["A", "H", "G", "G", "G", "B", "B", "F", "E"],
    ["A", "H", "G", "G", "G", "G", "B", "F", "E"],
    ["A", "A", "A", "G", "G", "G", "B", "F", "I"],
    ["G", "G", "G", "G", "G", "B", "B", "F", "I"],
    ["G", "G", "G", "G", "G", "B", "F", "F", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: saharaSand,
    C: bittersweet,
    D: chardonnay,
    E: altoMain,
    F: anakiwa,
    G: lightOrchid,
    H: nomad,
    I: celadon,
  },
  isNew: true,
};

export default level;
