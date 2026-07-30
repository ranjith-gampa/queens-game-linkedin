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

const level819 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "B", "B", "B", "B", "C", "C", "B"],
    ["B", "B", "B", "D", "E", "E", "E", "C", "B"],
    ["B", "B", "D", "D", "F", "E", "E", "B", "B"],
    ["B", "B", "B", "F", "F", "F", "E", "B", "B"],
    ["B", "B", "B", "B", "F", "G", "G", "B", "B"],
    ["B", "B", "B", "B", "B", "G", "B", "H", "B"],
    ["B", "B", "B", "I", "B", "B", "B", "H", "H"],
    ["B", "B", "B", "I", "I", "B", "B", "B", "B"],
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
  isNew: true,
};

export default level819;
