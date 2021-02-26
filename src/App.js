import React, { useCallback } from "react";
import GridLayout from "./app/components/GridLayout";
import styled from "styled-components";
import Lifebar from "./app/components/Lifebar";
import Player from "./app/components/Player";
import { PlayerProvider } from "./app/playerContex";
import { useDispatch, useSelector } from "react-redux";
import gameSlice, { winnerSelector } from "./app/redux/gameSlice";
import background from "./assets/background.jpg";
import Footer from "./app/components/Footer";
import { EndGame } from './app/components/EndGame';

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
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

const gamers = ["The Player", "The Monster"];

const getRandomValue = () => Math.round(Math.random() * Math.floor(5)) + 1;

const wait = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds));
};

function App() {
  const dispatch = useDispatch();
  const winner = useSelector(winnerSelector);

  const handleAttack = useCallback(async () => {
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
  }, [dispatch]);

  const handleRestart = useCallback(
    () => dispatch(gameSlice.actions.restart()),
    [dispatch]
  );
  return (
    <GridLayout>
      <TitleContainer>
        <Title>Street Fighter</Title>
      </TitleContainer>
      {winner && <EndGame winner={winner} />}
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
      <Footer
        winner={winner}
        onAttack={handleAttack}
        onRestart={handleRestart}
      />
    </GridLayout>
  );
}

export default App;
