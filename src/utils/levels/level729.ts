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

const level729 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "C"],
    ["D", "D", "E", "A", "A", "E", "B", "C"],
    ["D", "F", "E", "A", "A", "E", "B", "G"],
    ["D", "F", "E", "E", "E", "E", "G", "G"],
    ["F", "F", "F", "E", "E", "H", "G", "G"],
    ["F", "F", "H", "E", "E", "H", "H", "H"],
    ["H", "H", "H", "E", "E", "H", "H", "H"],
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
  isNew: true,
};

export default level729;
