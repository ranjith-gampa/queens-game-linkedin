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

const level785 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "A", "C", "C", "C", "A"],
    ["D", "A", "A", "B", "A", "C", "A", "A", "A"],
    ["D", "A", "A", "B", "A", "A", "A", "A", "A"],
    ["D", "D", "A", "A", "A", "A", "A", "A", "E"],
    ["A", "A", "A", "A", "A", "F", "A", "A", "E"],
    ["G", "A", "A", "F", "F", "F", "A", "E", "E"],
    ["G", "A", "A", "H", "A", "A", "A", "A", "A"],
    ["G", "G", "A", "H", "A", "I", "A", "A", "A"],
    ["A", "A", "A", "H", "H", "I", "I", "I", "A"],
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

export default level785;
