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

const level642 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "B", "C", "D", "D", "D"],
    ["A", "B", "B", "B", "B", "C", "C", "D", "D"],
    ["A", "B", "E", "E", "E", "E", "C", "C", "D"],
    ["A", "A", "A", "F", "G", "C", "C", "D", "D"],
    ["A", "A", "F", "F", "G", "C", "D", "D", "H"],
    ["A", "F", "F", "I", "I", "I", "I", "D", "H"],
    ["A", "A", "F", "F", "D", "D", "D", "D", "H"],
    ["A", "A", "D", "F", "D", "H", "H", "H", "H"],
    ["D", "D", "D", "D", "D", "D", "D", "D", "H"],
  ],
  regionColors: {
    A: saharaSand,
    B: altoMain,
    C: lightWisteria,
    D: lightOrchid,
    E: chardonnay,
    F: bittersweet,
    G: nomad,
    H: anakiwa,
    I: celadon,
  },
};

export default level642;
