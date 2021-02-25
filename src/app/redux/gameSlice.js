import { createSelector, createSlice } from "@reduxjs/toolkit";

export const ROLL_STATES = {
  initial: "initial",
  pending: "pending",
  rolled: "rolled",
};

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    rolls: [],
    rollState: ROLL_STATES.initial,
  },
  reducers: {
    roll: (draft) => {
      draft.rollState = ROLL_STATES.pending;
    },
    rolled: (draft, { payload }) => {
      draft.rolls.unshift(payload);
      draft.rollState = ROLL_STATES.rolled;
    },
    restart: (draft) => {
      draft.rolls = [];
      draft.rollState = ROLL_STATES.initial;
    },
  },
});

const rootSelector = (state) => state[gameSlice.name];

const checkRollOutcome = (roll) => {
  const [[playerKey, playerRoll], [monsterKey, monsterRoll]] = Object.entries(
    roll
  );

  const playerSum = playerRoll.reduce((a, b) => a + b, 0);
  const monsterSum = monsterRoll.reduce((a, b) => a + b, 0);

  const even = monsterSum === playerSum;
  const monsterWin = monsterSum > playerSum;

  if (even) {
    return {
      [playerKey]: 0,
      [monsterKey]: 0,
    };
  }

  return {
    [playerKey]: monsterWin ? monsterSum - playerSum : null,
    [monsterKey]: monsterWin ? null : playerSum - monsterSum,
  };
};

const rollStateSelector = createSelector(
  rootSelector,
  (state) => state.rollState
);
const rollsSelector = createSelector(rootSelector, (state) => state.rolls);

export const isRollingSelector = createSelector(
  rollStateSelector,
  (rollState) => rollState === ROLL_STATES.pending
);

export const lastRollSelector = createSelector(
  rollsSelector,
  (rolls) => (player) => {
    const [lastRoll] = rolls;
    if (!lastRoll) return null;
    return lastRoll[player];
  }
);

export const lastHitSelector = createSelector(rollsSelector, (rolls) => {
  const [lastRoll] = rolls;
  if (!lastRoll) return null;
  return checkRollOutcome(lastRoll);
});

export const currentLifeSelector = createSelector(
  rollsSelector,
  (rolls) => (player) => {
    if (!rolls.length) return 100;
    return rolls.reduce((acc, roll) => {
      const outcome = checkRollOutcome(roll);
      const playerOutcome = outcome[player];
      return playerOutcome ? acc - playerOutcome : acc;
    }, 100);
  }
);

export const winnerSelector = createSelector(
  currentLifeSelector,
  (getCurrentLife) => {
    const playerLife = getCurrentLife("The Player");
    const monsterLife = getCurrentLife("The Monster");

    if (playerLife <= 0) return "The Monster";
    if (monsterLife <= 0) return "The Player";

    return null;
  }
);

export default gameSlice;
