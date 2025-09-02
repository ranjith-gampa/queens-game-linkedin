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

const level490 = {
  size: 9,
  colorRegions: [
    ["A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "C", "C", "B", "B", "B", "B", "B", "B"],
    ["D", "D", "D", "D", "D", "D", "B", "B", "C", "C", "C", "C", "C", "C", "E", "E", "E", "E"],
    ["D", "D", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "C", "C", "E", "E", "E", "E"],
    ["D", "D", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "F", "F", "E", "E"],
    ["G", "G", "G", "G", "B", "B", "B", "B", "H", "H", "B", "B", "B", "B", "F", "F", "F", "F"],
    ["G", "G", "B", "B", "B", "B", "H", "H", "H", "H", "I", "I", "B", "B", "B", "B", "F", "F"],
    ["G", "G", "G", "G", "H", "H", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "F", "F"],
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

export default level490;
