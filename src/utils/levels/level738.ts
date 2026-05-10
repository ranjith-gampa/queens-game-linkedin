import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightOrchid,
  lightWisteria,
  nomad,
  saharaSand,
} from "../colors";

const level738 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "C", "C", "C"],
    ["D", "D", "D", "A", "A", "B", "B", "B", "D"],
    ["D", "E", "D", "D", "A", "A", "A", "A", "D"],
    ["D", "E", "E", "D", "D", "D", "D", "D", "D"],
    ["D", "F", "F", "F", "F", "F", "F", "F", "D"],
    ["D", "F", "G", "G", "G", "G", "G", "F", "D"],
    ["D", "F", "G", "H", "H", "H", "G", "F", "D"],
    ["D", "F", "G", "H", "I", "H", "G", "F", "D"],
    ["D", "F", "G", "H", "I", "H", "G", "F", "D"],
  ],
  regionColors: {
    A: saharaSand,
    B: nomad,
    C: lightOrchid,
    D: altoMain,
    E: bittersweet,
    F: lightWisteria,
    G: chardonnay,
    H: anakiwa,
    I: celadon,
  },
};

export default level738;
