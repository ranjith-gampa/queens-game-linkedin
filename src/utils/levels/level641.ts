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

const level641 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "C", "B"],
    ["D", "A", "B", "B", "B", "B", "C", "B", "B"],
    ["D", "A", "E", "E", "E", "B", "C", "B", "B"],
    ["F", "F", "F", "E", "B", "B", "B", "B", "B"],
    ["G", "F", "G", "E", "G", "G", "H", "H", "H"],
    ["G", "F", "G", "G", "G", "G", "G", "H", "G"],
    ["G", "G", "G", "I", "I", "I", "G", "H", "G"],
    ["G", "G", "G", "G", "I", "G", "G", "G", "G"],
    ["G", "G", "G", "G", "I", "G", "G", "G", "G"],
  ],
  regionColors: {
    A: saharaSand,
    B: nomad,
    C: chardonnay,
    D: bittersweet,
    E: lightWisteria,
    F: altoMain,
    G: lightOrchid,
    H: celadon,
    I: anakiwa,
  },
  isNew: true,
};

export default level641;
