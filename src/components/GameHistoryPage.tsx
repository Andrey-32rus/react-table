import React from 'react'
import ls from '../store/localStorageWrapper';
import { Navigate, useParams } from 'react-router-dom';
import GameTable from './UI/GameTable';

const GameHistoryPage: React.FC = () => {

  const params =  useParams();
  if(!params.gameName) {
    return (
      <Navigate to={'/history'}></Navigate>
    )
  }
  const gameName: string = params.gameName

  const saves = ls.getSavedGames()
  
  const gameData = saves.get(gameName)
  if (!gameData)
    return (
      <Navigate to={'/history'}></Navigate>
    )

  const { players, rows, removedRows, savedRows } = gameData

  return (
    <GameTable
      players={players}
      rows={rows}
      removedRows={new Set(removedRows)}
      savedRows={new Set(savedRows)}
    />
  )
}

export default GameHistoryPage;