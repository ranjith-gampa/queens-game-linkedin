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

const level790 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "B", "B", "A", "C", "C", "C", "A"],
    ["A", "B", "B", "B", "A", "A", "C", "C", "A"],
    ["D", "D", "D", "E", "E", "E", "F", "F", "F"],
    ["G", "D", "G", "E", "G", "E", "H", "F", "I"],
    ["G", "D", "G", "E", "G", "E", "H", "F", "I"],
    ["G", "G", "G", "G", "G", "I", "H", "H", "I"],
    ["I", "G", "I", "I", "I", "I", "I", "I", "I"],
    ["I", "I", "I", "I", "I", "I", "I", "I", "I"],
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
};

export default level790;
