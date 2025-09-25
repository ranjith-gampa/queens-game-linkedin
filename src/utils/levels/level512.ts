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

const level512 = {
  size: 11,
  colorRegions: [
    ["A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "C", "C", "C", "C", "D", "D", "D", "D", "D", "D", "D", "D"],
    ["A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D"],
    ["A", "A", "B", "B", "B", "B", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "C", "C", "C", "C", "D", "D"],
    ["A", "A", "B", "B", "B", "B", "E", "E", "F", "F", "F", "F", "F", "F", "E", "E", "C", "C", "C", "C", "D", "D"],
    ["A", "A", "A", "A", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "H", "H", "D", "D"],
    ["A", "A", "A", "A", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "H", "H", "D", "D"],
    ["A", "A", "A", "A", "G", "G", "G", "G", "G", "G", "I", "I", "G", "G", "G", "G", "G", "G", "H", "H", "D", "D"],
    ["A", "A", "A", "A", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "H", "H", "H", "H"],
    ["A", "A", "A", "A", "J", "J", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "H", "H", "H", "H", "H", "H"],
    ["A", "A", "A", "A", "J", "J", "J", "J", "J", "J", "K", "K", "K", "K", "K", "K", "K", "K", "H", "H", "H", "H"],
    ["A", "A", "A", "A", "A", "A", "A", "A", "J", "J", "K", "K", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
  ],
  regionColors: {
    A: lightOrchid,
    B: chardonnay,
    C: nomad,
    D: bittersweet,
    E: altoMain,
    F: celadon,
    G: saharaSand,
    H: anakiwa,
    I: lightWisteria,
    J: halfBaked,
    K: turquoiseBlue,
  },
};

export default level512;
