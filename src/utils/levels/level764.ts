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

const level764 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "C", "C", "C", "D", "D"],
    ["A", "A", "A", "B", "C", "D", "D", "D", "D"],
    ["A", "A", "C", "C", "C", "D", "D", "D", "E"],
    ["A", "A", "C", "D", "D", "D", "D", "D", "E"],
    ["C", "C", "C", "D", "D", "D", "E", "E", "E"],
    ["C", "D", "D", "D", "D", "D", "E", "F", "F"],
    ["C", "G", "G", "D", "E", "E", "E", "F", "F"],
    ["G", "G", "G", "D", "E", "H", "H", "H", "I"],
    ["G", "G", "E", "E", "E", "H", "I", "I", "I"],
  ],
  regionColors: {
    A: lightOrchid,
    B: chardonnay,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: saharaSand,
    G: bittersweet,
    H: nomad,
    I: lightWisteria,
  },
  isNew: true,
};

export default level764;
