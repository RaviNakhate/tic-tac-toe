import { Modal, Fade, Box, Backdrop } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

export default function Modals() {
  const x = useSelector((state) => state);
  const obj = x.state.state;
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={obj.modalBox}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={obj.modalBox}>
          <Box className="mode">
            <>
              <div className="reset text-white">
                <div className="row my-3 justify-content-center">
                  {obj.mainMultiplayer == "off" ? (
                    obj.winPlayer === "fa fa-times text-danger" ? (
                      <>
                        <i className="fa fa-times mt-2 mr-3 text-danger"></i>
                        You{" "}
                      </>
                    ) : (
                      <>
                        <i className="fa fa-microchip my-auto mr-3"></i>
                        {"Ai is "}
                      </>
                    )
                  ) : obj.winPlayer === "fa fa-times text-danger" ? (
                    <>
                      <i className="fa fa-times mt-2 mr-3 text-danger"></i>
                      {"is "}
                    </>
                  ) : (
                    <>
                      <i className="fa fa-check text-success mt-2 mr-3 "></i>
                      {"is "}
                    </>
                  )}
                  won
                </div>
                <button
                  className="btn btn btn-primary px-5"
                  onClick={() => {
                    dispatch({ type: "modalBox" });
                  }}
                >
                  OK
                </button>
              </div>
            </>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
