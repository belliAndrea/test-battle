import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { currentLifeSelector, lastHitSelector } from "../redux/gameSlice";
import { usePlayer } from "../playerContex";

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
  right: 0;
  color: white;
  transition: opacity 0.2s ease-out;
  opacity: 0
    ${(props) =>
    props.show &&
    css`
        opacity: 1;
      `};
`;

function Lifebar() {
  const player = usePlayer();
  const [showOutcome, setShowOutcome] = useState(false);
  const lastHit = useSelector(lastHitSelector);
  const life = useSelector(currentLifeSelector)(player);

  useEffect(() => {
    let timer;
    const lastOutcome = lastHit?.[player]
    if (lastOutcome) {
      setShowOutcome(true);
      timer = setTimeout(() => setShowOutcome(false), 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [lastHit, player]);

  return (
    <Container>
      <h1 style={{ color: "white" }}>{player}</h1>{" "}
      <progress value={life} max="100" />
      <LastRollOutcome show={showOutcome}>- {lastHit?.[player]}</LastRollOutcome>
    </Container>
  );
}

export default Lifebar;
