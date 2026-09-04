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

const level854 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "C", "B", "B", "B", "D", "D", "D", "D"],
    ["A", "C", "E", "B", "B", "D", "D", "D", "D"],
    ["F", "C", "E", "B", "B", "B", "B", "B", "D"],
    ["F", "F", "E", "B", "B", "B", "B", "B", "B"],
    ["G", "F", "F", "F", "F", "B", "H", "B", "B"],
    ["G", "G", "G", "G", "F", "I", "H", "B", "B"],
    ["G", "G", "G", "G", "F", "I", "H", "B", "B"],
    ["F", "F", "F", "F", "F", "I", "B", "B", "B"],
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
    I: lightOrchid,
  },
};

export default level854;
