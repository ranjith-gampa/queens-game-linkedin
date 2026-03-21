import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightOrchid,
  lightWisteria,
  saharaSand,
} from "../colors";

const level688 = {
  size: 8,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "B", "B"],
    ["A", "A", "A", "B", "C", "C", "C", "B"],
    ["A", "D", "D", "E", "F", "C", "C", "B"],
    ["A", "D", "D", "E", "F", "C", "C", "B"],
    ["B", "E", "E", "E", "E", "B", "B", "B"],
    ["B", "E", "G", "G", "G", "H", "H", "B"],
    ["B", "B", "H", "H", "H", "H", "H", "B"],
    ["B", "B", "B", "B", "B", "B", "B", "B"],
  ],
  regionColors: {
    A: lightWisteria,
    B: lightOrchid,
    C: bittersweet,
    D: chardonnay,
    E: anakiwa,
    F: celadon,
    G: altoMain,
    H: saharaSand,
  },
};

export default level688;
