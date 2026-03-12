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

const level680 = {
  size: 8,
  colorRegions: [
    ["A", "B", "C", "C", "C", "D", "D", "D"],
    ["B", "B", "C", "C", "C", "D", "D", "D"],
    ["B", "B", "B", "C", "C", "D", "D", "D"],
    ["E", "E", "E", "C", "C", "C", "F", "F"],
    ["E", "E", "E", "E", "F", "F", "F", "F"],
    ["G", "G", "G", "F", "F", "F", "F", "F"],
    ["G", "G", "G", "F", "F", "F", "F", "F"],
    ["G", "G", "G", "F", "F", "F", "F", "H"],
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

export default level680;
