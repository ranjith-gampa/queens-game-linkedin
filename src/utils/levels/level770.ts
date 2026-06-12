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

const level770 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "B", "B"],
    ["A", "A", "C", "B", "B", "B", "B", "B"],
    ["A", "C", "C", "B", "B", "B", "B", "B"],
    ["D", "E", "E", "E", "B", "B", "B", "B"],
    ["D", "E", "E", "E", "E", "B", "B", "B"],
    ["D", "E", "E", "E", "E", "F", "F", "G"],
    ["D", "H", "H", "E", "E", "F", "F", "G"],
    ["D", "H", "H", "H", "E", "G", "G", "G"],
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

export default level770;
