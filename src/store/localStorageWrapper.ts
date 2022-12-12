import {Data} from '../models/Data';
import { SaveModel } from '../models/SaveModel';
import { ScoreTableModel } from '../models/ScoreTableModel';

const key: string = 'data';

const saveData = (players: string[], rows: string[][]) => {
  localStorage.setItem(key, JSON.stringify({players, rows}));
}

const getData = () => {
  const json = localStorage.getItem(key) as string
  return JSON.parse(json) as Data;
}

const saveSavedRows = (savedRows: number[]) => {
  localStorage.setItem('savedRows', JSON.stringify(savedRows));
}

const getSavedRows = () => {
  return JSON.parse(localStorage.getItem('savedRows') as string);
}

const saveRemovedRows = (removedRows: number[]) => {
  localStorage.setItem('removedRows', JSON.stringify(removedRows));
}

const getRemovedRows = () => {
  return JSON.parse(localStorage.getItem('removedRows') as string) as number[]
}

const saveGame = (gameName: string, players: string[], rows: string[][], removedRows: number[], savedRows: number[]) => {
  const data = getSavedGames()

  data.set(gameName, { players, rows, removedRows, savedRows })
  localStorage.setItem('saves', JSON.stringify(data));
}

const deleteGameAndGetGames = (gameName: string) => {
  const data = getSavedGames()
  if (data.size == 0) return new Map<string, ScoreTableModel>
  data.delete(gameName)
  localStorage.setItem('saves', JSON.stringify(data));
  return data
}

const getSavedGames = () => {
  const json = localStorage.getItem('saves')
  let data: Map<string, ScoreTableModel>
  if (json)
    data = new Map((JSON.parse(json) as SaveModel[]).map(x => [x.gameName, x.gameData]))
  else
    data = new Map<string, ScoreTableModel>()
  return data
}

export default { saveData, getData, saveSavedRows, getSavedRows, saveRemovedRows, getRemovedRows, saveGame, getSavedGames, deleteGameAndGetGames };