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

const level702 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "B", "A", "A", "A", "C", "C", "A"],
    ["A", "B", "B", "B", "A", "C", "C", "C", "A"],
    ["A", "A", "B", "B", "D", "C", "C", "E", "A"],
    ["F", "F", "F", "D", "D", "D", "E", "E", "E"],
    ["F", "F", "G", "G", "D", "H", "H", "E", "E"],
    ["F", "G", "G", "G", "I", "H", "H", "H", "E"],
    ["F", "G", "G", "F", "F", "F", "H", "H", "E"],
    ["F", "F", "F", "F", "E", "E", "E", "E", "E"],
  ],
  regionColors: {
    A: lightWisteria,
    B: bittersweet,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: chardonnay,
    G: lightOrchid,
    H: nomad,
    I: saharaSand,
  },
  isNew: true,
};

export default level702;
