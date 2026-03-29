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

const level697 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "D", "E", "E"],
    ["A", "A", "A", "B", "C", "C", "D", "D", "E"],
    ["A", "A", "B", "B", "C", "C", "D", "D", "E"],
    ["A", "F", "B", "F", "C", "G", "G", "G", "E"],
    ["A", "F", "F", "F", "C", "C", "G", "E", "E"],
    ["A", "F", "A", "F", "H", "G", "G", "G", "E"],
    ["A", "A", "A", "A", "H", "H", "I", "E", "E"],
    ["A", "A", "A", "H", "H", "H", "I", "I", "E"],
    ["A", "A", "A", "A", "H", "H", "I", "E", "E"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: nomad,
    G: lightOrchid,
    H: bittersweet,
    I: saharaSand,
  },
  isNew: true,
};

export default level697;
