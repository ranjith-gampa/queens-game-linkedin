import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  lightWisteria,
  nomad,
  saharaSand,
} from "../colors";

const level678 = {
  size: 8,
  colorRegions: [
    ["A", "B", "C", "C", "C", "C", "C", "C"],
    ["A", "B", "C", "C", "C", "C", "C", "C"],
    ["B", "B", "D", "E", "E", "F", "F", "F"],
    ["D", "D", "D", "E", "E", "F", "F", "F"],
    ["D", "D", "D", "E", "E", "F", "F", "F"],
    ["D", "D", "D", "E", "E", "F", "G", "G"],
    ["F", "F", "F", "F", "F", "F", "G", "H"],
    ["F", "F", "F", "F", "F", "F", "G", "H"],
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
  },
  isNew: true,
};

export default level678;
