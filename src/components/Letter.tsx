import React from 'react';

type Props = {
  value: string;
  index: number;
  array: {
    value: string;
    id: string;
  }[];
  setArray: React.Dispatch<React.SetStateAction<{
    value: string;
    id: string; }[]>>;
};

const Letter = ({ value, index, array, setArray }: Props) => {
  function changeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    const newArray = Array.from(array);
    newArray[index].value = evt.target.value;
    setArray(newArray);
  }
  return <input className="letter" type="text" value={value} onChange={changeHandler} />;
};

export { Letter };
