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

const level516 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "C", "D", "D"],
    ["A", "A", "A", "A", "B", "E", "C", "C", "D"],
    ["A", "A", "A", "A", "B", "E", "E", "D", "D"],
    ["F", "F", "F", "A", "B", "B", "B", "D", "D"],
    ["F", "G", "F", "A", "A", "A", "B", "D", "B"],
    ["G", "G", "F", "F", "F", "A", "B", "B", "B"],
    ["G", "H", "H", "H", "F", "A", "A", "A", "A"],
    ["G", "H", "I", "H", "F", "A", "A", "A", "A"],
    ["G", "H", "I", "F", "F", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: lightOrchid,
    H: nomad,
    I: saharaSand,
  },
  isNew: true,
};

export default level516;
