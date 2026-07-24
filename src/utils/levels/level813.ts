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

const level813 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "C", "C", "D", "E", "E"],
    ["A", "A", "B", "B", "C", "D", "D", "E", "E"],
    ["A", "B", "B", "C", "C", "D", "D", "D", "E"],
    ["A", "B", "F", "F", "F", "F", "F", "D", "E"],
    ["A", "B", "F", "G", "G", "G", "H", "D", "E"],
    ["A", "B", "F", "F", "H", "H", "H", "D", "E"],
    ["A", "B", "B", "F", "H", "I", "D", "D", "E"],
    ["A", "A", "B", "B", "H", "I", "D", "E", "E"],
    ["A", "A", "B", "I", "I", "I", "D", "E", "E"],
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
  isNew: true,
};

export default level813;
