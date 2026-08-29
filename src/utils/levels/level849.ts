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

const level849 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "C", "C", "D", "D"],
    ["A", "A", "A", "B", "B", "B", "C", "C", "D"],
    ["A", "A", "E", "E", "E", "E", "E", "C", "D"],
    ["A", "A", "A", "F", "F", "F", "D", "D", "D"],
    ["A", "G", "G", "G", "F", "D", "D", "H", "H"],
    ["G", "G", "G", "G", "F", "D", "H", "H", "H"],
    ["G", "G", "G", "G", "I", "D", "H", "H", "H"],
    ["G", "G", "G", "G", "I", "D", "D", "H", "H"],
    ["G", "G", "G", "I", "I", "I", "H", "H", "H"],
  ],
  regionColors: {
    A: anakiwa,
    B: lightWisteria,
    C: bittersweet,
    D: saharaSand,
    E: chardonnay,
    F: altoMain,
    G: celadon,
    H: lightOrchid,
    I: nomad,
  },
  isNew: true,
};

export default level849;
