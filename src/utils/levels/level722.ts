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

const level722 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "C", "C", "C", "D", "D"],
    ["A", "A", "A", "C", "C", "D", "D", "D"],
    ["A", "C", "C", "C", "D", "D", "D", "E"],
    ["A", "C", "C", "D", "D", "D", "F", "E"],
    ["G", "G", "D", "D", "D", "E", "E", "E"],
    ["G", "D", "D", "D", "E", "E", "E", "H"],
    ["D", "D", "D", "E", "E", "E", "H", "H"],
    ["D", "D", "H", "H", "H", "H", "H", "H"],
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

export default level722;
