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

const level625 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "C"],
    ["A", "A", "A", "A", "B", "B", "B", "C"],
    ["A", "A", "A", "A", "B", "B", "C", "C"],
    ["A", "A", "A", "A", "D", "C", "C", "E"],
    ["D", "D", "D", "D", "D", "F", "C", "E"],
    ["G", "G", "H", "F", "F", "F", "E", "E"],
    ["G", "H", "H", "F", "E", "E", "E", "E"],
    ["G", "H", "E", "E", "E", "E", "E", "E"],
  ],
  regionColors: {
    A: lightWisteria,
    B: nomad,
    C: saharaSand,
    D: chardonnay,
    E: bittersweet,
    F: altoMain,
    G: celadon,
    H: anakiwa,
  },
  isNew: true,
};

export default level625;
