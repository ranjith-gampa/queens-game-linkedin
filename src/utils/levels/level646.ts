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

const level646 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "B", "B"],
    ["A", "C", "C", "C", "B", "B", "B", "D"],
    ["A", "C", "E", "E", "F", "F", "F", "D"],
    ["A", "C", "C", "C", "G", "G", "F", "D"],
    ["D", "D", "D", "C", "F", "F", "F", "D"],
    ["D", "C", "C", "C", "F", "H", "H", "D"],
    ["D", "D", "D", "D", "F", "F", "F", "D"],
    ["D", "D", "D", "D", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: bittersweet,
    B: saharaSand,
    C: chardonnay,
    D: nomad,
    E: anakiwa,
    F: lightWisteria,
    G: celadon,
    H: altoMain,
  },
};

export default level646;
