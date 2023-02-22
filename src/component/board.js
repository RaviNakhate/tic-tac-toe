import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Board() {
  const {
    state: {
      moveChances,
      moveNumber,
      board,
      mode,
      tempMode,
      multiplayer,
      tempMultiplayer,
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const tempChanges =
    mode == tempMode && multiplayer == tempMultiplayer ? false : true;

  useEffect(() => {
    // 2nd change starting
    if (moveNumber == 0) {
      if (moveChances == "✓" && !multiplayer) {
        dispatch({
          type: "aiMove",
        });
      }
    }
  }, [moveNumber]);

  const chancesPlayerTitleDisplay = () => {
    if (moveChances == "X") {
      return <i className="fa fa-times text-danger mt-2 mr-3 "></i>;
    }

    if (moveChances == "✓") {
      if (multiplayer) {
        return <i className="fa fa-check text-success mt-2 mr-3 "></i>;
      } else {
        return "AI ";
      }
    }
  };

  return (
    <>
      <div
        className="mainContain"
        style={tempChanges ? { pointerEvents: "none", opacity: "0.4" } : {}}
      >
        <div className="contain1 ">
          {board.map((val, ind) => {
            return (
              <div
                className={`cell 
                ${ind == 0 ? "border-top-0 border-left-0" : ""} 
                ${ind == 1 ? "border-top-0" : ""} 
                ${ind == 2 ? "border-top-0 border-right-0" : ""} 
                ${ind == 3 ? "border-left-0" : ""} 
                ${ind == 5 ? "border-right-0" : ""} 
                ${ind == 6 ? "border-bottom-0 border-left-0" : ""} 
                ${ind == 7 ? "border-bottom-0" : ""}
                ${ind == 8 ? "border-bottom-0 border-right-0" : ""}`}
                key={ind}
                id={ind}
                onClick={() => {
                  dispatch({
                    type: "move",
                    payload: { index: ind },
                  });
                }}
              >
                <i
                  className={
                    val === "X"
                      ? "fa fa-times text-danger"
                      : val === "✓"
                      ? "fa fa-check text-success"
                      : ""
                  }
                ></i>
              </div>
            );
          })}
        </div>

        <div className=" contain2 row turn mt-5 text-white justify-content-center">
          {chancesPlayerTitleDisplay()}
          will Turn
        </div>

        {/* <div className=" contain2 row turn mt-5 text-white justify-content-center">
          {multiplayer ? (
            player ? (
              "AI "
            ) : (
              <i className="fa fa-times text-danger mt-2 mr-3 "></i>
            )
          ) : player ? (
            <i className="fa fa-check text-success mt-2 mr-3 "></i>
          ) : (
            <i className="fa fa-times text-danger mt-2 mr-3 "></i>
          )}
          will Turn
        </div> */}
      </div>
    </>
  );
}
