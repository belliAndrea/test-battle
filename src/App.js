import React from "react";
import GridLayout from "./app/components/GridLayout";
import styled from "styled-components";
import Lifebar from "./app/components/Lifebar";
import Player from "./app/components/Player";
import { PlayerProvider } from "./app/playerContex";
import { useDispatch, useSelector } from "react-redux";
import gameSlice, { winnerSelector } from "./app/redux/gameSlice";
import IsRolling from "./app/components/IsRolling";
import background from "./assets/background.jpg";

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

const Board = styled.div`
  flex: 5;
  display: flex;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-color: black;
  width: 100%;
  max-width: 1792px;
`;

const Side = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 20px;
`;

const Footer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const gamers = ["The Player", "The Monster"];

const getRandomValue = () => Math.round(Math.random() * Math.floor(5)) + 1;

const wait = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds));
};

function App() {
  const dispatch = useDispatch();
  const winner = useSelector(winnerSelector);
  const handleAttack = async () => {
    dispatch(gameSlice.actions.roll());

    // simulating the roll of the dices
    await wait(1000);

    const roll = gamers.reduce((acc, item) => {
      return {
        ...acc,
        [item]: [getRandomValue(), getRandomValue()],
      };
    }, {});

    dispatch(gameSlice.actions.rolled(roll));
  };

  const handleRestart = () => dispatch(gameSlice.actions.restart());
  return (
    <GridLayout>
      <TitleContainer>
        <Title>Street Fighter</Title>
      </TitleContainer>
      {winner && <h1> THE WINNER IS {winner} </h1>}
      {!winner && (
        <Board>
          {gamers.map((item) => (
            <PlayerProvider value={item} key={item}>
              <Side>
                <Lifebar />
                <Player />
              </Side>
            </PlayerProvider>
          ))}
        </Board>
      )}
      <Footer>
        <IsRolling>
          {(isRolling) => (
            <Button
              disabled={isRolling}
              onClick={winner ? handleRestart : handleAttack}
            >
              {winner ? "RESTART" : "ATTACK!"}
            </Button>
          )}
        </IsRolling>
      </Footer>
    </GridLayout>
  );
}

export default App;
