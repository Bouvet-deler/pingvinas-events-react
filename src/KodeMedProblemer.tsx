import { Dispatch, memo, SetStateAction, useState } from "react";

// Alle radene blir rerendret når man trykker på en av dem, selv om man har brukt memo.
// Er det noen måte å fikse dette på?
export const Table = () => {
  const [selectedRows, setSelectedRows] = useState(new Set<number>());
  return (
    <>
      selected rows: {[...selectedRows].join(", ")}
      <table className="table">
        <tbody>
          {rows.map((rowNumber) => (
            <Row
              key={rowNumber}
              rowNumber={rowNumber}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const Row = memo(
  (props: {
    rowNumber: number;
    selectedRows: Set<number>;
    setSelectedRows: Dispatch<SetStateAction<Set<number>>>;
  }) => (
    <tr>
      <td>
        <input
          id={props.rowNumber.toString()}
          type="checkbox"
          checked={props.selectedRows.has(props.rowNumber)}
          onChange={() => {
            const newSelectedRows = new Set(props.selectedRows);
            if (props.selectedRows.has(props.rowNumber)) {
              newSelectedRows.delete(props.rowNumber);
            } else {
              newSelectedRows.add(props.rowNumber);
            }
            props.setSelectedRows(newSelectedRows);
          }}
        />
      </td>
      <td>
        <label htmlFor={props.rowNumber.toString()}>
          row {props.rowNumber}
        </label>
      </td>
      <td>
        rerendered {numberOfRerendersByRowNumber[props.rowNumber]++} times
      </td>
    </tr>
  )
);

export const TableEksempel = () => {
  const [selectedRows, setSelectedRows] = useState(new Set<number>());
  return (
    <>
      selected rows: {[...selectedRows].join(", ")}
      <table className="table">
        <tbody>
          {rows.map((rowNumber) => (
            <RowEksempel
              key={rowNumber}
              rowNumber={rowNumber}
              isSelected={selectedRows.has(rowNumber)}
              setSelectedRows={setSelectedRows}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const RowEksempel = memo(
  (props: {
    rowNumber: number;
    isSelected: boolean;
    setSelectedRows: Dispatch<SetStateAction<Set<number>>>;
  }) => (
    <tr>
      <td>
        <input
          id={props.rowNumber.toString()}
          type="checkbox"
          checked={props.isSelected}
          onChange={() => {
            props.setSelectedRows((prevState) => {
              if (props.isSelected) {
                prevState.delete(props.rowNumber);
              } else {
                prevState.add(props.rowNumber);
              }
              return new Set(prevState);
            });
          }}
        />
      </td>
      <td>
        <label htmlFor={props.rowNumber.toString()}>
          row {props.rowNumber}
        </label>
      </td>
      <td>
        rerendered {numberOfRerendersByRowNumber[props.rowNumber]++} times
      </td>
    </tr>
  )
);

const rows = [0, 1, 2, 3, 4, 5, 6];
const numberOfRerendersByRowNumber = Array.from(rows, (_) => 0);
