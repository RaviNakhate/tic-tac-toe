import { obj } from "./data.js";

export const state = (state = obj, action) => {
  switch (action.type) {
    case "check":
      if (obj.mainMultiplayer == "on") {
        if (typeof obj.ttt[action.payload.ind] === "number") {
          if (obj.player) {
            obj.ttt[action.payload.ind] = "fa fa-check text-success";
          } else {
            obj.ttt[action.payload.ind] = "fa fa-times text-danger";
          }
          obj.player = !obj.player;
          checkWin();
          checkDraw();
        }
      } else {
        if (
          typeof obj.ttt[action.payload.ind] === "number" &&
          obj.player == 0
        ) {
          obj.ttt[action.payload.ind] = "fa fa-times text-danger";

          obj.player = !obj.player;
          obj.chanceNum = obj.chanceNum + 1;
          checkWin();
          checkDraw();
        }
      }
      return { ...state };

    case "aiChance":
      if (obj.mainMultiplayer == "off" && obj.player == 1) {
        aiMachine();
        obj.player = !obj.player;
        obj.chanceNum = obj.chanceNum + 1;
        if (obj.modalBox == false) {
          checkWin();
          checkDraw();
        }
      }
      return { ...state };
    case "modalBox":
      restartGame();
      obj.modalBox = false;
      return { ...state };
    case "switchMultiplayer":
      obj.multiplayer = action.payload;
      return { ...state };
    case "switchMode":
      obj.mode = action.payload;
      return { ...state };
    case "switchSetting":
      obj.player = !obj.player;
      swtichSetting();
      return { ...state };
    default:
      return { state };
  }
};

//
//
//
//
// Functions...
//
//
//
//

const checkWin = () => {
  obj.won.map((val) => {
    if (
      obj.ttt[val[0]] == obj.ttt[val[1]] &&
      obj.ttt[val[1]] == obj.ttt[val[2]]
    ) {
      obj.winPlayer = obj.ttt[val[0]];
      obj.modalBox = true;
      obj.winPlayer == "fa fa-times text-danger"
        ? (obj.winnerLooser[0] = obj.winnerLooser[0] + 1)
        : (obj.winnerLooser[1] = obj.winnerLooser[1] + 1);
    }
  });
};

const checkDraw = () => {
  const indexEmpty =
    obj.ttt.includes(0) ||
    obj.ttt.includes(1) ||
    obj.ttt.includes(2) ||
    obj.ttt.includes(3) ||
    obj.ttt.includes(4) ||
    obj.ttt.includes(5) ||
    obj.ttt.includes(6) ||
    obj.ttt.includes(7) ||
    obj.ttt.includes(8);
  if (obj.modalBox == false) {
    if (indexEmpty == false) {
      restartGame();
    }
  }
};

const restartGame = () => {
  obj.ttt = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  obj.chanceNum = 0;
};

const swtichSetting = () => {
  obj.mainMultiplayer = obj.multiplayer;
  obj.mainMode = obj.mode;
  restartGame();
  obj.modalBox = false;
  obj.winnerLooser = [0, 0];
};

const getRandom = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return randomIndex;
};

const aiMachine = () => {
  if (obj.mainMultiplayer == "off" && obj.modalBox == false) {
    if (obj.mainMode == "easy") {
      const arr = obj.ttt.filter((val, ind) => {
        if (typeof val == "number") {
          return true;
        }
      });
      const randomIndex = getRandom(arr);
      const randomNum = arr[randomIndex];
      obj.ttt[randomNum] = "fa fa-check text-success";
    } else if (obj.mainMode == "hard") {
      hard();
    } else if (obj.mainMode == "medium") {
      medium();
    }
  }
};

//
//
//
//
// FUNCTION FOR MODE
//
//
//

const fightDanger = () => {
  let nextMove;
  obj.won.map((val) => {
    if (obj.ttt[val[0]] == obj.ttt[val[2]]) {
      if ("number" == typeof obj.ttt[val[1]]) {
        nextMove = val[1];
      }
    }
    if (obj.ttt[val[1]] == obj.ttt[val[2]]) {
      if ("number" == typeof obj.ttt[val[0]]) {
        nextMove = val[0];
      }
    }
    if (obj.ttt[val[0]] == obj.ttt[val[1]]) {
      if ("number" == typeof obj.ttt[val[2]]) {
        nextMove = val[2];
      }
    }
  });
  obj.ttt[nextMove] = "fa fa-check text-success";
  return nextMove;
};

const wonSuccess = () => {
  let nextMove;
  obj.won.map((val) => {
    if (
      obj.ttt[val[0]] == "fa fa-check text-success" ||
      obj.ttt[val[1]] == "fa fa-check text-success" ||
      obj.ttt[val[2]] == "fa fa-check text-success"
    ) {
      if (obj.ttt[val[0]] == obj.ttt[val[2]]) {
        if ("number" == typeof obj.ttt[val[1]]) {
          nextMove = val[1];
        }
      }
      if (obj.ttt[val[1]] == obj.ttt[val[2]]) {
        if ("number" == typeof obj.ttt[val[0]]) {
          nextMove = val[0];
        }
      }
      if (obj.ttt[val[0]] == obj.ttt[val[1]]) {
        if ("number" == typeof obj.ttt[val[2]]) {
          nextMove = val[2];
        }
      }
    }
  });
  obj.ttt[nextMove] = "fa fa-check text-success";
  return nextMove;
};

