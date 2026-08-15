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

const level834 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "B", "B", "B", "C", "B", "B", "B", "B"],
    ["A", "B", "D", "C", "C", "C", "E", "B", "B"],
    ["A", "D", "D", "D", "C", "E", "E", "F", "B"],
    ["A", "A", "D", "G", "G", "E", "F", "F", "F"],
    ["A", "A", "A", "H", "G", "G", "I", "F", "A"],
    ["A", "A", "H", "H", "H", "I", "I", "I", "A"],
    ["A", "A", "A", "H", "A", "A", "I", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
  ],
  regionColors: {
    A: lightOrchid,
    B: nomad,
    C: chardonnay,
    D: lightWisteria,
    E: saharaSand,
    F: anakiwa,
    G: bittersweet,
    H: altoMain,
    I: celadon,
  },
};

export default level834;
