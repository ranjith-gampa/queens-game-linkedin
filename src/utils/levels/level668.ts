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

const level668 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "C", "C", "C", "C", "D"],
    ["A", "B", "E", "B", "C", "C", "F", "C", "D"],
    ["A", "B", "B", "B", "C", "F", "F", "D", "D"],
    ["G", "G", "B", "C", "C", "C", "F", "D", "D"],
    ["G", "G", "B", "B", "H", "F", "F", "D", "D"],
    ["G", "G", "B", "H", "H", "H", "F", "D", "D"],
    ["G", "G", "B", "B", "H", "F", "F", "F", "D"],
    ["G", "G", "B", "H", "H", "F", "I", "F", "D"],
    ["G", "G", "G", "G", "H", "F", "F", "F", "D"],
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

export default level668;
