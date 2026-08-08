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

const level828 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "C", "D"],
    ["A", "A", "B", "B", "B", "C", "C", "D", "D"],
    ["E", "E", "B", "B", "F", "F", "D", "D", "D"],
    ["E", "E", "E", "F", "F", "F", "G", "G", "D"],
    ["H", "E", "E", "F", "F", "G", "G", "G", "D"],
    ["H", "H", "H", "I", "I", "G", "G", "D", "D"],
    ["H", "H", "I", "I", "I", "D", "D", "D", "D"],
    ["D", "H", "I", "I", "D", "D", "D", "D", "D"],
    ["D", "D", "D", "D", "D", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: saharaSand,
    B: celadon,
    C: altoMain,
    D: lightOrchid,
    E: chardonnay,
    F: anakiwa,
    G: bittersweet,
    H: nomad,
    I: lightWisteria,
  },
  isNew: true,
};

export default level828;
