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

const level794 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "C", "C", "C", "D", "D", "D", "D", "B"],
    ["A", "C", "E", "E", "E", "E", "E", "D", "B"],
    ["A", "C", "E", "F", "F", "F", "E", "D", "G"],
    ["A", "C", "E", "F", "H", "F", "E", "D", "G"],
    ["A", "C", "D", "F", "H", "H", "E", "D", "G"],
    ["I", "C", "D", "F", "F", "F", "E", "D", "G"],
    ["I", "C", "D", "D", "D", "D", "D", "D", "G"],
    ["I", "C", "C", "C", "C", "C", "C", "G", "G"],
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
  isNew: true,
};

export default level794;
