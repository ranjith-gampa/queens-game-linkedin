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

const level640 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "C", "C", "C", "D"],
    ["A", "B", "B", "B", "B", "C", "E", "C", "D"],
    ["A", "B", "B", "B", "D", "C", "E", "C", "D"],
    ["A", "A", "A", "B", "D", "C", "C", "C", "D"],
    ["B", "B", "B", "B", "D", "D", "D", "D", "D"],
    ["F", "G", "G", "G", "D", "D", "H", "D", "D"],
    ["F", "G", "I", "G", "D", "D", "H", "D", "D"],
    ["F", "G", "I", "G", "D", "D", "H", "D", "D"],
    ["F", "G", "G", "G", "D", "D", "H", "H", "H"],
  ],
  regionColors: {
    A: lightWisteria,
    B: lightOrchid,
    C: chardonnay,
    D: anakiwa,
    E: nomad,
    F: saharaSand,
    G: celadon,
    H: bittersweet,
    I: altoMain,
  },
  isNew: true,
};

export default level640;
