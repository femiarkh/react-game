import React, { useState, useEffect } from 'react';
import { useNewGame } from '../hooks/useNewGame';
import { Records } from './Records';
import { Settings } from './Settings';
import { useAudioSettings } from '../hooks/useAudioSettings';
import { MUSIC_LINK } from '../const/AUDIO_LINKS';

const music = new Audio(MUSIC_LINK);
music.loop = true;

const Header = () => {
  const { changeNewGame } = useNewGame();
  const { audioSettings } = useAudioSettings();
  const [recordsVisible, setRecordsVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    music.load();
  }, []);

  useEffect(() => {
    if (audioSettings.musicOn) {
      music.volume = audioSettings.musicVolume;
      music.play();
    } else {
      music.pause();
    }
  }, [audioSettings.musicOn, audioSettings.musicVolume]);

  return (
    <div className="header">
      <h1 className="header__game-title">This... Is... BALDA!!!</h1>
      <div className="header__buttons">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('balda-save');
            changeNewGame(true);
          }}
        >
          Новая игра
        </button>
        <button
          type="button"
          onClick={() => setRecordsVisible((visible) => !visible)}
        >
          Рекорды
        </button>
        <button
          type="button"
          onClick={() => setSettingsVisible((visible) => !visible)}
          // onClick={() => (music.paused ? music.play() : music.pause())}
        >
          Настройки
        </button>
      </div>
      <Records visible={recordsVisible} setVisible={setRecordsVisible} />
      <Settings visible={settingsVisible} setVisible={setSettingsVisible} />
    </div>
  );
};

export { Header };
