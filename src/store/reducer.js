import { obj } from "./data.js";

export const state = (state = obj, { type, payload }) => {
  switch (type) {
    case "changeSettings":
      changeSettings();
      return { ...obj };
    case "tempModeChanges":
      obj.tempMode = payload.tempMode;
      return { ...obj };
    case "tempMultiplayerChanges":
      obj.tempMultiplayer = payload.tempMultiplayer;
      return { ...obj };
    case "move":
      if (isNull(payload.index)) {
        obj.board[payload.index] = obj.moveChances;
        if (checkWinner()) {
        } else {
          if (checkDraw()) {
          } else {
            changeMoveChances();
            changeMoveNumber();
            if (!obj.multiplayer) {
              aiChance();
            }
          }
        }
      }
      return { ...obj };
    case "aiMove":
      aiChance();
      return { ...obj };
    case "modalBox":
      obj.modalBox = payload.modalBox;
      restartGame();
      return { ...obj };
    default:
      return { ...obj };
  }
};

// FUNCTIONS
const restartGame = () => {
  obj.board = Array(9).fill(null);
  obj.moveNumber = 0;
};

const changeSettings = () => {
  obj.score = [0, 0];
  restartGame();
  obj.multiplayer = obj.tempMultiplayer;
  obj.mode = obj.tempMode;
};

const isNull = (index) => {
  return obj.board[index] == null ? true : false;
};

const changeMoveChances = () => {
  if (obj.moveChances == "X") {
    obj.moveChances = "✓";
  } else if (obj.moveChances == "✓") {
    obj.moveChances = "X";
  }
};

const changeMoveNumber = () => {
  obj.moveNumber = obj.moveNumber + 1;
};

const checkDraw = () => {
  // atleast one value are null then return TRUE[game-is-not-over]
  const res = obj.board.some((val) => val === null);
  if (!res) {
    restartGame();
  }
  return res ? false : true;
};

const checkWinner = () => {
  let win = false;
  obj.wonCombinations.map((val) => {
    const a = obj.board[val[0]];
    const b = obj.board[val[1]];
    const c = obj.board[val[2]];
    // check atleast one value are null it return true
    const res = [a, b, c].some((val) => val === null);
    if (!res) {
      if (
        obj.board[val[0]] == obj.board[val[1]] &&
        obj.board[val[1]] == obj.board[val[2]]
      ) {
        if (obj.board[val[0]] == "X") {
          obj.score[0] = obj.score[0] + 1;
        }
        if (obj.board[val[1]] == "✓") {
          obj.score[1] = obj.score[1] + 1;
        }
        obj.winner = obj.moveChances;
        obj.modalBox = true;
        win = true;
      }
    }
  });
  return win ? true : false;
};

// AI CHANCE
const aiChance = () => {
  if (obj.mode == "easy") {
    easy();
  } else if (obj.mode == "hard") {
    hard();
  } else if (obj.mode == "medium") {
    medium();
  }
};

const easy = () => {
  const randomIndex = getRandomEmptyIndex();
  obj.board[randomIndex] = "✓";

  if (checkWinner()) {
  } else {
    if (checkDraw()) {
    } else {
      changeMoveChances();
      changeMoveNumber();
    }
  }
};

const medium = () => {
  const x = getWonIndex();

  if (x) {
    obj.board[x] = "✓";
  } else {
    const y = preventFailureIndex();
    if (y) {
      obj.board[y] = "✓";
    } else {
      const z = getRandomEmptyIndex();
      obj.board[z] = "✓";
    }
  }
  if (checkWinner()) {
  } else {
    if (checkDraw()) {
    } else {
      changeMoveChances();
      changeMoveNumber();
    }
  }
};

