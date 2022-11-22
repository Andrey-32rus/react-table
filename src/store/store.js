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

const saveRemovedRows = (removedRows) => {
  localStorage.setItem('removedRows', JSON.stringify(removedRows));
}

export default { saveData, getData, saveSavedRows, saveRemovedRows };