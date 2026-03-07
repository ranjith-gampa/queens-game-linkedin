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

const level675 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "B", "B", "B"],
    ["C", "C", "A", "B", "B", "B", "B", "B", "B"],
    ["C", "C", "A", "B", "B", "B", "D", "D", "D"],
    ["B", "B", "B", "B", "B", "B", "E", "E", "D"],
    ["B", "F", "F", "G", "B", "B", "E", "E", "E"],
    ["B", "G", "F", "G", "B", "B", "B", "B", "B"],
    ["B", "G", "G", "G", "H", "H", "I", "B", "B"],
    ["B", "B", "B", "B", "H", "H", "I", "B", "B"],
    ["B", "B", "B", "B", "I", "I", "I", "B", "B"],
  ],
  regionColors: {
    A: saharaSand,
    B: lightOrchid,
    C: nomad,
    D: bittersweet,
    E: altoMain,
    F: lightWisteria,
    G: chardonnay,
    H: celadon,
    I: anakiwa,
  },
  isNew: true,
};

export default level675;
