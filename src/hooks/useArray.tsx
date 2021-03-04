import { useContext } from 'react';
import ArrayContext from '../context/ArrayContext';

const useArray = () => {
  const context = useContext(ArrayContext);

  return context;
};

export { useArray };
