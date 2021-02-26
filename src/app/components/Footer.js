import React from "react";
import IsRolling from "./IsRolling";
import styled from "styled-components";

const Button = styled.button`
  padding: 0.7em 1.7em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.2em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 400;
  font-size: 32px;
  color: #ffffff;
  background-color: red;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
    inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
    inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
  text-align: center;
  position: relative;

  &&:disabled {
    opacity: .5
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Footer({ winner, onAttack, onRestart }) {
  return (
    <Container>
      <IsRolling>
        {(isRolling) => (
          <Button disabled={isRolling} onClick={winner ? onRestart : onAttack}>
            {winner ? "RESTART" : "ATTACK!"}
          </Button>
        )}
      </IsRolling>
    </Container>
  );
}

export default Footer;
