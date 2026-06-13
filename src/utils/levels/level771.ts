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

const level771 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "C", "C", "C", "C"],
    ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    ["A", "A", "B", "B", "D", "B", "B", "C", "C"],
    ["A", "B", "B", "D", "D", "D", "B", "B", "C"],
    ["A", "E", "B", "B", "D", "B", "B", "C", "C"],
    ["E", "E", "E", "B", "B", "B", "F", "F", "F"],
    ["E", "G", "E", "E", "B", "E", "E", "F", "H"],
    ["G", "G", "G", "E", "E", "E", "E", "H", "H"],
    ["I", "G", "E", "E", "E", "E", "E", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: lightOrchid,
    D: bittersweet,
    E: altoMain,
    F: celadon,
    G: saharaSand,
    H: nomad,
    I: anakiwa,
  },
};

export default level771;
