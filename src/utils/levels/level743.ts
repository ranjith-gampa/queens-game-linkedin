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

const level743 = {
  size: 8,
  colorRegions: [
    ["A", "B", "B", "C", "D", "D", "E", "E"],
    ["A", "B", "C", "C", "D", "E", "E", "E"],
    ["C", "B", "C", "C", "D", "E", "E", "E"],
    ["C", "B", "B", "C", "D", "D", "E", "E"],
    ["C", "C", "C", "C", "C", "E", "E", "E"],
    ["F", "C", "G", "G", "C", "H", "H", "E"],
    ["F", "F", "G", "C", "C", "H", "E", "E"],
    ["F", "F", "G", "G", "C", "H", "H", "E"],
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

export default level743;
