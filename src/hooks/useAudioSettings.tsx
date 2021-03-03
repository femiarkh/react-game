import { useContext } from 'react';
import AudioSettingsContext from '../context/AudioSettingsContext';

const useAudioSettings = () => {
  const context = useContext(AudioSettingsContext);

  return context;
};

export { useAudioSettings };
