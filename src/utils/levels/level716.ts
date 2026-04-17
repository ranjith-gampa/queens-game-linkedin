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

const level716 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "C", "C", "C", "C", "C"],
    ["A", "A", "A", "B", "B", "C", "D", "D", "C"],
    ["A", "A", "A", "E", "E", "C", "C", "D", "C"],
    ["F", "F", "F", "G", "G", "G", "C", "D", "C"],
    ["F", "F", "F", "G", "G", "G", "C", "C", "C"],
    ["F", "F", "F", "G", "G", "G", "C", "C", "C"],
    ["H", "F", "H", "H", "H", "H", "I", "I", "I"],
    ["H", "F", "H", "H", "H", "H", "I", "I", "I"],
    ["H", "H", "H", "H", "H", "H", "I", "I", "I"],
  ],
  regionColors: {
    A: lightWisteria,
    B: altoMain,
    C: saharaSand,
    D: bittersweet,
    E: celadon,
    F: nomad,
    G: chardonnay,
    H: lightOrchid,
    I: anakiwa,
  },
  isNew: true,
};

export default level716;
