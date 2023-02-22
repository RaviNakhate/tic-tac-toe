export const obj = {
  modalBox: false,
  board: Array(9).fill(null),
  wonCombinations: [
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ],
  winner: null,
  score: [0, 0], // [X,✓]
  mode: "hard",
  moveNumber: 0,
  moveChances: "✓",
  multiplayer: false,
  tempMode: "hard",
  tempMultiplayer: false,
};
