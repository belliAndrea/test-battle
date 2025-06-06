export default function checkRollHits(roll) {
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
}
