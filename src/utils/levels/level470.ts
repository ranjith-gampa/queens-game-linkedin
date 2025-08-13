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

const level470 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "C", "C", "B", "B", "D", "D"],
    ["A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "C", "C", "B", "B", "D", "D"],
    ["A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "D", "D"],
    ["E", "E", "E", "E", "B", "B", "F", "F", "F", "F", "B", "B", "D", "D", "D", "D"],
    ["E", "E", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "D", "D", "D", "D"],
    ["E", "E", "B", "B", "G", "G", "G", "G", "B", "B", "D", "D", "D", "D", "D", "D"],
    ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "D", "D", "D", "D", "D", "D"],
    ["B", "B", "H", "H", "H", "H", "B", "B", "D", "D", "D", "D", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: nomad,
    B: altoMain,
    C: lightWisteria,
    D: bittersweet,
    E: saharaSand,
    F: chardonnay,
    G: anakiwa,
    H: celadon,
  },
  isNew: true,
};

export default level470;
