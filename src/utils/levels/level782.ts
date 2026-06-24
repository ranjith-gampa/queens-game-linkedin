import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  nomad,
  saharaSand,
} from "../colors";

const level782 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "B", "B", "B", "C", "A"],
    ["D", "B", "B", "B", "E", "B", "C", "C"],
    ["D", "B", "B", "B", "B", "B", "B", "C"],
    ["D", "B", "F", "F", "F", "F", "B", "C"],
    ["D", "D", "F", "G", "F", "F", "F", "C"],
    ["H", "D", "F", "F", "F", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H"],
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
  },
};

export default level782;
