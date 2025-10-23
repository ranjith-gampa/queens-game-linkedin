import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  nomad,
  saharaSand,
  tallow,
} from "../colors";

const level540 = {
  size: 10,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "C", "C", "C", "C", "C", "C"],
    ["A", "A", "D", "D", "E", "E", "E", "E", "B", "B", "F", "F", "C", "C", "F", "F"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
    ["A", "A", "D", "D", "E", "E", "E", "E", "B", "B", "F", "F", "C", "C", "F", "F"],
    ["A", "A", "D", "D", "E", "E", "E", "E", "B", "B", "F", "F", "C", "C", "F", "F"],
    ["D", "D", "D", "D", "E", "E", "E", "E", "B", "B", "F", "F", "F", "F", "F", "F"],
    ["D", "D", "D", "D", "E", "E", "H", "H", "H", "H", "I", "I", "I", "I", "I", "I"],
    ["D", "D", "D", "D", "H", "H", "H", "H", "H", "H", "I", "I", "I", "I", "I", "I"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "I", "I", "H", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: tallow,
    H: saharaSand,
    I: nomad,
  },
};

export default level540;
