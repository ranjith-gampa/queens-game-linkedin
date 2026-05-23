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

const level750 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "C", "B", "B", "B", "D", "B", "B"],
    ["A", "C", "C", "C", "B", "D", "D", "D", "B"],
    ["A", "A", "C", "C", "E", "D", "D", "D", "B"],
    ["A", "A", "A", "E", "E", "E", "F", "F", "B"],
    ["A", "G", "G", "G", "E", "H", "H", "F", "F"],
    ["A", "I", "I", "G", "A", "H", "H", "H", "F"],
    ["A", "A", "I", "A", "A", "A", "H", "F", "F"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: celadon,
    B: lightOrchid,
    C: anakiwa,
    D: lightWisteria,
    E: altoMain,
    F: saharaSand,
    G: bittersweet,
    H: nomad,
    I: chardonnay,
  },
};

export default level750;
