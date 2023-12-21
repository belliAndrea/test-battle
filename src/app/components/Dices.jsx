import { useSelector } from "react-redux";
import styled from "styled-components";
import { lastRollSelector } from "../redux/gameSlice";
import { usePlayer } from "../playerContex";
import IsRolling from "./IsRolling";

const Container = styled.div`
  flex: 1;
  min-width: 200px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const Dice = styled.div`
  width: 100px;
  height: 100px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
`;

const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function Dices() {
  const player = usePlayer();
  const lastRoll = useSelector(lastRollSelector)(player);

  const [dice1, dice2] = lastRoll || [];

  return (
    <Container>
      {lastRoll && (
        <IsRolling>
          {(isRolling) => (
            <>
              <Dice>{!isRolling && diceFaces[dice1 - 1]}</Dice>
              <Dice>{!isRolling && diceFaces[dice2 - 1]}</Dice>
            </>
          )}
        </IsRolling>
      )}
    </Container>
  );
}

export default Dices;
