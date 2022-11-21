const key = 'data';

const saveData = (players, rows) => {
  localStorage.setItem(key, JSON.stringify({players, rows}));
}

const getData = () => {
  return JSON.parse(localStorage.getItem(key));
}

export default {saveData, getData};