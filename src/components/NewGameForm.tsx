/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { usePlayersData } from '../hooks/usePlayersData';
import { useGameSize } from '../hooks/useGameSize';
import { useArray } from '../hooks/useArray';
import { useNewGame } from '../hooks/useNewGame';
import { useMessage } from '../hooks/useMessage';
import { createInitialArray } from '../utils/createInitialArray';
import { INITIAL_PLAYERS } from '../const/INITIAL_PLAYERS';

const NewGameForm = () => {
  const { playersData, changePlayersData } = usePlayersData();
  const { gameSize, changeGameSize } = useGameSize();
  const { changeArray } = useArray();
  const { newGame, changeNewGame } = useNewGame();
  const { changeMessage } = useMessage();

  const nameInputs = playersData.map((player) => (
    <input
      id={player.id}
      defaultValue=""
      key={player.id}
      type="text"
      placeholder={player.name}
      onChange={handlePlayerNameChange}
      autoComplete="off"
      required
    />
  ));

  function handlePlayerNameChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const playerIndex = +evt.target.id;
    const newPlayersData = playersData.map((player) =>
      JSON.parse(JSON.stringify(player))
    );
    newPlayersData[playerIndex].name = evt.target.value;
    changePlayersData(newPlayersData);
  }

  function handleGameSizeChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    const newSize = +evt.target.value;
    changeGameSize(newSize);
    changeArray(createInitialArray(newSize));
  }

  function handlePlayersNumberChange(
    evt: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newPlayers = INITIAL_PLAYERS.map((player) =>
      JSON.parse(JSON.stringify(player))
    );
    const newPlayersNumber = +evt.target.value;
    if (newPlayersNumber === 3 || newPlayersNumber === 4) {
      newPlayers[2] = {
        id: 2,
        name: 'Игрок3',
        words: [''],
        score: 0,
        isMoving: false,
      };
    }
    if (newPlayersNumber === 4) {
      newPlayers[3] = {
        id: 3,
        name: 'Игрок4',
        words: [''],
        score: 0,
        isMoving: false,
      };
    }
    changePlayersData(newPlayers);
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    changeMessage(`Ваш ход, ${playersData[0].name}.`);
    const newPlayers = playersData.map((player) =>
      JSON.parse(JSON.stringify(player))
    );
    newPlayers.forEach((player) => {
      const thePlayer = player;
      thePlayer.words = [];
      thePlayer.score = 0;
      thePlayer.isMoving = false;
    });
    newPlayers[0].isMoving = true;
    changePlayersData(newPlayers);
    changeNewGame(false);
  }

  useEffect(() => {
    const savedGame = localStorage.getItem('balda-save');
    if (typeof savedGame === 'string') {
      const parsedSaveGame = JSON.parse(savedGame);
      changeArray(parsedSaveGame.array);
      changePlayersData(parsedSaveGame.playersData);
      const savedMovingIndex = parsedSaveGame.playersData.findIndex(
        (player: {
          playerName: string;
          words: string[];
          score: number;
          isMoving: boolean;
        }) => player.isMoving
      );
      changeMessage(
        `Ваш ход, ${parsedSaveGame.playersData[savedMovingIndex].name}`
      );
      changeGameSize(Math.sqrt(parsedSaveGame.array.length));
      changeNewGame(false);
    } else {
      changeArray(createInitialArray(gameSize));
    }
  }, [newGame]);

  if (!newGame) return null;

  return (
    <form className="new-game-form" onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="game-size">Размер поля: </label>
        <select
          defaultValue={gameSize}
          id="game-size"
          onChange={handleGameSizeChange}
        >
          <option value="3">3x3</option>
          <option value="5">5x5</option>
          <option value="7">7x7</option>
        </select>
      </fieldset>
      <fieldset className="new-game-form__players">
        <label>
          Число игроков:&nbsp;
          <select
            defaultValue={playersData.length}
            onChange={handlePlayersNumberChange}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        {nameInputs}
      </fieldset>
      <button type="submit">Погнали!</button>
    </form>
  );
};

export { NewGameForm };
