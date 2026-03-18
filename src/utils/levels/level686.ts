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

const level686 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "C", "C", "C"],
    ["D", "E", "B", "E", "F", "C", "F", "C"],
    ["D", "E", "E", "E", "F", "F", "F", "C"],
    ["D", "D", "E", "G", "G", "F", "H", "H"],
    ["D", "D", "E", "G", "G", "F", "H", "H"],
    ["D", "E", "E", "E", "F", "F", "F", "H"],
    ["D", "E", "D", "E", "F", "D", "F", "H"],
    ["D", "D", "D", "D", "D", "D", "D", "H"],
  ],
  regionColors: {
    A: bittersweet,
    B: altoMain,
    C: celadon,
    D: nomad,
    E: lightWisteria,
    F: anakiwa,
    G: chardonnay,
    H: saharaSand,
  },
  isNew: true,
};

export default level686;
