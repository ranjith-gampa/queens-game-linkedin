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

const level715 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "B", "B", "B", "C", "C"],
    ["D", "E", "E", "B", "B", "C", "C", "C"],
    ["D", "E", "B", "B", "B", "B", "C", "B"],
    ["D", "D", "D", "B", "B", "B", "B", "B"],
    ["D", "D", "D", "B", "B", "B", "F", "B"],
    ["D", "G", "D", "D", "D", "B", "F", "B"],
    ["G", "G", "G", "D", "F", "F", "F", "B"],
    ["G", "G", "D", "D", "D", "D", "D", "H"],
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

export default level715;
