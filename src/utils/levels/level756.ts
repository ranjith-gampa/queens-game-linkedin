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

const level756 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "C", "C", "C"],
    ["A", "A", "A", "B", "B", "D", "D", "C", "C"],
    ["E", "F", "B", "B", "D", "D", "E", "C", "C"],
    ["E", "F", "B", "F", "F", "D", "E", "E", "E"],
    ["E", "F", "F", "F", "F", "F", "E", "G", "E"],
    ["E", "F", "F", "F", "F", "F", "E", "G", "E"],
    ["E", "F", "F", "F", "F", "F", "E", "E", "H"],
    ["E", "E", "F", "F", "F", "E", "E", "H", "H"],
    ["I", "E", "E", "E", "E", "E", "H", "H", "H"],
  ],
  regionColors: {
    A: lightOrchid,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: nomad,
    G: saharaSand,
    H: bittersweet,
    I: lightWisteria,
  },
};

export default level756;
