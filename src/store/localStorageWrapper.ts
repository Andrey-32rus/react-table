import {Data} from '../models/Data';

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

//потом дописать по человечески
const saveGame = (gameName: string, players: string[], rows: string[][], removedRows: number[], savedRows: number[]) => {
  var data = JSON.parse(localStorage.getItem('saves') as any);
  if(data == null) data={};
  data[gameName] = { players, rows, removedRows, savedRows }
  localStorage.setItem('saves', JSON.stringify(data));
}

const deleteGameAndGetGames = (gameName: string) => {
  var data = JSON.parse(localStorage.getItem('saves') as any);
  if (data == null) return
  delete data[gameName]
  localStorage.setItem('saves', JSON.stringify(data));
  return data
}

const getSavedGames = () => {
  return JSON.parse(localStorage.getItem('saves') as any);
}

export default { saveData, getData, saveSavedRows, getSavedRows, saveRemovedRows, getRemovedRows, saveGame, getSavedGames, deleteGameAndGetGames };