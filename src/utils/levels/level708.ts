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

const level708 = {
  size: 9,
  colorRegions: [
    ["A", "B", "B", "B", "C", "D", "E", "E", "E"],
    ["A", "B", "C", "C", "C", "D", "E", "E", "E"],
    ["A", "B", "C", "C", "C", "D", "E", "E", "E"],
    ["A", "B", "B", "B", "C", "D", "D", "D", "E"],
    ["C", "C", "C", "C", "C", "E", "E", "E", "E"],
    ["F", "G", "G", "G", "C", "H", "H", "H", "E"],
    ["F", "F", "G", "C", "C", "H", "I", "H", "E"],
    ["F", "F", "G", "C", "C", "H", "H", "H", "E"],
    ["F", "G", "G", "G", "C", "H", "E", "E", "E"],
  ],
  regionColors: {
    A: lightWisteria,
    B: bittersweet,
    C: anakiwa,
    D: celadon,
    E: altoMain,
    F: chardonnay,
    G: lightOrchid,
    H: nomad,
    I: saharaSand,
  },
  isNew: true,
};

export default level708;