// MOVES
const getWonIndex = () => {
  const forWhose = "✓"; // ✓ is alway AI
  let index = false;

  obj.wonCombinations.map((val) => {
    const a = obj.board[val[0]];
    const b = obj.board[val[1]];
    const c = obj.board[val[2]];

    if (
      (a === null || b === null || c === null) &&
      ((a === forWhose && b === forWhose) ||
        (b === forWhose && c === forWhose) ||
        (a === forWhose && c === forWhose))
    ) {
      // atleast one index is null
      if (
        (a === b && b !== c) ||
        (b === c && c !== a) ||
        (a === c && c !== b)
      ) {
        if (a === null) {
          index = val[0];
        } else if (b === null) {
          index = val[1];
        } else if (c === null) {
          index = val[2];
        }
      }
    }
  });
  return index;
};

const preventFailureIndex = () => {
  const forWhose = "X"; // prevent from X
  let index = false;

  obj.wonCombinations.map((val) => {
    const a = obj.board[val[0]];
    const b = obj.board[val[1]];
    const c = obj.board[val[2]];

    if (
      (a === null || b === null || c === null) &&
      ((a === forWhose && b === forWhose) ||
        (b === forWhose && c === forWhose) ||
        (a === forWhose && c === forWhose))
    ) {
      // atleast one index is null
      if (
        (a === b && b !== c) ||
        (b === c && c !== a) ||
        (a === c && c !== b)
      ) {
        if (a === null) {
          index = val[0];
        } else if (b === null) {
          index = val[1];
        } else if (c === null) {
          index = val[2];
        }
      }
    }
  });
  return index;
};

const getRandomEmptyIndex = () => {
  let index;
  do {
    index = Math.floor(Math.random() * obj.board.length);
  } while (obj.board[index] !== null);
  return index;
};

const getRandomEmptyCornerIndex = () => {
  const corner = [0, 2, 6, 8];

  let index;
  do {
    index = Math.floor(Math.random() * corner.length);
  } while (obj.board[corner[index]] !== null);
  return corner[index];
};

const getOppositeCornerIndex = {
  0: 8,
  8: 0,
  2: 6,
  6: 2,
};

const getNearestEmptyCornerIndex = (x) => {
  const nextCorner = {
    0: 2,
    2: 0,
    6: 0,
    8: 2,
  };
  const prevCorner = {
    0: 6,
    2: 8,
    6: 8,
    8: 6,
  };

  const check1 = nextCorner[x];
  const check2 = prevCorner[x];

  if (obj.board[check1] === null) return check1;
  else return check2;
};

const checkAtleastOneValuePresentSides = (value) => {
  const arr = [1, 3, 5, 7];
  const res = arr.some((val) => obj.board[val] === value);
  return res;
};

const checkAtleastOneValuePresentCorner = (value) => {
  const arr = [0, 2, 6, 8];
  const res = arr.some((val) => obj.board[val] === value);
  return res;
};

const checkNearestCornerisEmpty = (side) => {
  // done
  const nextCorner = {
    1: 2,
    3: 6,
    5: 8,
    7: 8,
  };
  const prevCorner = {
    1: 0,
    3: 0,
    5: 2,
    7: 6,
  };
  const check1 = nextCorner[side];
  const check2 = prevCorner[side];

  if (obj.board[check1] === null && obj.board[check2] === null) return true;
  else return false;
};

const checkNearestSideisEmpty = (corner) => {
  const nextSide = {
    0: 1,
    2: 1,
    6: 3,
    8: 5,
  };
  const prevSide = {
    0: 3,
    2: 5,
    6: 7,
    8: 7,
  };
  const check1 = nextSide[corner];
  const check2 = prevSide[corner];

  if (obj.board[check1] === null && obj.board[check2] === null) {
    return true;
  } else {
    return false;
  }
};

const getCornerWhichSideIsX = (corner, x) => {
  // done
  const nextCorner = {
    0: 2,
    2: 0,
    6: 0,
    8: 2,
  };
  const prevCorner = {
    0: 6,
    2: 8,
    6: 8,
    8: 6,
  };
  const check1 = nextCorner[corner];
  const check2 = prevCorner[corner];

  if (obj.board[check1] === null) {
    if (x === "empty") {
      if (checkNearestSideisEmpty(check1)) return check1;
      else return check2;
    } else {
      if (checkNearestSideisEmpty(check1)) return check2;
      else return check1;
    }
  }
};

