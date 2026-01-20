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

const level628 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "C", "C"],
    ["A", "A", "A", "B", "B", "C", "C", "C"],
    ["A", "A", "B", "B", "C", "C", "C", "D"],
    ["A", "B", "B", "C", "C", "C", "D", "D"],
    ["B", "B", "E", "C", "C", "D", "D", "F"],
    ["B", "E", "E", "E", "D", "D", "G", "F"],
    ["H", "E", "E", "D", "D", "G", "G", "F"],
    ["H", "H", "D", "D", "G", "G", "F", "F"],
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

export default level628;
