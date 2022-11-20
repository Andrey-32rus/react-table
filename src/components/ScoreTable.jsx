import React from 'react'
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ScoreTable() {

const players = ['a', 'b', 'c'];
const [removedRows, setRemovedRows] = useState(new Set());
const [savedRows, setSavedRows] = useState(new Set());
const [rows, setRows] = useState([['1','0','1'], ['0','1','0']]);

const addRow = () => {
    if(savedRows.size !== rows.length) {
        alert('Есть несохранённая строка! Нельзя добавить больше одной несохранённой строки. Сохраните последнюю, потом добавляйте новую пустую');
        return;
    }

    let arr =  players.map(p => '');
    setRows([...rows, arr]);
}

const removeRow = (index) => {
   if(removedRows.has(index))
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

const getSavedOrMinusValueElement = (rowIndex, colIndex, colValue) => {
    if(savedRows.has(rowIndex) === false)
        return <Form.Control type="text" defaultValue={colValue} onChange={e => changeInputText(rowIndex, colIndex, e.target.value)}/>;
    else if (removedRows.has(rowIndex))
        return '-';
    else 
        return <Form.Control type="text" defaultValue={colValue} disabled readOnly/>;
}

const getSaveOrMinusButton = (rowIndex) => {
    if(savedRows.has(rowIndex) === false)
        return <Button variant='secondary' onClick={() => saveRow(rowIndex)}>Save</Button>;
    else if (removedRows.has(rowIndex))
        return <Button variant='secondary' onClick={() => removeRow(rowIndex)}>Show</Button>;
    else 
        return <Button variant='secondary' onClick={() => removeRow(rowIndex)}>Hide</Button>;
}

  return (
    <Container fluid>
        <Table striped bordered>
            <thead>
                <tr>
                    {players.map(player => (
                        <td key={player}>{player}</td>
                    ))}
                </tr>
            </thead>
        
            <tbody>
            {rows.map((row, rIndex) => (
                <tr key={'rows' + rIndex}>
                    {row.map((col, cIndex) => (
                            <td key={players[cIndex] + rIndex}>
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
