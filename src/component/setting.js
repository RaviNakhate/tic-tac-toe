import { Button, ButtonGroup } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

export default function Setting() {
  const x = useSelector((state) => state);
  const obj = x.state.state;
  const dispatch = useDispatch();

  const filter = (type, val) => {
    switch (type) {
      case "checkMultiplayer":
        if (obj.multiplayer == val) {
          return "contained";
        } else {
          return "outlined";
        }

      case "checkMode":
        if (obj.mode == val) {
          return "contained";
        } else {
          return "outlined";
        }
    }
  };

  const switchMultiplayer = (val) => {
    dispatch({ type: "switchMultiplayer", payload: val });
  };

  const switchMode = (val) => {
    dispatch({ type: "switchMode", payload: val });
  };

  const switchSetting = () => {
    dispatch({ type: "switchSetting" });
  };

  return (
    <>
      <form
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="row justify-content-center  my-3">
          <ButtonGroup
            size="small"
            aria-label="small outlined button group"
            disabled={obj.multiplayer == "on" ? true : false}
          >
            <Button
              variant={filter("checkMode", "easy")}
              onClick={() => {
                switchMode("easy");
              }}
            >
              Easy
            </Button>
            <Button
              variant={filter("checkMode", "medium")}
              onClick={() => {
                switchMode("medium");
              }}
            >
              Medium
            </Button>
            <Button
              variant={filter("checkMode", "hard")}
              onClick={() => {
                switchMode("hard");
              }}
            >
              Hard
            </Button>
          </ButtonGroup>
        </div>

        <div className="row justify-content-center  my-3">
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button
              variant={filter("checkMultiplayer", "off")}
              onClick={() => {
                switchMultiplayer("off");
              }}
            >
              Single Player
            </Button>
            <Button
              variant={filter("checkMultiplayer", "on")}
              onClick={() => {
                switchMultiplayer("on");
              }}
            >
              Multiplayer
            </Button>
          </ButtonGroup>
        </div>

        <div className="row justify-content-center  my-3">
          <button
            className="btn btn-sm btn-primary px-3"
            onClick={() => {
              switchSetting();
            }}
          >
            start
          </button>
        </div>
      </form>
    </>
  );
}
