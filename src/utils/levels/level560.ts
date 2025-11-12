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

const level560 = {
  size: 10,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B"],
    ["C", "A", "A", "D", "B", "B", "E", "B"],
    ["F", "F", "F", "F", "F", "F", "F", "F"],
    ["C", "A", "A", "D", "B", "B", "E", "B"],
    ["C", "C", "A", "D", "D", "B", "E", "E"],
    ["C", "C", "A", "D", "D", "B", "E", "E"],
    ["C", "C", "G", "D", "D", "B", "E", "E"],
    ["C", "C", "G", "D", "D", "G", "E", "E"],
    ["H", "C", "G", "G", "D", "G", "G", "E"],
    ["H", "I", "I", "G", "G", "G", "G", "G"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: tallow,
    G: bittersweet,
    H: saharaSand,
    I: nomad,
  },
  isNew: true,
};

export default level560;
