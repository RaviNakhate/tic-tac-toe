import React from "react";

export default function Footer() {
  return (
    <>
      <div className="container my-4">
        <footer className="text-center text-white">
          <div
            className="row justify-content-around p-3"
            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          >
            <a href="https://www.instagram.com/ravi_nakhate_/" target="_blank">
              <i className="fa fa-instagram"></i>
            </a>

            <a href="https://github.com/RaviNakhate" target="_blank">
              <i className="fa fa-github"></i>
            </a>
            <a
              href="https://twitter.com/RaviNakhate2?t=mbn2hpUjncbMBMd_BxPTeg&s=09"
              target="_blank"
            >
              <i className="fa fa-twitter "></i>
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
