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

const level855 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "B", "B", "B", "B"],
    ["A", "C", "C", "C", "A", "D", "D", "D", "B"],
    ["C", "C", "C", "C", "A", "C", "C", "D", "D"],
    ["C", "C", "C", "C", "C", "C", "C", "C", "D"],
    ["C", "C", "C", "C", "E", "D", "D", "D", "D"],
    ["F", "E", "E", "E", "E", "E", "E", "E", "G"],
    ["F", "F", "E", "E", "E", "E", "E", "H", "G"],
    ["F", "F", "F", "E", "E", "E", "H", "H", "G"],
    ["F", "I", "I", "I", "E", "H", "H", "G", "G"],
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

export default level855;
