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

const level731 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "B", "A", "A", "C", "C", "C", "A"],
    ["B", "B", "D", "A", "E", "E", "E", "C", "A"],
    ["B", "D", "D", "D", "E", "C", "C", "C", "A"],
    ["B", "F", "D", "E", "E", "C", "G", "G", "G"],
    ["B", "F", "F", "E", "H", "C", "C", "C", "G"],
    ["B", "B", "F", "F", "H", "I", "I", "G", "G"],
    ["F", "F", "F", "F", "H", "H", "I", "I", "I"],
  ],
  regionColors: {
    A: bittersweet,
    B: chardonnay,
    C: anakiwa,
    D: saharaSand,
    E: altoMain,
    F: lightWisteria,
    G: lightOrchid,
    H: nomad,
    I: celadon,
  },
  isNew: true,
};

export default level731;
