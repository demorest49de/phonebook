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
const removeContactFromStorage = (id) => {
  const storage = getStorage();

  const data = storage.data;
  const result = data.filter(x => x.id !== id);
  storage.data = result;
  saveStorage(storage);
};

export default {
  getStorage,
  saveStorage,
  removeContactFromStorage,
}