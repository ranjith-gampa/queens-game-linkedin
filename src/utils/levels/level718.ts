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

const level718 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "B", "C", "A", "A", "D", "A", "A"],
    ["A", "B", "B", "C", "C", "D", "D", "D", "D"],
    ["A", "A", "B", "C", "C", "E", "E", "E", "D"],
    ["F", "F", "B", "C", "C", "E", "G", "E", "D"],
    ["F", "B", "B", "B", "C", "E", "E", "E", "D"],
    ["F", "H", "H", "H", "I", "I", "I", "E", "D"],
    ["F", "F", "F", "H", "I", "E", "E", "E", "I"],
    ["F", "F", "F", "H", "I", "I", "I", "I", "I"],
  ],
  regionColors: {
    A: lightOrchid,
    B: lightWisteria,
    C: nomad,
    D: anakiwa,
    E: chardonnay,
    F: saharaSand,
    G: altoMain,
    H: bittersweet,
    I: celadon,
  },
  isNew: true,
};

export default level718;
