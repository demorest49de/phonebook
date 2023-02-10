import render from "./render.js";
import {handleSorting} from "./sort.js";

const getStorage = (nameApp) => {
  const empty = createEmptyObject();
  let storage = localStorage.getItem(nameApp) ?
    localStorage.getItem(nameApp) : localStorage.setItem(nameApp, empty);
  if (!storage) storage = localStorage.getItem(nameApp);
  return JSON.parse(storage);
};

const saveStorage = (storage, nameApp) => {
  localStorage.setItem(nameApp, JSON.stringify(storage));
};

const createEmptyObject = () => {
  return JSON.stringify({
    data: [],
    sort: {
      column: 1,
      direction: true,
    },
  });
};

const removeContactFromStorage = (id, nameApp) => {
  const storage = getStorage(nameApp);

  const data = storage.data;
  storage.data = data.filter(x => x.id !== id);
  saveStorage(storage, nameApp);
};


const handleStorage = ($) => {
  const storage = getStorage($.nameApp);
  if (storage.data.length === 0) return;
  render.renderContacts(storage, $);
  handleSorting(storage.sort, $);
};

export default {
  getStorage, saveStorage, removeContactFromStorage, handleStorage
};