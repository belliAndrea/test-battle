import { useSelector } from "react-redux";
import { isRollingSelector } from "../redux/gameSlice";

const IsRolling = ({ children }) => {
  const isRolling = useSelector(isRollingSelector);
  return children(isRolling);
};

export default IsRolling;
