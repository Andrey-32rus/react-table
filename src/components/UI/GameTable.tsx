import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface GameTableProps {
  players: string[]
  rows: string[][]
  removedRows: Set<number>
  savedRows: Set<number>
  funcs?: GameTableFuncs
}

interface GameTableFuncs {
  changeInputText: (rowIndex: number, colIndex: number, text: string) => void
  removeRow: (index: number) => void
  saveRow: (index: number) => void
}

const GameTable: React.FC<GameTableProps> = ({ players, rows, removedRows, savedRows, funcs }) => {

  //#region Render functions
  const getSavedOrMinusValueElement = (rowIndex: number, colIndex: number, colValue: string) => {
    if (savedRows.has(rowIndex) === false)
      return <Form.Control type="text" value={colValue} onChange={e => funcs && funcs.changeInputText(rowIndex, colIndex, e.target.value)} />;
    else if (removedRows.has(rowIndex))
      return <Form.Control type="text" value='-' disabled readOnly />;
    else
      return <Form.Control type="text" value={colValue} disabled readOnly />;
  }

  const getSaveOrMinusButton = (rowIndex: number) => {
    if (savedRows.has(rowIndex) === false)
      return <Button variant='success' onClick={() => funcs && funcs.saveRow(rowIndex)}>Save</Button>;
    else if (removedRows.has(rowIndex))
      return <Button variant='secondary' onClick={() => funcs && funcs.removeRow(rowIndex)}>Show</Button>;
    else
      return <Button variant='danger' onClick={() => funcs && funcs.removeRow(rowIndex)}>Hide</Button>;
  }
  //#endregion

  return (
    <Table striped bordered>
      <thead>
        <tr>
          {players.map((player, i) => (
            <td key={player + i} className='text-center'>{player}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rIndex) => (
          <tr key={'row' + rIndex}>
            {row.map((col, cIndex) => (
              <td key={'col' + rIndex + cIndex}>
                {getSavedOrMinusValueElement(rIndex, cIndex, col)}
              </td>
            ))}
            {funcs &&
              <td>
                {getSaveOrMinusButton(rIndex)}
              </td>}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default GameTable;
