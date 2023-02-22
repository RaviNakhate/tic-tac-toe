import React from "react";
import "./App.css";
import Board from "./board";
import Setting from "./setting";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Modals from "./modals.js";

export default function App() {
  const {
    state: { score, multiplayer },
  } = useSelector((state) => state);

  const scoreDisplay = () => {
    return (
      <>
        <div className="border rounded p-2">
          <i className="fa fa-times text-danger mr-2"></i> {score[0]}
          <i className="fa fa-bolt mx-3 text-warning"></i>
          {multiplayer ? (
            <i className=" fa fa-microchip mr-2 "></i>
          ) : (
            <i className=" fa fa-check  text-success mr-2"></i>
          )}
          {score[1]}
        </div>
      </>
    );
  };
  return (
    <>
      <Modals />
      <div className="container-fluid ">
        <div className="container1 ">{scoreDisplay()}</div>
        <div className="container2 ">
          <div className="tank1 ">
            <Board />
          </div>
          <div className="tank2 ">
            <Setting />
          </div>
        </div>
      </div>
    </>
  );
}
