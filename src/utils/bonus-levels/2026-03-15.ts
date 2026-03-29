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
  path: "/bonus-level/2026-03-15",
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "C", "C", "C", "C", "C"],
    ["B", "B", "D", "B", "B", "C", "E", "E", "C"],
    ["B", "D", "D", "D", "B", "C", "E", "E", "C"],
    ["B", "B", "D", "B", "B", "C", "C", "E", "C"],
    ["F", "B", "B", "B", "G", "E", "E", "E", "C"],
    ["F", "F", "F", "F", "E", "E", "H", "E", "E"],
    ["F", "E", "E", "E", "E", "H", "H", "H", "E"],
    ["F", "E", "E", "F", "E", "E", "H", "E", "E"],
    ["F", "F", "F", "F", "F", "E", "E", "E", "I"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
};

export default level;
