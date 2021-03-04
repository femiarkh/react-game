import React from 'react';

type Props = {
  playerName: string;
  words: string[];
  score: number;
  isMoving: boolean;
  isWinner: boolean;
};

const PlayerScore = ({
  playerName,
  words,
  score,
  isMoving,
  isWinner,
}: Props) => {
  const wordsList = words.map((word) => (
    <div className="player-score__pair" key={word}>
      <dt className="player-score__word">{word}</dt>
      <dd className="player-score__length">{word.length}</dd>
    </div>
  ));

  return (
    <div className="player-score">
      <h3
        className={`player-score__header ${
          isMoving ? 'player-score__header--moving' : ''
        } ${isWinner ? 'player-score__header--winner' : ''}`}
        // onAnimationEnd={(evt) => console.log(evt)}
      >
        {playerName}
      </h3>
      <dl className="player-score__score-list">
        {words[0] !== '' ? wordsList : null}
      </dl>
      <div className="player-score__total">{score !== 0 ? score : null}</div>
    </div>
  );
};

export { PlayerScore };
