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

const level848 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "B", "B"],
    ["A", "A", "A", "A", "C", "A", "A", "A", "B"],
    ["A", "A", "D", "A", "C", "A", "A", "A", "A"],
    ["D", "D", "D", "C", "C", "C", "E", "E", "E"],
    ["D", "C", "C", "C", "F", "C", "C", "C", "E"],
    ["D", "D", "D", "C", "F", "C", "E", "E", "E"],
    ["D", "G", "G", "F", "F", "F", "H", "H", "E"],
    ["D", "G", "F", "F", "F", "F", "F", "I", "E"],
    ["D", "I", "I", "I", "I", "I", "I", "I", "E"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
};

export default level848;
