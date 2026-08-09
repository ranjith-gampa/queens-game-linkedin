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

const level829 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B", "B"],
    ["C", "D", "D", "D", "D", "D", "D", "D", "B"],
    ["C", "D", "C", "D", "E", "E", "E", "D", "B"],
    ["C", "D", "C", "D", "D", "D", "E", "D", "D"],
    ["C", "C", "C", "D", "E", "E", "E", "D", "F"],
    ["D", "D", "G", "D", "D", "D", "H", "D", "F"],
    ["I", "D", "G", "G", "D", "H", "H", "H", "F"],
    ["I", "D", "D", "D", "D", "D", "D", "D", "F"],
    ["I", "I", "I", "I", "I", "I", "F", "F", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: lightOrchid,
    C: chardonnay,
    D: altoMain,
    E: bittersweet,
    F: saharaSand,
    G: anakiwa,
    H: celadon,
    I: nomad,
  },
  isNew: true,
};

export default level829;
