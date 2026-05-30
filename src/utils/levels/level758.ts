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

const level758 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B", "C"],
    ["D", "B", "A", "A", "A", "B", "B", "C"],
    ["D", "B", "B", "A", "B", "B", "C", "C"],
    ["D", "D", "B", "B", "B", "C", "C", "E"],
    ["D", "D", "F", "B", "C", "C", "E", "E"],
    ["D", "D", "F", "F", "F", "G", "E", "E"],
    ["D", "D", "F", "F", "G", "G", "H", "H"],
    ["D", "D", "F", "G", "G", "G", "H", "H"],
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

export default level758;
