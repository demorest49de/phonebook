import serviceStorage from "./serviceStorage";

const {
  saveStorage, getStorage
} = serviceStorage;

const sortColumnUpDown = (tHead) => {
  tHead.querySelectorAll('tr th:not(:nth-child(1))')
    .forEach((thCell, column) => {
      thCell.addEventListener('click', () => {

        const sortSwitch = thCell.classList.toggle('th-sort-asc');
        thCell.classList.toggle('th-sort-desc', !sortSwitch);


        const storage = getStorage();
        storage.sort = {column: column + 1, direction: sortSwitch};

        sortBy(storage.sort);
        saveStorage(storage);
        tHead.querySelectorAll('tr th:not(:nth-child(1))')
          .forEach((thCell, number) => {

            if (number !== column) {
              thCell.classList.remove('th-sort-asc', 'th-sort-desc');
            }
          });
      });
    });
};

const sortBy = ({column, direction}) => {
  const dirModifier = direction ? 1 : -1;
  const rows = [...list.childNodes];

  const sortedRows = rows.sort((a, b) => {
    const aText = a.childNodes[column].textContent.trim().toLowerCase();
    const bText = b.childNodes[column].textContent.trim().toLowerCase();

    return aText > bText ? (1 * dirModifier) : (-1 * dirModifier);
  });

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  list.append(...sortedRows);
};

const handleSorting = (sortSettings, tHead) => {

  sortBy(sortSettings);

  const th = tHead.querySelector(`th:nth-child(${sortSettings.column + 1})`);
  sortSettings.direction ? th.classList.add('th-sort-asc') : th.classList.add('th-sort-desc');
};

export default {
  sortColumnUpDown, handleSorting
};