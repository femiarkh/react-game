import React from 'react';
import { useArray } from '../hooks/useArray';

type Props = {
  value: string;
  index: number;
  array: {
    value: string;
    id: string;
  }[];
};

const Letter = ({ value, index, array }: Props) => {
  const { changeArray } = useArray();

  function changeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    const newArray = Array.from(array);
    newArray[index].value = evt.target.value;
    changeArray(newArray);
  }
  return <input className="letter" type="text" value={value} onChange={changeHandler} />;
};

export { Letter };
