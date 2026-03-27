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

const level694 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    ["A", "A", "A", "B", "B", "B", "B", "C", "C"],
    ["A", "A", "A", "D", "B", "D", "B", "C", "C"],
    ["A", "A", "D", "D", "D", "D", "D", "C", "C"],
    ["A", "A", "D", "D", "D", "D", "D", "E", "C"],
    ["F", "F", "F", "D", "D", "D", "G", "E", "E"],
    ["F", "F", "F", "F", "D", "G", "G", "E", "H"],
    ["F", "F", "F", "F", "I", "I", "G", "H", "H"],
    ["F", "F", "F", "F", "I", "I", "H", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: lightOrchid,
    E: celadon,
    F: saharaSand,
    G: altoMain,
    H: bittersweet,
    I: nomad,
  },
};

export default level694;
