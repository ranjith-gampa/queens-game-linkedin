import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  nomad,
  saharaSand,
  tallow,
} from "../colors";

const level448 = {
  size: 10,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A", "B", "A", "A"],
    ["C", "A", "D", "E", "E", "E", "A", "F"],
    ["G", "G", "G", "G", "G", "G", "G", "G"],
    ["C", "A", "D", "E", "E", "E", "A", "F"],
    ["C", "A", "D", "E", "H", "E", "F", "F"],
    ["C", "A", "D", "E", "H", "E", "F", "F"],
    ["C", "C", "D", "E", "H", "E", "H", "F"],
    ["I", "H", "H", "H", "H", "H", "H", "H"],
    ["I", "H", "H", "H", "H", "H", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: tallow,
    H: saharaSand,
    I: nomad,
  },
  isNew: true,
};

export default level448;
