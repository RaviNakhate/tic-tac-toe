import { useSelector, useDispatch } from "react-redux";
import Modals from "./modals.js";

export default function Playgame() {
  const x = useSelector((state) => state);
  const obj = x.state.state;
  const dispatch = useDispatch();

  document.onkeypress = (e) => {
    let key = e.keyCode;
    if (obj.modalBox == false) {
      if (key >= 49 && key <= 57) {
        switch (key) {
          case 49:
            key = 6;
            break;
          case 50:
            key = 7;
            break;
          case 51:
            key = 8;
            break;
          case 52:
            key = 3;
            break;
          case 53:
            key = 4;
            break;
          case 54:
            key = 5;
            break;
          case 55:
            key = 0;
            break;
          case 56:
            key = 1;
            break;
          case 57:
            key = 2;
            break;
        }
        dispatch({
          type: "check",
          payload: { ind: key },
        });
      }
    } else {
      if (key == 13) {
        dispatch({ type: "modalBox" });
      }
    }
  };

  {
    if (obj.player == 1) {
      setTimeout(() => {
        dispatch({
          type: "aiChance",
        });
      }, 1000);
    }
  }
  return (
    <>
      <Modals />
      <div
        className="mainContain "
        style={
          !(obj.mainMultiplayer == obj.multiplayer && obj.mainMode == obj.mode)
            ? { pointerEvents: "none", opacity: "0.4" }
            : {}
        }
      >
        <div className="contain1 ">
          {obj.ttt.map((val, ind) => {
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
                onClick={() => {
                  dispatch({
                    type: "check",
                    payload: { ind: ind },
                  });
                }}
              >
                <i className={val}></i>
              </div>
            );
          })}
        </div>

        <div className=" contain2 row turn mt-5 text-white justify-content-center">
          {obj.mainMultiplayer == "off" ? (
            obj.player ? (
              "AI "
            ) : (
              <i className="fa fa-times text-danger mt-2 mr-3 "></i>
            )
          ) : obj.player ? (
            <i className="fa fa-check text-success mt-2 mr-3 "></i>
          ) : (
            <i className="fa fa-times text-danger mt-2 mr-3 "></i>
          )}
          will Turn
        </div>
      </div>
    </>
  );
}
