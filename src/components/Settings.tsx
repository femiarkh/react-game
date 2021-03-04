/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useAudioSettings } from '../hooks/useAudioSettings';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Settings = ({ visible, setVisible }: Props) => {
  const { audioSettings, changeAudioSettings } = useAudioSettings();
  const [musicOn, setMusicOn] = useState(false);

  if (!visible) return null;

  return (
    <div className="settings">
      <h3>Настройки</h3>
      <form className="settings__form">
        <fieldset>
          <div className="settings__checkbox-pair">
            <label htmlFor="music">Музыка</label>
            <input
              id="music"
              type="checkbox"
              checked={audioSettings.musicOn}
              onChange={(evt) => {
                changeAudioSettings({
                  ...audioSettings,
                  musicOn: evt.target.checked,
                });
                setMusicOn(evt.target.checked);
              }}
            />
          </div>
          <div>
            <label htmlFor="music-volume">Громкость музыки</label>
            <br />
            <input
              id="music-volume"
              type="range"
              value={audioSettings.musicVolume}
              min="0"
              max="1"
              step="0.1"
              onChange={(evt) =>
                changeAudioSettings({
                  ...audioSettings,
                  musicVolume: +evt.target.value,
                })
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="settings__checkbox-pair">
            <label htmlFor="sound">Звук</label>
            <input
              id="sound"
              type="checkbox"
              checked={audioSettings.soundOn}
              onChange={(evt) =>
                changeAudioSettings({
                  ...audioSettings,
                  soundOn: evt.target.checked,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="sound-volume">Громкость звука</label>
            <br />
            <input
              id="sound-volume"
              type="range"
              value={audioSettings.soundVolume}
              min="0"
              max="1"
              step="0.1"
              onChange={(evt) =>
                changeAudioSettings({
                  ...audioSettings,
                  soundVolume: +evt.target.value,
                })
              }
            />
          </div>
        </fieldset>
        <button type="button" onClick={() => setVisible(false)}>
          Закрыть
        </button>
      </form>
    </div>
  );
};

export { Settings };
