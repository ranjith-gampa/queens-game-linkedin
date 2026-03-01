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

const level669 = {
  size: 9,
  colorRegions: [
    ["A", "B", "C", "C", "B", "B", "D", "D", "B"],
    ["A", "B", "B", "C", "C", "B", "D", "D", "B"],
    ["A", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "B", "E", "E", "B", "B", "B", "F", "F"],
    ["G", "G", "G", "E", "B", "B", "F", "F", "G"],
    ["G", "G", "G", "E", "B", "G", "G", "G", "G"],
    ["H", "G", "G", "G", "G", "G", "I", "G", "G"],
    ["H", "H", "H", "G", "G", "I", "I", "G", "G"],
    ["G", "G", "G", "G", "G", "G", "I", "G", "G"],
  ],
  regionColors: {
    A: altoMain,
    B: bittersweet,
    C: nomad,
    D: saharaSand,
    E: lightWisteria,
    F: celadon,
    G: lightOrchid,
    H: chardonnay,
    I: anakiwa,
  },
  isNew: true,
};

export default level669;
