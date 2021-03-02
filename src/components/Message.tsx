import React from 'react';
import { useMessage } from '../hooks/useMessage';
import { useNewGame } from '../hooks/useNewGame';

const Message = () => {
  const { newGame } = useNewGame();
  const { message } = useMessage();
  if (newGame) return null;
  return  <h3 className="message">{message}</h3>;
};

export { Message };
