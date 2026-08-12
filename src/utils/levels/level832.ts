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

const level832 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "C"],
    ["A", "B", "B", "B", "B", "B", "B", "C"],
    ["A", "B", "B", "B", "B", "B", "C", "C"],
    ["D", "B", "B", "B", "B", "E", "E", "E"],
    ["D", "D", "D", "B", "B", "B", "B", "E"],
    ["F", "G", "G", "G", "B", "B", "B", "H"],
    ["F", "B", "B", "G", "B", "B", "B", "H"],
    ["F", "F", "B", "B", "B", "B", "H", "H"],
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

export default level832;
