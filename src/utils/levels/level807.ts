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

const level807 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["B", "C", "C", "C", "C", "D", "D", "E", "A"],
    ["B", "C", "C", "D", "D", "D", "E", "E", "A"],
    ["B", "C", "C", "C", "F", "F", "F", "E", "A"],
    ["B", "C", "G", "F", "F", "F", "F", "H", "A"],
    ["B", "G", "G", "F", "F", "H", "H", "H", "A"],
    ["B", "G", "I", "F", "F", "F", "H", "H", "A"],
    ["B", "I", "I", "F", "H", "H", "H", "H", "A"],
    ["B", "B", "B", "B", "B", "B", "B", "B", "A"],
  ],
  regionColors: {
    A: nomad,
    B: lightOrchid,
    C: lightWisteria,
    D: anakiwa,
    E: celadon,
    F: bittersweet,
    G: chardonnay,
    H: altoMain,
    I: saharaSand,
  },
  isNew: true,
};

export default level807;
