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

const level766 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B"],
    ["A", "C", "C", "B", "B", "B", "B", "B"],
    ["C", "C", "D", "D", "B", "E", "E", "B"],
    ["C", "D", "D", "D", "F", "F", "E", "E"],
    ["C", "C", "D", "D", "D", "F", "F", "E"],
    ["G", "C", "C", "H", "D", "F", "E", "E"],
    ["G", "G", "G", "H", "D", "E", "E", "D"],
    ["G", "H", "H", "H", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: lightWisteria,
    B: anakiwa,
    C: celadon,
    D: altoMain,
    E: bittersweet,
    F: chardonnay,
    G: saharaSand,
    H: nomad,
  },
};

export default level766;
