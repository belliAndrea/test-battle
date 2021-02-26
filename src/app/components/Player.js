import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { usePlayer } from "../playerContex";
import Dices from "./Dices";
import playerIdle from "../../assets/player_idle.gif";
import playerHit from "../../assets/player_hit.gif";
import monsterIdle from "../../assets/blanka_idle.gif";
import monsterHit from "../../assets/blanka_hit.gif";
import { useSelector } from "react-redux";
import { lastHitSelector } from "../redux/gameSlice";

const Container = styled.div`
  flex: 5;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Sprite = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
`;

const SpriteImg = styled.img`
  height: 400px;
`;

const PlayerLayout = ({ children }) => {
  const player = usePlayer();

  return (
    <>
      {children[player === "The Monster" ? 1 : 0]}
      {children[player === "The Monster" ? 0 : 1]}
    </>
  );
};

function Player() {
  const player = usePlayer();
  const [hitAnimation, setHitAnimation] = useState(false);
  const hit = useSelector(lastHitSelector);

  const isThePlayer = useMemo(() => {
    return player === "The Player";
  }, [player]);

  useEffect(() => {
    let timer;
    if (hit?.[player] === null) {
      setHitAnimation(true);
      timer = setTimeout(() => setHitAnimation(false), 1700);
    }
    return () => {
      setHitAnimation(false);
      if (timer) clearTimeout(timer);
    };
  }, [hit, player]);

  return (
    <Container>
      <PlayerLayout>
        <Sprite>
          {hitAnimation ? (
            <SpriteImg
              src={isThePlayer ? playerHit : monsterHit}
              alt={player}
            />
          ) : (
            <SpriteImg
              src={isThePlayer ? playerIdle : monsterIdle}
              alt={player}
            />
          )}
        </Sprite>
        <Dices />
      </PlayerLayout>
    </Container>
  );
}

export default Player;
