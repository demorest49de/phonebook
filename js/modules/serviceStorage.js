import render from "./render";

const {renderContacts} = render;

import sort from "./sort";

const {handleSorting} = sort;

import {mainVars} from "../main.js";
const {tHead, list, logo, btnAdd, btnDel, formOverlay, form, nameApp} = mainVars;

const getStorage = () => {
  const empty = createEmptyObject();
  let storage = localStorage.getItem(nameApp) ?
    localStorage.getItem(nameApp) : localStorage.setItem(nameApp, empty);
  if (!storage) storage = localStorage.getItem(nameApp);
  return JSON.parse(storage);
};

const saveStorage = (storage) => {
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
const removeContactFromStorage = (id) => {
  const storage = getStorage();

  const data = storage.data;
  const result = data.filter(x => x.id !== id);
  storage.data = result;
  saveStorage(storage);
};

const handleStorage = (tHead, list) => {
  const storage = getStorage();
  if (storage.data.length === 0) return;
  renderContacts(storage, list);
  handleSorting(storage.sort, tHead);
};

export default {
  getStorage, saveStorage, removeContactFromStorage, handleStorage
};