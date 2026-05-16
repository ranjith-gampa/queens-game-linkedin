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

const level744 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "C", "C", "C", "D", "D", "D"],
    ["B", "B", "B", "C", "C", "C", "C", "D", "D"],
    ["B", "B", "E", "E", "F", "F", "C", "C", "D"],
    ["G", "E", "E", "E", "F", "F", "F", "C", "D"],
    ["G", "E", "E", "H", "H", "F", "F", "D", "D"],
    ["G", "I", "I", "H", "H", "H", "D", "D", "D"],
    ["G", "I", "I", "I", "H", "H", "D", "D", "D"],
    ["G", "G", "I", "I", "G", "D", "D", "D", "D"],
    ["G", "G", "G", "G", "G", "D", "D", "D", "D"],
  ],
  regionColors: {
    A: anakiwa,
    B: celadon,
    C: chardonnay,
    D: altoMain,
    E: lightWisteria,
    F: bittersweet,
    G: nomad,
    H: saharaSand,
    I: lightOrchid,
  },
  isNew: true,
};

export default level744;
