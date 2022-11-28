import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function GameTable(props) {

  //#region Render functions
  const getSavedOrMinusValueElement = (rowIndex, colIndex, colValue) => {
    if (props.savedRows.has(rowIndex) === false)
      return <Form.Control type="text" value={colValue} onChange={e => props.changeInputText(rowIndex, colIndex, e.target.value)} />;
    else if (props.removedRows.has(rowIndex))
      return <Form.Control type="text" value='-' disabled readOnly />;
    else
      return <Form.Control type="text" value={colValue} disabled readOnly />;
  }

  const getSaveOrMinusButton = (rowIndex) => {
    if (props.savedRows.has(rowIndex) === false)
      return <Button variant='success' onClick={() => props.saveRow(rowIndex)}>Save</Button>;
    else if (props.removedRows.has(rowIndex))
      return <Button variant='secondary' onClick={() => props.removeRow(rowIndex)}>Show</Button>;
    else
      return <Button variant='danger' onClick={() => props.removeRow(rowIndex)}>Hide</Button>;
  }
  //#endregion

  return (
    <Table striped bordered>
      <thead>
        <tr>
          {props.players.map((player, i) => (
            <td key={player + i} className='text-center'>{player}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, rIndex) => (
          <tr key={'row' + rIndex}>
            {row.map((col, cIndex) => (
              <td key={'col' + rIndex + cIndex}>
                {getSavedOrMinusValueElement(rIndex, cIndex, col)}
              </td>
            ))
            }
            <td>
              {getSaveOrMinusButton(rIndex)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
