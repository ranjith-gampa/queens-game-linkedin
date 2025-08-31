import {
  altoMain,
  anakiwa,
  bittersweet,
  celadon,
  chardonnay,
  halfBaked,
  lightOrchid,
  lightWisteria,
  nomad,
  saharaSand,
  turquoiseBlue,
} from "../colors";

const level = {
  path: "/bonus-level/2025-08-31",
  size: 11,
  colorRegions: [
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "C", "C", "C", "C", "D", "D", "D", "D", "B", "B", "B", "B", "B", "B", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "C", "C", "C", "C", "A", "A", "D", "D", "D", "D", "B", "B", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "A", "A", "G", "G", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "H", "H", "F", "F", "G", "G", "G", "G", "G", "G", "A", "A"],
    ["A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "H", "H", "F", "F", "F", "F", "G", "G", "H", "H", "A", "A"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "A", "A"],
    ["I", "I", "A", "A", "A", "A", "A", "A", "H", "H", "J", "J", "J", "J", "K", "K", "K", "K", "H", "H", "H", "H"],
    ["I", "I", "H", "H", "H", "H", "H", "H", "H", "H", "J", "J", "J", "J", "I", "I", "K", "K", "K", "K", "H", "H"],
    ["I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I"],
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
    J: halfBaked,
    K: turquoiseBlue,
  },
  isNew: true,
};

export default level;
