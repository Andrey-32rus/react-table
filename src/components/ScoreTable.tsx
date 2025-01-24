import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { saveGame, loadGame } from '../store/slices/gameSlice';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import GameTable from "./UI/GameTable";

const ScoreTable = () => {
  const dispatch = useAppDispatch();

  const gameData = useAppSelector((state) => state.game.data);
  const loading = useAppSelector((state) => state.game.loading);
  const error = useAppSelector((state) => state.game.error);

  const [removedRows, setRemovedRows] = useState<Set<number>>(new Set);
  const [savedRows, setSavedRows] = useState<Set<number>>(new Set);
  const [players, setPlayers] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    if (gameData) {
      setPlayers(gameData.players);
      setRows(gameData.rows);
      setRemovedRows(new Set(gameData.removedRows));
      setSavedRows(new Set(gameData.savedRows));
    }
  }, [gameData]);

  useEffect(() => {

  }, [removedRows, savedRows, players, rows]);

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

  const autoSave = () => {
    if (players.length > 0 && rows.length > 0) {
      const gameData = {
        players,
        rows,
        [...removedRows],
        [...savedRows]
      };

      dispatch(saveGame(gameData));
    }
  };

  const saveGameHandler = () => {
    const gameName = window.prompt('Введите название сохранения игры');
    if (gameName && players.length > 0 && rows.length > 0) {
      const gameData = {
        players,
        rows,
        removedRows: [],
        savedRows: [],
      };

      dispatch(saveGame(gameData));
    }
  };

  const loadGameHandler = (gameName: string) => {
    dispatch(loadGame(gameName));
  };

  return (
    <Container fluid>
      <h3 className='mb-2'>Таблица игры</h3>
      <GameTable
        players={players}
        rows={rows}
        removedRows={removedRows}
        savedRows={savedRows}
        funcs={{
          changeInputText: changeInputText,
          removeRow: removeRow,
          saveRow: saveRow,
        }}
      />
      <div>
        <div>
          <Button variant="primary" onClick={addRow}>+</Button>
        </div>
        <div className='d-flex flex-row-reverse mt-2'>
          <Button variant="success" onClick={saveGameHandler}>save game</Button>
        </div>
      </div>
    </Container>
  )
}

export default ScoreTable;