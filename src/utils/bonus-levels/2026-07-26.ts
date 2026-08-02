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
  path: "/bonus-level/2026-07-26",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "C", "C", "C", "D"],
    ["D", "D", "D", "A", "B", "B", "C", "E", "D"],
    ["D", "D", "F", "F", "B", "B", "C", "E", "D"],
    ["D", "D", "D", "F", "B", "B", "E", "E", "D"],
    ["D", "G", "G", "F", "F", "B", "B", "E", "D"],
    ["D", "G", "B", "B", "B", "B", "B", "H", "D"],
    ["D", "G", "B", "I", "I", "I", "B", "H", "D"],
    ["D", "G", "I", "I", "D", "H", "H", "H", "D"],
    ["D", "D", "D", "D", "D", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: lightWisteria,
    B: nomad,
    C: saharaSand,
    D: altoMain,
    E: bittersweet,
    F: chardonnay,
    G: anakiwa,
    H: lightOrchid,
    I: celadon,
  },
  isNew: true,
};

export default level;
