import { createSelector, createSlice } from "@reduxjs/toolkit";
import checkRollHits from "./checkRollHits.js";

export const ROLL_STATES = {
  initial: "initial",
  pending: "pending",
  rolled: "rolled",
};


export const gameSlice = createSlice({
  name: "game",
  initialState: {
    rolls: [],
    hits: [],
    rollState: ROLL_STATES.initial,
  },
  reducers: {
    roll: (draft) => {
      draft.rollState = ROLL_STATES.pending;
    },
    rolled: (draft, { payload: roll }) => {
      const hits = checkRollHits(roll)
      draft.rolls.unshift(roll);
      draft.hits.unshift(hits);
      draft.rollState = ROLL_STATES.rolled;
    },
    restart: (draft) => {
      draft.rolls = [];
      draft.hits = [];
      draft.rollState = ROLL_STATES.initial;
    },
  },
});

const rootSelector = (state) => state[gameSlice.name];



const rollStateSelector = createSelector(
  rootSelector,
  (state) => state.rollState
);
const rollsSelector = createSelector(rootSelector, (state) => state.rolls);
const hitsSelector = createSelector(rootSelector, (state) => state.hits);

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

export const lastHitSelector = createSelector(hitsSelector, (hits) => {
  const [lastHit] = hits;
  if (!lastHit) return null;
  return lastHit;
});

export const currentLifeSelector = createSelector(
  hitsSelector,
  (hits) => (player) => {
    if (!hits.length) return 100;
    return hits.reduce((acc, hit) => {
      const playerHit = hit[player];
      return playerHit ? acc - playerHit : acc;
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
