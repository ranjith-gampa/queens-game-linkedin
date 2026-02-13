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

const level652 = {
  size: 8,
  colorRegions: [
    ["A", "B", "C", "C", "C", "C", "C", "C"],
    ["B", "B", "B", "D", "E", "E", "C", "C"],
    ["F", "B", "D", "D", "E", "E", "C", "C"],
    ["F", "D", "D", "E", "E", "E", "E", "C"],
    ["F", "D", "E", "E", "E", "E", "E", "C"],
    ["F", "E", "E", "F", "E", "E", "G", "C"],
    ["F", "E", "E", "F", "E", "G", "G", "G"],
    ["F", "F", "F", "F", "F", "F", "G", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: bittersweet,
    D: saharaSand,
    E: nomad,
    F: anakiwa,
    G: celadon,
    H: altoMain,
  },
};

export default level652;
