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

const level835 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "C", "C", "C"],
    ["A", "B", "B", "D", "D", "D", "D", "D", "C"],
    ["E", "E", "E", "F", "F", "F", "F", "D", "C"],
    ["G", "G", "E", "F", "F", "F", "C", "C", "C"],
    ["G", "G", "E", "F", "F", "F", "C", "H", "H"],
    ["E", "E", "E", "F", "F", "F", "C", "H", "H"],
    ["E", "F", "F", "F", "F", "F", "C", "C", "C"],
    ["E", "F", "F", "F", "F", "F", "I", "I", "I"],
    ["E", "E", "E", "I", "I", "I", "I", "I", "I"],
  ],
  regionColors: {
    A: saharaSand,
    B: altoMain,
    C: lightWisteria,
    D: bittersweet,
    E: chardonnay,
    F: lightOrchid,
    G: anakiwa,
    H: celadon,
    I: nomad,
  },
  isNew: true,
};

export default level835;
