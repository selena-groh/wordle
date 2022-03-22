import "./Letter.scss";
import cx from "classnames";
import { ABSENT, WRONG_PLACE, CORRECT, UNCHECKED } from "./constants";

const Letter = ({ children, status }) => {
  return (
    <div
      className={cx("Letter", {
        "Letter--unchecked": status === UNCHECKED,
        "Letter--absent": status === ABSENT,
        "Letter--wrongPlace": status === WRONG_PLACE,
        "Letter--correct": status === CORRECT
      })}
    >
      {children}
    </div>
  );
};

export default Letter;
