import React from 'react'
import { useState } from 'react';

export default function ScoreTable() {

const players = ['a', 'b', 'c'];
const [removedRows, setRemovedRows] = useState(new Set());
const [savedRows, setSavedRows] = useState(new Set());
const [rows, setRows] = useState([['1','0','1'], ['0','1','0']]);

const addRow = () => {
    if(savedRows.size !== rows.length)
        return;

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

const getSavedOrMinusValueElement = (rowIndex, colValue) => {
    if(savedRows.has(rowIndex) === false)
        return <input type="text" defaultValue={colValue}/>;
    else if (removedRows.has(rowIndex))
        return '-';
    else 
        return <p>{colValue}</p>;
}

const getSaveOrMinusButton = (rowIndex) => {
    if(savedRows.has(rowIndex) === false)
        return <button onClick={() => saveRow(rowIndex)}>Save</button>;
    else if (removedRows.has(rowIndex))
        return <button onClick={() => removeRow(rowIndex)}>Show</button>;
    else 
        return <button onClick={() => removeRow(rowIndex)}>Hide</button>;
}

  return (
    <div>
        <table>
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
                                {getSavedOrMinusValueElement(rIndex, col)}
                            </td>
                        ))
                    }
                    <td>
                        {getSaveOrMinusButton(rIndex)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        <button onClick={addRow}>+</button>
    </div>
  )
}
