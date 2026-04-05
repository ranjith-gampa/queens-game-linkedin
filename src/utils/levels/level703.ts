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

const level703 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "B", "B"],
    ["C", "C", "A", "A", "B", "B", "B", "B"],
    ["D", "C", "C", "C", "E", "E", "B", "B"],
    ["D", "B", "E", "E", "E", "B", "B", "B"],
    ["D", "B", "B", "B", "B", "B", "B", "B"],
    ["D", "D", "F", "B", "G", "B", "H", "B"],
    ["D", "F", "F", "G", "G", "H", "H", "B"],
    ["D", "D", "F", "F", "G", "G", "H", "H"],
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

export default level703;
