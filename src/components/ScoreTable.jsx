import React from 'react'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import store from '../store/store';
import { useNavigate } from 'react-router-dom';
import { routes } from '../navigation/navigation';

export default function ScoreTable() {

  const navigate = useNavigate();
  const location = useLocation();

  const [removedRows, setRemovedRows] = useState(new Set());
  const [savedRows, setSavedRows] = useState(new Set());
  const [players, setPlayers] = useState([]);
  const [rows, setRows] = useState([]);

//#region effects
  useEffect(() => {
    if (location.state) {
      setPlayers(location.state);
      setRows([]);
    }
    else {
      const storeData = store.getData();

      if (storeData) {
        setPlayers(storeData.players);
        setRows(storeData.rows);
      }
      else {
        navigate(routes.inputUsers, { replace: true})
      }
    }
  }, [])

  useEffect(() => {
    if(players.length == 0)
      return
    store.saveData(players, rows)
  }, [players, rows])

  const addRow = () => {
    if (savedRows.size !== rows.length) {
      alert('Есть несохранённая строка! Нельзя добавить больше одной несохранённой строки. Сохраните последнюю, потом добавляйте новую пустую');
      return;
    }

    let arr = players.map(p => '');
    setRows([...rows, arr]);
  }
//#endregion

  const removeRow = (index) => {
    if (removedRows.has(index))
      removedRows.delete(index)
    else
      removedRows.add(index);

    setRemovedRows(new Set(removedRows));
  }

  const saveRow = (index) => {
    savedRows.add(index);
    setSavedRows(new Set(savedRows));
  }

  const changeInputText = (rowIndex, colIndex, text) => {
    let newRows = [...rows];
    newRows[rowIndex][colIndex] = text;

    setRows(newRows);
  }
//#region Render functions
  const getSavedOrMinusValueElement = (rowIndex, colIndex, colValue) => {
    if (savedRows.has(rowIndex) === false)
      return <Form.Control type="text" defaultValue={colValue} onChange={e => changeInputText(rowIndex, colIndex, e.target.value)} />;
    else if (removedRows.has(rowIndex))
      return <Form.Control type="text" defaultValue='-' value='-' disabled readOnly />;
    else
      return <Form.Control type="text" defaultValue={colValue} value={colValue} disabled readOnly />;
  }

  const getSaveOrMinusButton = (rowIndex) => {
    if (savedRows.has(rowIndex) === false)
      return <Button variant='secondary' onClick={() => saveRow(rowIndex)}>Save</Button>;
    else if (removedRows.has(rowIndex))
      return <Button variant='secondary' onClick={() => removeRow(rowIndex)}>Show</Button>;
    else
      return <Button variant='secondary' onClick={() => removeRow(rowIndex)}>Hide</Button>;
  }
//#endregion

  return (
    <Container fluid>
      <h3 className='mb-2'>Таблица игры</h3>
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
              ))
              }
              <td>
                {getSaveOrMinusButton(rIndex)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={addRow}>+</Button>
    </Container>
  )
}
