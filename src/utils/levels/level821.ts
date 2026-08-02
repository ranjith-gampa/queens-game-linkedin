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

const level821 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "C", "D", "D"],
    ["A", "B", "B", "E", "B", "C", "C", "C", "D"],
    ["A", "B", "E", "E", "E", "B", "C", "B", "D"],
    ["A", "B", "B", "E", "B", "B", "B", "B", "D"],
    ["A", "B", "B", "B", "B", "F", "F", "B", "D"],
    ["A", "A", "B", "B", "G", "F", "F", "H", "H"],
    ["A", "A", "A", "A", "G", "H", "H", "H", "H"],
    ["A", "A", "A", "I", "G", "I", "H", "H", "H"],
    ["A", "A", "A", "I", "I", "I", "H", "H", "H"],
  ],
  regionColors: {
    A: lightOrchid,
    B: celadon,
    C: saharaSand,
    D: nomad,
    E: altoMain,
    F: bittersweet,
    G: chardonnay,
    H: anakiwa,
    I: lightWisteria,
  },
};

export default level821;
