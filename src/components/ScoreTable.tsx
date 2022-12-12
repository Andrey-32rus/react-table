import React from 'react'
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ls from '../store/localStorageWrapper';
import { useNavigate } from 'react-router-dom';
import { routes } from '../navigation/navigation';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setChangedData } from '../store/changeScoreTable/changeScoreTableSlice'
import GameTable from './UI/GameTable';

export default function ScoreTable() {

  const changedData = useAppSelector(state => state.changeScoreTable.data)
  const dispatch = useAppDispatch()

  const navigate = useNavigate();

  const [removedRows, setRemovedRows] = useState<Set<number>>(new Set);
  const [savedRows, setSavedRows] = useState<Set<number>>(new Set);
  const [players, setPlayers] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

//#region effects
  useEffect(() => {
    if (changedData) {
      setPlayers(changedData.players);
      setRows(changedData.rows);
      setRemovedRows(new Set(changedData.removedRows));
      setSavedRows(new Set(changedData.savedRows));

      dispatch(setChangedData(null))
    }
    else {
      const lsData = ls.getData();

      if (lsData) {
        setPlayers(lsData.players);
        setRows(lsData.rows);
        setRemovedRows(new Set(ls.getRemovedRows()));
        setSavedRows(new Set(ls.getSavedRows()));
      }
      else {
        navigate(routes.inputUsers, { replace: true})
      }
    }
  }, [])

  useEffect(() => {
    if(players.length == 0) return;
    ls.saveData(players, rows)
  }, [players, rows])

  useEffect(() => {
    if (removedRows == null) return;
    ls.saveRemovedRows(Array.from(removedRows))
  }, [removedRows])

  useEffect(() => {
    if(savedRows == null) return;
    ls.saveSavedRows(Array.from(savedRows))
  }, [savedRows])
//#endregion

  const addRow = () => {
    if (savedRows.size !== rows.length) {
      alert('Есть несохранённая строка! Нельзя добавить больше одной несохранённой строки. Сохраните последнюю, потом добавляйте новую пустую');
      return;
    }

    let arr = players.map(p => '');
    setRows([...rows, arr]);
  }

  const changeInputText = (rowIndex: number, colIndex: number, text: string) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = text;

    setRows(newRows);
  }

  const removeRow = (index: number) => {
    if (removedRows.has(index))
      removedRows.delete(index)
    else
      removedRows.add(index);

    setRemovedRows(new Set(removedRows));
  }

  const saveRow = (index: number) => {
    savedRows.add(index);
    setSavedRows(new Set(savedRows));
  }

  const saveGame = () => {
    const gameName = window.prompt('Введите название сохранения игры');
    if(gameName == null)  return;

    var saves = ls.getSavedGames();
    if (saves[gameName]) {
      window.alert('C таким названием уже существует');
      return;
    }

    ls.saveGame(gameName, players, rows, Array.from(removedRows), Array.from(savedRows));
  }

  

  return (
    <Container fluid>
      <h3 className='mb-2'>Таблица игры</h3>
      <GameTable
        players={players}
        rows={rows}
        removedRows={removedRows}
        savedRows={savedRows}
        changeInputText={changeInputText}
        removeRow={removeRow}
        saveRow={saveRow}
      />
      <div>
        <div>
          <Button variant="primary" onClick={addRow}>+</Button>
        </div>
        <div className='d-flex flex-row-reverse mt-2'>
          <Button variant="success" onClick={saveGame}>save game</Button>
        </div>
      </div>
    </Container>
  )
}
