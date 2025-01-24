import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Container } from 'react-bootstrap';
import { saveGame, loadGame } from '../store/slices/gameSlice';
import {useAppDispatch, useAppSelector} from "../store/hooks";

const ScoreTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const gameData = useAppSelector((state) => state.game.data);
  const loading = useAppSelector((state) => state.game.loading);
  const error = useAppSelector((state) => state.game.error);

  const [players, setPlayers] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    if (gameData) {
      setPlayers(gameData.players);
      setRows(gameData.rows);
    }
  }, [gameData]);

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
      <h3 className="mb-2">Таблица игры</h3>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div>
        <Button variant="primary" onClick={saveGameHandler}>
          Save Game
        </Button>
        <Button variant="secondary" onClick={() => loadGameHandler('gameName')}>
          Load Game
        </Button>
      </div>
      {/* Отображение таблицы */}
    </Container>
  );
};

export default ScoreTable;