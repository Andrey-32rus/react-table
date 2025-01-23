import React from 'react'
import ls from '../store/localStorageWrapper';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import GameTable from './UI/GameTable';
import { Button } from 'react-bootstrap';

interface GameHistoryPageProps {
  gameName: string;
}

const GameHistoryPage: React.FC<GameHistoryPageProps> = ({ gameName }) => {

  const navigate = useNavigate();

  const saves = ls.getSavedGames()
  
  const gameData = saves.get(gameName)
  if (!gameData)
    return (
      <Navigate to={'/history'}></Navigate>
    )

  const { players, rows, removedRows, savedRows } = gameData

  const routeToHistory = () => {
    navigate('/history')
  }

  return (
    <>
      <Button className='mb-3' onClick={routeToHistory}>{'<---'}</Button>
      <GameTable
        players={players}
        rows={rows}
        removedRows={new Set(removedRows)}
        savedRows={new Set(savedRows)}
      />
    </>
  )
}

export default GameHistoryPage;