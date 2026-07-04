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

const level793 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "C", "C", "D", "D"],
    ["A", "A", "B", "E", "B", "C", "C", "F", "D"],
    ["B", "B", "B", "E", "B", "C", "C", "F", "F"],
    ["B", "E", "E", "E", "B", "F", "F", "F", "F"],
    ["B", "B", "B", "B", "B", "F", "G", "F", "F"],
    ["H", "H", "H", "H", "H", "G", "G", "F", "F"],
    ["H", "H", "H", "H", "G", "G", "G", "F", "F"],
    ["H", "H", "H", "H", "H", "H", "F", "F", "I"],
    ["H", "H", "H", "H", "H", "H", "H", "I", "I"],
  ],
  regionColors: {
    A: bittersweet,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: lightOrchid,
    F: lightWisteria,
    G: saharaSand,
    H: nomad,
    I: altoMain,
  },
  isNew: true,
};

export default level793;
