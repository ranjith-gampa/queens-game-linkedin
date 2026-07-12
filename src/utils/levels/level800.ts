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

const level800 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "A", "A", "A", "C", "D", "D"],
    ["A", "B", "B", "B", "A", "C", "C", "C", "E"],
    ["A", "A", "B", "F", "A", "A", "C", "E", "E"],
    ["A", "A", "F", "F", "F", "A", "A", "A", "E"],
    ["A", "A", "A", "F", "A", "A", "A", "A", "A"],
    ["A", "A", "G", "A", "A", "A", "H", "A", "A"],
    ["A", "G", "G", "G", "A", "H", "H", "H", "A"],
    ["A", "A", "G", "A", "A", "I", "H", "A", "A"],
    ["A", "A", "A", "A", "I", "I", "I", "A", "A"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: nomad,
    F: altoMain,
    G: bittersweet,
    H: saharaSand,
    I: lightOrchid,
  },
};

export default level800;
