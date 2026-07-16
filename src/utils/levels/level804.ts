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

const level804 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "B", "A", "A", "C", "C", "C", "C"],
    ["A", "B", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "D", "A", "E", "E", "A", "F"],
    ["A", "D", "D", "D", "A", "E", "E", "A", "F"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "F"],
    ["A", "G", "A", "H", "A", "A", "A", "A", "F"],
    ["A", "G", "A", "H", "H", "A", "I", "A", "A"],
    ["G", "G", "A", "A", "H", "A", "I", "I", "I"],
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

export default level804;
