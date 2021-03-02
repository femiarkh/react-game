import React from 'react';

const Records = () => {
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
    </div>
  ) : (
    <div className="records">
      <div className="records__no-records">
        Извините, рекордов пока нет. Всё в ваших руках!
      </div>
    </div>
  );
};

export { Records };
