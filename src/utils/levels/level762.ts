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

const level762 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B"],
    ["A", "A", "C", "C", "C", "C", "B", "B"],
    ["A", "A", "C", "D", "D", "C", "B", "B"],
    ["A", "A", "C", "D", "D", "C", "B", "B"],
    ["E", "E", "C", "C", "C", "C", "B", "B"],
    ["E", "E", "C", "F", "F", "C", "F", "F"],
    ["G", "H", "C", "F", "F", "C", "F", "F"],
    ["G", "H", "H", "F", "F", "F", "F", "F"],
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
  },
  isNew: true,
};

export default level762;
