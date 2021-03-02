export function getWinners(
  players: {
    id: number;
    name: string;
    words: string[];
    score: number;
    isMoving: boolean;
  }[]
) {
  const firstPlayerScore = players[0].score;

  if (players.every((player) => player.score === firstPlayerScore)) {
    return [];
  }

  const sortedPlayers = players
    .slice()
    .sort((player1, player2) => player2.score - player1.score);

  if (sortedPlayers[0].score !== sortedPlayers[1].score) {
    return [sortedPlayers[0]];
  }

  const winnerScore = sortedPlayers[0].score;
  return sortedPlayers.filter((player) => player.score === winnerScore);
}
