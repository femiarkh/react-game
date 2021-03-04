import { useContext } from 'react';
import MessageContext from '../context/MessageContext';

const useMessage = () => {
  const context = useContext(MessageContext);

  return context;
};

export { useMessage };
