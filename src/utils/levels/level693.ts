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

const level693 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "C", "D"],
    ["A", "A", "A", "B", "B", "B", "C", "D"],
    ["D", "D", "D", "C", "C", "C", "C", "D"],
    ["D", "E", "E", "F", "F", "C", "C", "D"],
    ["D", "E", "E", "E", "E", "D", "D", "D"],
    ["D", "E", "G", "G", "G", "D", "D", "D"],
    ["D", "D", "H", "H", "H", "D", "D", "D"],
    ["D", "D", "D", "D", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: saharaSand,
    B: bittersweet,
    C: lightWisteria,
    D: nomad,
    E: chardonnay,
    F: anakiwa,
    G: altoMain,
    H: celadon,
  },
};

export default level693;
