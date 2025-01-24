import React from 'react';
import ls from '../store/localStorageWrapper';
import GameTable from './UI/GameTable';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

interface GameHistoryPageProps {
  gameName: string;
}

const GameHistoryPage: React.FC<GameHistoryPageProps> = ({ gameName }) => {
  const router = useRouter();

  // Получаем сохраненные игры
  const saves = ls.getSavedGames();

  // Проверяем, существует ли игра
  const gameData = saves.get(gameName);

  // Если данных для игры нет, перенаправляем на страницу истории
  if (!gameData) {
    if (typeof window !== 'undefined') {
      router.replace('/history');
    }
    return null; // Возвращаем null во время редиректа
  }

  // Данные игры
  const { players, rows, removedRows, savedRows } = gameData;

  // Функция для возврата к истории
  const routeToHistory = () => {
    router.push('/history');
  };

  return (
      <>
        <Button className="mb-3" onClick={routeToHistory}>
          {'<---'}
        </Button>
        <GameTable
            players={players}
            rows={rows}
            removedRows={new Set(removedRows)}
            savedRows={new Set(savedRows)}
        />
      </>
  );
};

export default GameHistoryPage;