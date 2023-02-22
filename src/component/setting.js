import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Setting() {
  const {
    state: { mode, tempMode, multiplayer, tempMultiplayer },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeSettings = () => {
    dispatch({
      type: "changeSettings",
      payload: null,
    });
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
            disabled={tempMultiplayer ? true : false}
          >
            <Button
              variant={tempMode === "easy" ? "contained" : "outlined"}
              onClick={() => {
                dispatch({
                  type: "tempModeChanges",
                  payload: { tempMode: "easy" },
                });
              }}
            >
              Easy
            </Button>
            <Button
              variant={tempMode === "medium" ? "contained" : "outlined"}
              onClick={() => {
                dispatch({
                  type: "tempModeChanges",
                  payload: { tempMode: "medium" },
                });
              }}
            >
              Medium
            </Button>
            <Button
              variant={tempMode === "hard" ? "contained" : "outlined"}
              onClick={() => {
                dispatch({
                  type: "tempModeChanges",
                  payload: { tempMode: "hard" },
                });
              }}
            >
              Hard
            </Button>
          </ButtonGroup>
        </div>

        <div className="row justify-content-center  my-3">
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button
              variant={tempMultiplayer ? "outlined" : "contained"}
              onClick={() => {
                dispatch({
                  type: "tempMultiplayerChanges",
                  payload: { tempMultiplayer: false },
                });
              }}
            >
              Single Player
            </Button>
            <Button
              variant={tempMultiplayer ? "contained" : "outlined"}
              onClick={() => {
                dispatch({
                  type: "tempMultiplayerChanges",
                  payload: { tempMultiplayer: true },
                });
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
              dispatch({ type: "changeSettings", payload: null });
            }}
          >
            start
          </button>
        </div>
      </form>
    </>
  );
}
