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

const level817 = {
  size: 8,
  colorRegions: [
    ["A", "B", "C", "C", "C", "D", "D", "D"],
    ["B", "B", "C", "D", "D", "D", "E", "E"],
    ["B", "C", "C", "D", "E", "E", "E", "F"],
    ["B", "C", "D", "D", "E", "F", "F", "F"],
    ["B", "C", "D", "E", "E", "F", "G", "G"],
    ["B", "C", "D", "E", "F", "F", "H", "H"],
    ["B", "C", "D", "E", "E", "F", "F", "H"],
    ["B", "B", "D", "D", "E", "E", "F", "F"],
  ],
  regionColors: {
    A: nomad,
    B: lightWisteria,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: bittersweet,
    G: saharaSand,
    H: chardonnay,
  },
};

export default level817;
