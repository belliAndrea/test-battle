import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { usePlayer } from "../playerContex";
import Dices from "./Dices";
import playerIdle from "../../assets/player_idle.gif";
import playerHit from "../../assets/player_hit.gif";
import monsterIdle from "../../assets/blanka_idle.gif";
import monsterHit from "../../assets/blanka_hit.gif";
import { useSelector } from "react-redux";
import { SwitchLayout } from './SwitchLayout'
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
      <SwitchLayout>
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
      </SwitchLayout>
    </Container>
  );
}

export default Player;
