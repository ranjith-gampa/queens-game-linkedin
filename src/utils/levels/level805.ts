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

const level805 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "C", "C", "D", "D", "D"],
    ["A", "A", "B", "B", "B", "C", "C", "D", "D"],
    ["A", "A", "B", "E", "E", "E", "E", "E", "E"],
    ["A", "A", "E", "E", "E", "E", "E", "E", "E"],
    ["F", "F", "E", "E", "E", "E", "E", "E", "E"],
    ["F", "F", "E", "E", "E", "E", "E", "E", "E"],
    ["F", "G", "E", "E", "E", "E", "E", "E", "H"],
    ["G", "G", "G", "G", "I", "H", "H", "H", "H"],
    ["G", "G", "G", "I", "I", "I", "H", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: bittersweet,
    D: celadon,
    E: anakiwa,
    F: saharaSand,
    G: nomad,
    H: altoMain,
    I: lightOrchid,
  },
};

export default level805;
