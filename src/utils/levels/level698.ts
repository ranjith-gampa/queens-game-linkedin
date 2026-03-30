import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  nomad,
  saharaSand,
} from "../colors";

const level698 = {
  size: 8,
  colorRegions: [
    ["A", "B", "A", "A", "C", "C", "C", "C"],
    ["A", "B", "A", "A", "C", "C", "C", "C"],
    ["A", "A", "A", "A", "C", "C", "C", "C"],
    ["A", "A", "A", "A", "D", "C", "C", "C"],
    ["E", "E", "E", "E", "F", "F", "F", "F"],
    ["E", "E", "E", "E", "F", "F", "F", "F"],
    ["E", "E", "E", "E", "F", "F", "G", "F"],
    ["E", "H", "H", "E", "F", "F", "G", "F"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: bittersweet,
    D: altoMain,
    E: saharaSand,
    F: celadon,
    G: anakiwa,
    H: nomad,
  },
  isNew: true,
};

export default level698;
