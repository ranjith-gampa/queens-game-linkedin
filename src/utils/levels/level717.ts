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

const level717 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "C", "C"],
    ["A", "D", "D", "A", "B", "B", "C", "C", "C"],
    ["D", "D", "C", "C", "C", "C", "C", "C", "E"],
    ["F", "D", "C", "G", "H", "H", "C", "E", "E"],
    ["F", "F", "C", "G", "H", "H", "C", "E", "I"],
    ["F", "F", "C", "G", "G", "H", "C", "E", "I"],
    ["F", "C", "C", "C", "C", "C", "C", "I", "I"],
    ["C", "C", "C", "I", "I", "I", "I", "I", "I"],
    ["C", "C", "I", "I", "I", "I", "I", "I", "I"],
  ],
  regionColors: {
    A: bittersweet,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: lightWisteria,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
  isNew: true,
};

export default level717;
