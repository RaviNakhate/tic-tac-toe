import React from "react";
import "./App.css";
import Winnerlooser from "./winnerlooser";
import Playgame from "./playgame";
import Setting from "./setting";
import Footer from "./footer";

export default function App() {
  return (
    <>
      <div className="container-fluid ">
        <div className="container1 ">
          <Winnerlooser />
        </div>
        <div className="container2 ">
          <div className="tank1 ">
            <Playgame />
          </div>
          <div className="tank2 ">
            <Setting />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
