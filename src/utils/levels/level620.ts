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

const level620 = {
  size: 9,
  colorRegions: [
    ["A", "A", "A", "A", "A", "B", "B", "B", "C"],
    ["D", "E", "E", "E", "A", "E", "E", "E", "C"],
    ["D", "E", "F", "E", "A", "E", "G", "E", "C"],
    ["D", "E", "F", "E", "E", "E", "H", "E", "C"],
    ["D", "E", "F", "F", "H", "H", "H", "E", "C"],
    ["D", "E", "F", "E", "E", "E", "H", "E", "C"],
    ["D", "E", "F", "E", "I", "E", "H", "E", "I"],
    ["D", "E", "E", "E", "I", "E", "E", "E", "I"],
    ["D", "D", "D", "I", "I", "I", "I", "I", "I"],
  ],
  regionColors: {
    A: lightWisteria,
    B: chardonnay,
    C: lightOrchid,
    D: bittersweet,
    E: altoMain,
    F: celadon,
    G: saharaSand,
    H: nomad,
    I: anakiwa,
  },
};

export default level620;
