import {
  altoMain,
  anakiwa,
  celadon,
  chardonnay,
  halfBaked,
  lightOrchid,
  lightWisteria,
  nomad,
  saharaSand,
} from "../colors";

const level = {
  path: "/bonus-level/2026-08-16",
  size: 9,
  colorRegions: [
    ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    ["A", "A", "A", "A", "A", "B", "B", "B", "C"],
    ["A", "D", "E", "E", "E", "E", "B", "C", "C"],
    ["A", "D", "E", "E", "F", "E", "E", "C", "G"],
    ["A", "D", "E", "F", "F", "F", "E", "G", "G"],
    ["A", "A", "E", "E", "F", "E", "E", "G", "H"],
    ["A", "A", "A", "E", "E", "E", "E", "G", "H"],
    ["A", "A", "A", "A", "I", "I", "I", "G", "H"],
    ["I", "I", "I", "I", "I", "H", "H", "H", "H"],
  ],
  regionColors: {
    A: celadon,
    B: anakiwa,
    C: chardonnay,
    D: altoMain,
    E: nomad,
    F: saharaSand,
    G: lightWisteria,
    H: lightOrchid,
    I: halfBaked,
  },
};

export default level;
