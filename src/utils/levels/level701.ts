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

const level701 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "C", "D", "D", "D", "D"],
    ["A", "B", "B", "C", "C", "D", "D", "D", "D"],
    ["A", "B", "B", "E", "E", "E", "D", "D", "D"],
    ["A", "A", "E", "E", "E", "E", "E", "F", "D"],
    ["A", "A", "E", "E", "G", "E", "E", "F", "D"],
    ["H", "A", "E", "E", "E", "E", "E", "F", "F"],
    ["H", "H", "H", "E", "E", "E", "F", "F", "F"],
    ["H", "H", "H", "H", "I", "I", "F", "I", "F"],
    ["H", "H", "H", "H", "I", "I", "I", "I", "F"],
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

export default level701;
