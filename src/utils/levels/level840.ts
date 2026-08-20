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

const level840 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "A", "A", "C", "A", "A"],
    ["A", "A", "B", "A", "A", "C", "C", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "C", "A", "A"],
    ["D", "D", "D", "A", "A", "A", "A", "A", "A"],
    ["A", "D", "A", "A", "A", "A", "A", "E", "A"],
    ["A", "A", "A", "A", "F", "F", "E", "E", "E"],
    ["A", "A", "G", "H", "H", "F", "F", "F", "F"],
    ["A", "A", "G", "G", "H", "H", "I", "F", "F"],
    ["A", "A", "G", "H", "H", "I", "I", "I", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: bittersweet,
    D: lightOrchid,
    E: altoMain,
    F: anakiwa,
    G: saharaSand,
    H: nomad,
    I: celadon,
  },
  isNew: true,
};

export default level840;
