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

const level633 = {
  size: 9,
  colorRegions: [
    ["A", "B", "C", "C", "C", "C", "C", "C", "C"],
    ["B", "B", "C", "C", "C", "D", "C", "C", "D"],
    ["E", "B", "C", "F", "F", "D", "C", "C", "D"],
    ["E", "B", "G", "G", "F", "D", "D", "D", "D"],
    ["E", "B", "E", "F", "F", "D", "H", "H", "D"],
    ["E", "E", "E", "F", "I", "I", "I", "H", "D"],
    ["E", "E", "E", "F", "F", "E", "H", "H", "D"],
    ["E", "E", "E", "E", "E", "E", "E", "H", "D"],
    ["E", "E", "E", "E", "E", "E", "H", "H", "D"],
  ],
  regionColors: {
    A: chardonnay,
    B: lightWisteria,
    C: saharaSand,
    D: nomad,
    E: lightOrchid,
    F: celadon,
    G: altoMain,
    H: anakiwa,
    I: bittersweet,
  },
  isNew: true,
};

export default level633;
