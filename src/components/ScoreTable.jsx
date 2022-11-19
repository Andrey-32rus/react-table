import React from 'react'
import { useState } from 'react';

export default function ScoreTable() {

const players = ['a', 'b', 'c'];
const [removedRows, setRemovedRows] = useState(new Set());
const [rows, setRows] = useState([['1','0','1'], ['0','1','0']]);

const addRow = () => {
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
                                {removedRows.has(rIndex) ? '-' : <input type="text" defaultValue={col} />}
                            </td>
                        ))
                    }
                    <td>
                        <button onClick={() => removeRow(rIndex)}>-</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        <button onClick={addRow}>+</button>
    </div>
  )
}
