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

const level653 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "C", "C"],
    ["A", "B", "B", "D", "D", "D", "B", "B", "C"],
    ["A", "B", "D", "D", "D", "D", "D", "B", "E"],
    ["A", "B", "B", "D", "D", "D", "B", "B", "E"],
    ["A", "A", "B", "B", "D", "B", "B", "E", "E"],
    ["F", "A", "A", "B", "B", "B", "E", "E", "E"],
    ["F", "F", "F", "F", "G", "E", "E", "E", "E"],
    ["F", "F", "H", "H", "G", "I", "I", "E", "E"],
    ["F", "H", "H", "H", "G", "I", "I", "I", "E"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: anakiwa,
    D: bittersweet,
    E: altoMain,
    F: celadon,
    G: saharaSand,
    H: nomad,
    I: lightOrchid,
  },
  isNew: true,
};

export default level653;
