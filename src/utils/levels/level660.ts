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

const level660 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "C", "C"],
    ["A", "A", "B", "B", "C", "C", "D", "C", "C"],
    ["A", "B", "B", "E", "C", "D", "D", "D", "C"],
    ["B", "B", "E", "E", "E", "D", "D", "E", "C"],
    ["B", "E", "E", "E", "E", "E", "E", "E", "F"],
    ["E", "E", "G", "E", "E", "E", "E", "F", "F"],
    ["E", "G", "G", "G", "E", "E", "F", "F", "H"],
    ["E", "G", "G", "E", "E", "F", "F", "I", "I"],
    ["E", "E", "E", "E", "F", "F", "I", "I", "I"],
  ],
  regionColors: {
    A: bittersweet,
    B: lightOrchid,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: lightWisteria,
    G: saharaSand,
    H: nomad,
    I: chardonnay,
  },
  isNew: true,
};

export default level660;
