import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { currentLifeSelector, lastHitSelector } from "../redux/gameSlice";
import { usePlayer } from "../playerContex";
import { SwitchLayout } from './SwitchLayout'

const PlayerName = styled.div`
  color: white;
  font-size: 4rem;
`

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  progress[value] {
    /* Reset the default appearance */
    -webkit-appearance: none;
    appearance: none;

    width: 250px;
    height: 20px;
  }
`;

const LastRollOutcome = styled.span`
  position: absolute;
  font-size: 12rem;
  ${({ position }) => `${position}: 0`}
  color: white;
  transition: opacity 0.2s ease-out;
  opacity: 0
    ${(props) =>
    props.show &&
    css`
        opacity: 1;
      `};
`;


const Hit = styled.span`
      color: red
`

function Lifebar() {
  const player = usePlayer();
  const [showOutcome, setShowOutcome] = useState(false);
  const lastHit = useSelector(lastHitSelector);
  const life = useSelector(currentLifeSelector)(player);

  useEffect(() => {
    let timer;
    const lastOutcome = lastHit?.[player]
    if (![undefined, null].includes(lastOutcome)) {
      setShowOutcome(true);
      timer = setTimeout(() => setShowOutcome(false), 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [lastHit, player]);

  const hit = lastHit?.[player]
  const isEven = hit === 0

  return (
    <Container>
      <SwitchLayout>
        <PlayerName>{player}</PlayerName>
        <>
          <progress value={life} max="100" />
          <LastRollOutcome
            position={player === 'The Player' ? 'right' : 'left'}
            show={showOutcome}
          >{isEven ? 'Even!' : <Hit color="red">- {hit}</Hit>}</LastRollOutcome>
        </>
      </SwitchLayout>
    </Container>
  );
}

export default Lifebar;
