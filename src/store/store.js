const key = 'data';

const saveData = (players, rows) => {
  localStorage.setItem(key, JSON.stringify({players, rows}));
}

export default {saveData};