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

const level748 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "B", "C", "C", "C", "C"],
    ["A", "A", "A", "B", "B", "D", "D", "E"],
    ["A", "A", "A", "A", "B", "B", "B", "E"],
    ["A", "A", "A", "A", "A", "B", "B", "E"],
    ["A", "F", "F", "E", "E", "E", "E", "E"],
    ["A", "F", "F", "F", "E", "E", "E", "E"],
    ["A", "F", "G", "G", "G", "E", "E", "E"],
    ["F", "F", "H", "H", "G", "G", "G", "E"],
  ],
  regionColors: {
    A: saharaSand,
    B: nomad,
    C: anakiwa,
    D: celadon,
    E: bittersweet,
    F: altoMain,
    G: chardonnay,
    H: lightWisteria,
  },
  isNew: true,
};

export default level748;
