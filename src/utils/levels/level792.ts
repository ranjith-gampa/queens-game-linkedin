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

const level792 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "C", "C", "C", "C", "C", "C", "C", "B"],
    ["A", "C", "D", "D", "D", "E", "C", "C", "B"],
    ["A", "D", "D", "D", "D", "E", "E", "C", "B"],
    ["A", "D", "D", "F", "F", "F", "E", "E", "B"],
    ["A", "A", "A", "F", "F", "F", "B", "B", "B"],
    ["A", "A", "A", "F", "G", "F", "B", "B", "B"],
    ["A", "A", "A", "F", "G", "F", "H", "H", "H"],
    ["A", "A", "A", "I", "I", "I", "H", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
};

export default level792;
