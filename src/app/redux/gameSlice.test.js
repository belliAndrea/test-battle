import test from 'node:test';
import assert from 'node:assert/strict';
import checkRollHits from './checkRollHits.js';

// Monster wins when its roll sum is greater
test('checkRollHits returns monster victory hits', () => {
  const roll = {
    'The Player': [2, 1],
    'The Monster': [5, 3]
  };
  const hits = checkRollHits(roll);
  assert.deepStrictEqual(hits, {
    'The Player': 5,
    'The Monster': null
  });
});

// Player wins when its roll sum is greater
test('checkRollHits returns player victory hits', () => {
  const roll = {
    'The Player': [6, 3],
    'The Monster': [2, 1]
  };
  const hits = checkRollHits(roll);
  assert.deepStrictEqual(hits, {
    'The Player': null,
    'The Monster': 6
  });
});

// Neither wins when sums are equal
test('checkRollHits returns zero hits for tie', () => {
  const roll = {
    'The Player': [4, 3],
    'The Monster': [5, 2]
  };
  const hits = checkRollHits(roll);
  assert.deepStrictEqual(hits, {
    'The Player': 0,
    'The Monster': 0
  });
});
