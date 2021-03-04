import React, { useState } from 'react';

type AudioSettings = {
  musicOn: boolean;
  musicVolume: number;
  soundOn: boolean;
  soundVolume: number;
};

type Props = {
  children: React.ReactNode;
  audioSettings: AudioSettings;
};

const defaultSettings = {
  musicOn: false,
  musicVolume: 1.0,
  soundOn: false,
  soundVolume: 1.0,
};

const AudioSettingsContext = React.createContext({
  audioSettings: defaultSettings,
  changeAudioSettings: (values: AudioSettings) => {},
});

export const AudioSettingsProvider = ({ children, audioSettings }: Props) => {
  const [currentAudioSettings, setCurrentAudioSettings] = useState(
    audioSettings
  );

  const changeAudioSettings = (values: AudioSettings) => {
    setCurrentAudioSettings(values);
  };

  return (
    <AudioSettingsContext.Provider
      value={{ audioSettings: currentAudioSettings, changeAudioSettings }}
    >
      {children}
    </AudioSettingsContext.Provider>
  );
};

export const AudioSettingsConsumer = AudioSettingsContext.Consumer;

export default AudioSettingsContext;
