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

const level842 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "C", "C", "B"],
    ["A", "A", "A", "A", "B", "D", "D", "B", "B"],
    ["A", "A", "A", "A", "B", "D", "D", "B", "B"],
    ["A", "A", "A", "A", "B", "B", "B", "B", "B"],
    ["B", "E", "E", "F", "F", "B", "B", "B", "B"],
    ["B", "E", "E", "F", "F", "B", "G", "G", "B"],
    ["B", "B", "H", "H", "B", "B", "G", "G", "B"],
    ["B", "B", "H", "H", "B", "B", "B", "I", "I"],
    ["B", "B", "B", "B", "B", "B", "B", "I", "I"],
  ],
  regionColors: {
    A: bittersweet,
    B: altoMain,
    C: nomad,
    D: saharaSand,
    E: lightWisteria,
    F: celadon,
    G: chardonnay,
    H: anakiwa,
    I: lightOrchid,
  },
  isNew: true,
};

export default level842;
