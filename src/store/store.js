const key = 'data';

const saveData = (players, rows) => {
  localStorage.setItem(key, JSON.stringify({players, rows}));
}

const getData = () => {
  return JSON.parse(localStorage.getItem(key));
}

const saveSavedRows = (savedRows) => {
  localStorage.setItem('savedRows', JSON.stringify(savedRows));
}

const getSavedRows = () => {
  return JSON.parse(localStorage.getItem('savedRows'));
}

const saveRemovedRows = (removedRows) => {
  localStorage.setItem('removedRows', JSON.stringify(removedRows));
}

const getRemovedRows = () => {
  return JSON.parse(localStorage.getItem('removedRows'));
}

//потом дописать по человечески
const saveGame = (gameName, players, rows, removedRows, savedRows) => {
  var data = JSON.parse(localStorage.getItem('saves'));
  if(data == null) data={};
  data[gameName] = { players, rows, removedRows, savedRows }
  localStorage.setItem('saves', JSON.stringify(data));
}

export default { saveData, getData, saveSavedRows, getSavedRows, saveRemovedRows, getRemovedRows, saveGame };