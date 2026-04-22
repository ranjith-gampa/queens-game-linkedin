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

const level721 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B"],
    ["A", "C", "C", "D", "B", "E", "E", "B"],
    ["A", "C", "D", "D", "B", "B", "E", "B"],
    ["A", "C", "D", "F", "B", "B", "E", "B"],
    ["A", "G", "D", "F", "F", "F", "H", "B"],
    ["F", "G", "D", "F", "B", "B", "H", "B"],
    ["F", "G", "G", "F", "B", "H", "H", "B"],
    ["F", "F", "F", "F", "B", "B", "B", "B"],
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

export default level721;