//FUNCTION HARD
const hard = () => {
  // WHEN AI STARTING TURN 2nd
  // moveNumber by default value 0 user play 1st chance, moveNumber become 1
  if ((obj.moveNumber + 1) % 2 === 0) {
    medium();
  } else {
    // WHEN AI STARTING TURN 1st
    let index = -1;
    switch (obj.moveNumber) {
      case 0:
        index = getRandomEmptyCornerIndex();
        break;
      case 2:
        // if user click center
        if (obj.board[4] == "X") {
          const corner = obj.board.findIndex((val) => val === "✓");
          index = getOppositeCornerIndex[corner];
        }
        // if user click corner
        else if ([0, 2, 6, 8].some((val) => obj.board[val] === "X")) {
          const corner = obj.board.findIndex((val) => val === "✓");
          const index1 = getOppositeCornerIndex[corner];
          index = getNearestEmptyCornerIndex(index1);
        }
        // if user click nearSide of AI
        else if (1) {
          const x = [1, 3, 5, 7].find((val) => obj.board[val] === "X");
          // if user click _far_ AI side
          if (checkNearestCornerisEmpty(x)) {
            const corner = obj.board.findIndex((val) => val === "✓");
            index = getCornerWhichSideIsX(corner, "empty");
          } else {
            // if user click _near_ AI side
            const corner = obj.board.findIndex((val) => val === "✓");
            index = getCornerWhichSideIsX(corner, "notEmpty");
          }
        }
        break;
      // till correct
      case 4:
        const x = getWonIndex();
        if (x) {
          index = x;
          break;
        }
        // if user click any side when user 1st tick in center, corner
        if (obj.board[4] == "X" && checkAtleastOneValuePresentSides("X")) {
          index = -1;
        } else if (
          obj.board[4] == "X" &&
          checkAtleastOneValuePresentCorner("X")
        ) {
          index = getRandomEmptyCornerIndex();
        } else if (
          checkAtleastOneValuePresentCorner("X") &&
          checkAtleastOneValuePresentSides("X")
        ) {
          index = getRandomEmptyCornerIndex();
        } else {
          const arr = [0, 2, 6, 8].filter((val) => obj.board[val] === "✓");
          const index1 = getOppositeCornerIndex[arr[0]];
          const index2 = getOppositeCornerIndex[arr[1]];
          index = checkNearestSideisEmpty(index1) ? index1 : index2;
        }
        break;
      case 6:
        const y = getWonIndex();
        if (y) {
          index = y;
          break;
        }
        const z = preventFailureIndex();
        if (z) {
          index = z;
          break;
        }

        if (checkWinner()) {
        } else {
          const arr = [0, 2, 6, 8];
          const i = arr.reduce((count, value) => {
            if (obj.board[value] === null) {
              return count + 1;
            } else {
              return count;
            }
          }, 0);
          // 1 corner Null
          if (i == 1) {
            index = getRandomEmptyCornerIndex();
          } else {
            const arr = [0, 2, 6, 8].filter((val) => obj.board[val] === "✓");
            const index1 = getOppositeCornerIndex[arr[0]];
            const index2 = getOppositeCornerIndex[arr[1]];

            if (checkNearestSideisEmpty(index1)) {
              index = index1;
            } else {
              index = index2;
            }
          }
        }
        break;
      default:
        index = -1;
    }

    if (index === -1) {
      medium();
    } else {
      obj.board[index] = "✓";
      // ai chance completed
      if (checkWinner()) {
      } else {
        if (checkDraw()) {
        } else {
          changeMoveChances();
          changeMoveNumber();
        }
      }
    }
  }
};
