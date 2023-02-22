import { Modal, Fade, Box, Backdrop } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

export default function Modals() {
  const {
    state: { modalBox, multiplayer, winner, moveChances },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const winnerIconDisplay = () => {
    if (winner == "X") {
      return <i className="fa fa-times text-danger mt-2 mr-3 "></i>;
    }

    if (winner == "✓") {
      if (multiplayer) {
        return (
          "You ", (<i className="fa fa-check text-success mt-2 mr-3 "></i>)
        );
      } else {
        return "AI ";
      }
    }
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalBox}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalBox}>
          <Box className="mode">
            <>
              <div className="reset text-white">
                <div className="row my-3 justify-content-center">
                  {winnerIconDisplay()}
                  won
                </div>
                <button
                  className="btn btn btn-primary px-5"
                  onClick={() => {
                    dispatch({
                      type: "modalBox",
                      payload: { modalBox: false },
                    });
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
