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

const level645 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "C", "C", "C", "D", "D"],
    ["A", "B", "B", "B", "B", "C", "B", "D"],
    ["A", "B", "B", "B", "B", "B", "B", "D"],
    ["E", "B", "B", "B", "B", "B", "B", "B"],
    ["E", "E", "E", "B", "B", "F", "F", "B"],
    ["G", "B", "B", "B", "B", "F", "B", "B"],
    ["G", "B", "B", "H", "B", "F", "B", "B"],
    ["G", "G", "B", "H", "H", "H", "B", "B"],
  ],
  regionColors: {
    A: chardonnay,
    B: nomad,
    C: altoMain,
    D: saharaSand,
    E: anakiwa,
    F: celadon,
    G: lightWisteria,
    H: bittersweet,
  },
};

export default level645;
