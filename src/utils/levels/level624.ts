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

const level624 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A"],
    ["B", "B", "C", "A", "A", "D", "E", "E"],
    ["B", "C", "C", "A", "A", "D", "D", "E"],
    ["B", "A", "A", "A", "F", "E", "E", "E"],
    ["B", "A", "A", "G", "F", "E", "E", "E"],
    ["B", "H", "H", "G", "G", "H", "H", "B"],
    ["B", "B", "H", "H", "H", "H", "B", "B"],
    ["B", "B", "B", "B", "B", "B", "B", "B"],
  ],
  regionColors: {
    A: altoMain,
    B: nomad,
    C: lightWisteria,
    D: chardonnay,
    E: saharaSand,
    F: anakiwa,
    G: bittersweet,
    H: celadon,
  },
  isNew: true,
};

export default level624;
