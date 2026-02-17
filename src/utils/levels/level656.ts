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

const level656 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    ["A", "A", "B", "B", "D", "B", "B", "C", "C"],
    ["A", "B", "B", "D", "D", "D", "B", "B", "C"],
    ["B", "B", "E", "E", "E", "D", "F", "B", "B"],
    ["B", "E", "E", "E", "D", "D", "F", "F", "B"],
    ["B", "B", "E", "E", "E", "E", "F", "B", "B"],
    ["G", "B", "B", "E", "E", "E", "B", "B", "H"],
    ["G", "G", "B", "B", "E", "B", "B", "H", "H"],
    ["I", "I", "I", "B", "B", "B", "H", "H", "H"],
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

export default level656;
