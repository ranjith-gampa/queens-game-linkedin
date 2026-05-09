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

const level737 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B", "B"],
    ["C", "C", "D", "D", "B", "E", "E", "B", "F"],
    ["C", "D", "D", "D", "B", "E", "E", "E", "F"],
    ["G", "D", "D", "B", "B", "B", "E", "E", "F"],
    ["G", "G", "G", "B", "B", "F", "F", "F", "F"],
    ["G", "H", "H", "B", "B", "B", "I", "I", "F"],
    ["G", "H", "H", "H", "G", "I", "I", "I", "F"],
    ["G", "G", "H", "H", "G", "I", "I", "F", "F"],
    ["G", "G", "G", "G", "G", "F", "F", "F", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: lightOrchid,
    E: bittersweet,
    F: altoMain,
    G: saharaSand,
    H: nomad,
    I: celadon,
  },
};

export default level737;
