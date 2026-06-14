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

const level772 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B", "B"],
    ["A", "C", "C", "C", "C", "C", "C", "C", "B"],
    ["A", "C", "D", "D", "D", "E", "E", "C", "B"],
    ["A", "C", "D", "F", "F", "F", "E", "C", "B"],
    ["A", "C", "D", "F", "F", "F", "E", "C", "B"],
    ["A", "C", "D", "F", "F", "F", "G", "H", "B"],
    ["A", "C", "D", "D", "G", "G", "G", "H", "I"],
    ["A", "C", "C", "C", "C", "H", "H", "H", "I"],
    ["A", "A", "A", "A", "A", "A", "I", "I", "I"],
  ],
  regionColors: {
    A: bittersweet,
    B: lightWisteria,
    C: saharaSand,
    D: lightOrchid,
    E: anakiwa,
    F: celadon,
    G: nomad,
    H: chardonnay,
    I: altoMain,
  },
};

export default level772;
