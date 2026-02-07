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

const level647 = {
  size: 8,
  colorRegions: [
    ["A", "A", "B", "B", "B", "C", "C", "C"],
    ["A", "D", "D", "D", "E", "E", "E", "C"],
    ["A", "D", "F", "F", "F", "F", "E", "C"],
    ["G", "E", "F", "H", "H", "F", "E", "C"],
    ["G", "E", "F", "H", "H", "F", "E", "C"],
    ["G", "E", "F", "F", "F", "F", "E", "C"],
    ["G", "E", "E", "E", "E", "E", "E", "C"],
    ["G", "G", "G", "C", "C", "C", "C", "C"],
  ],
  regionColors: {
    A: celadon,
    B: saharaSand,
    C: bittersweet,
    D: altoMain,
    E: nomad,
    F: chardonnay,
    G: anakiwa,
    H: lightWisteria,
  },
  isNew: true,
};

export default level647;
