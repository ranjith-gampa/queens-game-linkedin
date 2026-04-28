import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  saharaSand,
} from "../colors";

const level727 = {
  size: 7,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "B"],
    ["A", "C", "C", "C", "A", "A", "B"],
    ["C", "C", "C", "C", "C", "A", "A"],
    ["D", "E", "E", "F", "E", "A", "A"],
    ["D", "E", "E", "E", "E", "A", "A"],
    ["G", "E", "E", "E", "A", "A", "A"],
    ["G", "G", "G", "G", "G", "A", "A"],
  ],
  regionColors: {
    A: anakiwa,
    B: saharaSand,
    C: altoMain,
    D: celadon,
    E: chardonnay,
    F: lightWisteria,
    G: bittersweet,
  },
  isNew: true,
};

export default level727;