const randomCorner = () => {
  let nextMove;
  if (obj.ttt[0] == 0) {
    nextMove = 0;
  }
  if (obj.ttt[2] == 2) {
    nextMove = 2;
  }
  if (obj.ttt[6] == 6) {
    nextMove = 6;
  }
  if (obj.ttt[8] == 8) {
    nextMove = 8;
  }
  obj.ttt[nextMove] = "fa fa-check text-success";
};

const randomEmpty = () => {
  const nextMove = obj.ttt.findIndex((val) => {
    if ("number" == typeof val) {
      return true;
    }
  });
  obj.ttt[nextMove] = "fa fa-check text-success";
};

//
//
//
//
// FUNCTION MEDIUM
//
//
//
//
const medium = () => {
  const x = wonSuccess();
  if (x == undefined) {
    const y = fightDanger();
    if (y == undefined) {
      randomEmpty();
    }
  }
  return true;
};

//
//
//
//
// FUNCTION HARD
//
//
//
//
const hard = () => {
  /* WHEN AI 2ND CHANCE */
  if (
    obj.chanceNum == 1 ||
    obj.chanceNum == 3 ||
    obj.chanceNum == 5 ||
    obj.chanceNum == 7
  ) {
    const x = wonSuccess();
    if (x == undefined) {
      const y = fightDanger();
      if (y == undefined) {
        randomEmpty();
      }
    }
    return true;
  }

  /* WHEN AI 1ST CHANCE */
  // chance 1st random (corner)
  if (obj.chanceNum == 0) {
    const arr = [0, 2, 6, 8, 4];
    const x = getRandom(arr);
    obj.ttt[arr[x]] = "fa fa-check text-success";
    return true;
  }

  // chance 2nd when side (for_Center)
  if (obj.chanceNum == 2 && obj.ttt[4] == "fa fa-check text-success") {
    if (obj.ttt[1] == "fa fa-times text-danger") {
      const arr = [0, 2];
      const x = getRandom(arr);
      obj.ttt[arr[x]] = "fa fa-check text-success";
      return true;
    }
    if (obj.ttt[3] == "fa fa-times text-danger") {
      const arr = [0, 6];
      const x = getRandom(arr);
      obj.ttt[arr[x]] = "fa fa-check text-success";
      return true;
    }

    if (obj.ttt[5] == "fa fa-times text-danger") {
      const arr = [2, 8];
      const x = getRandom(arr);
      obj.ttt[arr[x]] = "fa fa-check text-success";
      return true;
    }
    if (obj.ttt[7] == "fa fa-times text-danger") {
      const arr = [6, 8];
      const x = getRandom(arr);
      obj.ttt[arr[x]] = "fa fa-check text-success";
      return true;
    }
  }
  // chance 2nd when center
  if (obj.chanceNum == 2 && obj.ttt[4] == "fa fa-times text-danger") {
    const x = obj.ttt.findIndex((val) => {
      if (val == "fa fa-check text-success") {
        return true;
      }
    });

    switch (x) {
      case 0:
        obj.ttt[8] = "fa fa-check text-success";
        break;
      case 8:
        obj.ttt[0] = "fa fa-check text-success";
        break;
      case 6:
        obj.ttt[2] = "fa fa-check text-success";
        break;
      case 2:
        obj.ttt[6] = "fa fa-check text-success";
        break;
    }
    return true;
  }
  //chance 2 when corner
  if (
    obj.chanceNum == 2 &&
    (obj.ttt[0] == "fa fa-times text-danger" ||
      obj.ttt[2] == "fa fa-times text-danger" ||
      obj.ttt[6] == "fa fa-times text-danger" ||
      obj.ttt[8] == "fa fa-times text-danger")
  ) {
    randomCorner();
    return true;
  }
  //chance 2 when nearSide
  if (obj.chanceNum == 2) {
    if (obj.ttt[0] == "fa fa-check text-success") {
      if (obj.ttt[1] == "fa fa-times text-danger") {
        obj.ttt[6] = "fa fa-check text-success";
        return true;
      }
      if (obj.ttt[3] == "fa fa-times text-danger") {
        obj.ttt[2] = "fa fa-check text-success";
        return true;
      }
    }
    if (obj.ttt[6] == "fa fa-check text-success") {
      if (obj.ttt[3] == "fa fa-times text-danger") {
        obj.ttt[8] = "fa fa-check text-success";
        return true;
      }
      if (obj.ttt[7] == "fa fa-times text-danger") {
        obj.ttt[0] = "fa fa-check text-success";
        return true;
      }
    }
    if (obj.ttt[8] == "fa fa-check text-success") {
      if (obj.ttt[7] == "fa fa-times text-danger") {
        obj.ttt[2] = "fa fa-check text-success";
        return true;
      }
      if (obj.ttt[5] == "fa fa-times text-danger") {
        obj.ttt[6] = "fa fa-check text-success";
        return true;
      }
    }
    if (obj.ttt[2] == "fa fa-check text-success") {
      if (obj.ttt[1] == "fa fa-times text-danger") {
        obj.ttt[8] = "fa fa-check text-success";
        return true;
      }
      if (obj.ttt[5] == "fa fa-times text-danger") {
        obj.ttt[0] = "fa fa-check text-success";
        return true;
      }
    }
  }
  if (obj.chanceNum == 2) {
    if (
      obj.ttt[0] == "fa fa-check text-success" &&
      obj.ttt[5] == "fa fa-times text-danger"
    ) {
      obj.ttt[6] = "fa fa-check text-success";
      return true;
    }
    if (
      obj.ttt[0] == "fa fa-check text-success" &&
      obj.ttt[7] == "fa fa-times text-danger"
    ) {
      obj.ttt[2] = "fa fa-check text-success";
      return true;
    }
    if (
      obj.ttt[6] == "fa fa-check text-success" &&
      obj.ttt[5] == "fa fa-times text-danger"
    ) {
      obj.ttt[0] = "fa fa-check text-success";
      return true;
    }
    if (
      obj.ttt[6] == "fa fa-check text-success" &&
      obj.ttt[1] == "fa fa-times text-danger"
    ) {
      obj.ttt[8] = "fa fa-check text-success";
      return true;
    }
    if (
      obj.ttt[2] == "fa fa-check text-success" &&
      obj.ttt[3] == "fa fa-times text-danger"
    ) {
      obj.ttt[8] = "fa fa-check text-success";
      return true;
    }
    if (
      obj.ttt[2] == "fa fa-check text-success" &&
      obj.ttt[7] == "fa fa-times text-danger"
    ) {
      obj.ttt[0] = "fa fa-check text-success";
      return true;
    }
    if (
      obj.ttt[8] == "fa fa-check text-success" &&
      obj.ttt[3] == "fa fa-times text-danger"
    ) {
      obj.ttt[2] = "fa fa-check text-success";
      return true;
    }
    if (
      obj.ttt[8] == "fa fa-check text-success" &&
      obj.ttt[1] == "fa fa-times text-danger"
    ) {
      obj.ttt[6] = "fa fa-check text-success";
      return true;
    }
  } else {
    const x = wonSuccess();
    if (x == undefined) {
      const y = fightDanger();
      if (y == undefined) {
        randomEmpty();
      }
    }
    return true;
  }

  //chance 3 (corner)
  if (obj.chanceNum == 4) {
    if (
      (obj.ttt[0] == "fa fa-check text-success" &&
        obj.ttt[1] == "fa fa-times text-danger" &&
        obj.ttt[2] == "fa fa-check text-success") ||
      (obj.ttt[0] == "fa fa-check text-success" &&
        obj.ttt[3] == "fa fa-times text-danger" &&
        obj.ttt[6] == "fa fa-check text-success") ||
      (obj.ttt[6] == "fa fa-check text-success" &&
        obj.ttt[7] == "fa fa-times text-danger" &&
        obj.ttt[8] == "fa fa-check text-success") ||
      (obj.ttt[8] == "fa fa-check text-success" &&
        obj.ttt[5] == "fa fa-times text-danger" &&
        obj.ttt[2] == "fa fa-check text-success")
    ) {
      obj.ttt[4] = "fa fa-check text-success";
      return true;
    }
  }
  // chance 3 (center)
  if (obj.chanceNum == 4 && obj.ttt[4] == "fa fa-times text-danger") {
    if (obj.ttt[0] == "fa fa-times text-danger") {
      obj.ttt[8] = "fa fa-check text-success";
      return true;
    }
    if (obj.ttt[2] == "fa fa-times text-danger") {
      obj.ttt[6] = "fa fa-check text-success";
      return true;
    }
    if (obj.ttt[6] == "fa fa-times text-danger") {
      obj.ttt[2] = "fa fa-check text-success";
      return true;
    }
    if (obj.ttt[8] == "fa fa-times text-danger") {
      obj.ttt[0] = "fa fa-check text-success";
      return true;
    }
    if (
      obj.ttt[1] == "fa fa-times text-danger" ||
      obj.ttt[3] == "fa fa-times text-danger" ||
      obj.ttt[5] == "fa fa-times text-danger" ||
      obj.ttt[7] == "fa fa-times text-danger"
    ) {
      fightDanger();
      return true;
    }
  }
  // chance 4  (center) (corner)
  // chance 5  (center) (corner)
  if (obj.chanceNum == 6 || obj.chanceNum == 8) {
    const x = wonSuccess();
    if (x == undefined) {
      const y = fightDanger();
      if (y == undefined) {
        if (obj.chanceNum == 8) {
          randomEmpty();
        }
      }
    }
    return true;
  }
};
