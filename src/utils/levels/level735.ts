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

const level735 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "C", "C", "D", "D"],
    ["A", "A", "E", "B", "C", "C", "C", "D"],
    ["A", "E", "E", "B", "B", "C", "C", "D"],
    ["A", "E", "E", "B", "B", "C", "D", "D"],
    ["A", "E", "E", "F", "C", "C", "D", "D"],
    ["A", "E", "G", "F", "C", "C", "D", "D"],
    ["E", "E", "G", "F", "F", "C", "C", "D"],
    ["G", "G", "G", "F", "F", "H", "C", "C"],
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
};

export default level735;
