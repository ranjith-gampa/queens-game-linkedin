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

const level499 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "C", "C", "C", "C", "A", "A", "D", "D", "D", "D", "D", "D", "B", "B", "B", "B"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "D", "D", "E", "E", "D", "D", "B", "B", "B", "B"],
    ["F", "F", "F", "F", "F", "F", "B", "B", "D", "D", "E", "E", "D", "D", "B", "B", "B", "B"],
    ["G", "G", "G", "G", "F", "F", "B", "B", "D", "D", "D", "D", "D", "D", "B", "B", "B", "B"],
    ["G", "G", "G", "G", "F", "F", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["F", "F", "F", "F", "F", "F", "B", "B", "B", "B", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "H", "H", "I", "I", "I", "I", "H", "H"],
    ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "H", "H", "H", "H", "H", "H", "H", "H"],
  ],
  regionColors: {
    A: anakiwa,
    B: altoMain,
    C: lightWisteria,
    D: celadon,
    E: saharaSand,
    F: chardonnay,
    G: lightOrchid,
    H: bittersweet,
    I: nomad,
  },
  isNew: true,
};

export default level499;
