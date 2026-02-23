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

const level662 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "B", "C", "C", "C", "C"],
    ["A", "B", "D", "C", "B", "C", "C", "C", "C"],
    ["A", "B", "D", "C", "C", "C", "E", "E", "C"],
    ["A", "B", "B", "B", "C", "E", "E", "E", "E"],
    ["A", "A", "A", "B", "C", "E", "F", "F", "E"],
    ["B", "A", "A", "B", "C", "E", "F", "G", "E"],
    ["B", "B", "B", "B", "H", "E", "G", "G", "E"],
    ["H", "H", "H", "H", "H", "E", "E", "E", "E"],
    ["H", "H", "H", "H", "H", "H", "E", "E", "I"],
  ],
  regionColors: {
    A: lightWisteria,
    B: bittersweet,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: chardonnay,
    G: saharaSand,
    H: lightOrchid,
    I: nomad,
  },
};

export default level662;
