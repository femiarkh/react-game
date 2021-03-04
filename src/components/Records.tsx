import React from 'react';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Records = ({ visible, setVisible }: Props) => {
  const storedRecords = localStorage.getItem('balda-records');
  let recordRows;

  if (storedRecords) {
    const parsedRecords: [string, number][] = JSON.parse(storedRecords);
    recordRows = parsedRecords.map((record) => (
      <tr key={record.toString()}>
        <td>{record[0]}</td>
        <td>{record[1]}</td>
      </tr>
    ));
  }

  if (!visible) return null;

  return storedRecords ? (
    <div className="records">
      <h3>Рекорды</h3>
      <table className="records__table">
        <thead />
        <tbody>
          <tr>
            <th>Игрок</th>
            <th>Очки</th>
          </tr>
          {recordRows}
        </tbody>
      </table>
      <div className="records__buttons">
        <button type="button" onClick={() => setVisible(false)}>
          Закрыть
        </button>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('balda-records');
            setVisible(false);
            setTimeout(() => setVisible(true), 0);
          }}
        >
          Очистить
        </button>
      </div>
    </div>
  ) : (
    <div className="records">
      <h3>Рекорды</h3>
      <div className="records__no-records">
        Извините, рекордов пока нет. Всё в ваших руках!
      </div>
      <div className="records__buttons">
        <button type="button" onClick={() => setVisible(false)}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export { Records };
