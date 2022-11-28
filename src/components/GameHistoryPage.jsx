import React from 'react'
import ls from '../store/localStorageWrapper';
import { Navigate, useParams } from 'react-router-dom';
import GameTable from './UI/GameTable';

export default function GameHistoryPage() {

  const {gameName} = useParams()

  const saves = ls.getSavedGames()
  
  if (!saves[gameName])
    return (
      <Navigate to={'/history'}></Navigate>
    )

  const { players, rows, removedRows, savedRows } = saves[gameName]

  return (
    <GameTable
      players={players}
      rows={rows}
      removedRows={new Set(removedRows)}
      savedRows={new Set(savedRows)}
    />
  )
}
