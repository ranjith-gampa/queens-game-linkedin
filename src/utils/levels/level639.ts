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

const level639 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "B", "B", "B", "B", "B", "B", "B", "A"],
    ["A", "B", "C", "C", "C", "C", "C", "B", "A"],
    ["A", "B", "C", "D", "D", "D", "C", "B", "A"],
    ["A", "B", "C", "D", "E", "E", "C", "B", "A"],
    ["F", "F", "G", "G", "E", "E", "E", "E", "E"],
    ["F", "F", "F", "G", "G", "H", "E", "E", "E"],
    ["F", "I", "F", "I", "G", "H", "H", "E", "E"],
    ["I", "I", "I", "I", "I", "H", "H", "H", "E"],
  ],
  regionColors: {
    A: bittersweet,
    B: chardonnay,
    C: celadon,
    D: anakiwa,
    E: altoMain,
    F: nomad,
    G: lightOrchid,
    H: lightWisteria,
    I: saharaSand,
  },
};

export default level639;
