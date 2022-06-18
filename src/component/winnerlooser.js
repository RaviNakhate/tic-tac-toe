import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

export default function Winnerlooser() {
  const x = useSelector((state) => state);
  const obj = x.state.state;

  return (
    <>
      <div className="border rounded p-2">
        <i className="fa fa-times text-danger mr-2"></i> {obj.winnerLooser[0]}
        <i className="fa fa-bolt mx-3 text-warning"></i>
        {obj.mainMultiplayer == "off" ? (
          <i className=" fa fa-microchip mr-2 "></i>
        ) : (
          <i className=" fa fa-check  text-success mr-2"></i>
        )}
        {obj.winnerLooser[1]}
      </div>
    </>
  );
}
