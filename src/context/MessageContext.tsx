import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  message: string;
};

const DEFAULT_MESSAGE = 'Гоняем балду!';

const MessageContext = React.createContext({ message: DEFAULT_MESSAGE,
  changeMessage: (values: string) => {} });

export const MessageProvider = ({ children, message }: Props) => {
  const [currentMessage, setCurrentMessage] = useState(
    message || DEFAULT_MESSAGE
  );

  const changeMessage = (values: string) => {
    setCurrentMessage(values);
  };

  return (
    <MessageContext.Provider
      value={{ message: currentMessage, changeMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const MessageConsumer = MessageContext.Consumer;

export default MessageContext;
