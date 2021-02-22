import React from 'react';
import { useMessage } from '../hooks/useMessage';

const Message = () => {
  const { message } = useMessage();
  return  <h3 className="message">{message}</h3>;
};

export { Message };
