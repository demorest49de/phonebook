import serviceStorage from './modules/serviceStorage.js';
import createElement from './modules/createElement';
import control from './modules/control.js';

const {
  saveStorage,
  getStorage,
  createEmptyObject,
  removeContactFromStorage
} = serviceStorage;

const {
  createRow,
  createFooter, createContainer, createLogo, createHeader, createSingleButton, createForm, createButtonsGroup, createMain, createTable,
} = createElement;

const {
  openForm,
  closeForm,
  toggleDelButton,
  removeRow,

} = control;

{
  const init = (selectorApp, title) => {
    const nameApp = 'phoneBook';
    const app = document.querySelector(selectorApp);
    const phonebook = renderPhonebook(app, title);
    const {tHead, list, logo, btnAdd, btnDel, formOverlay, form} = phonebook;

    // Функционал

    openForm(btnAdd, form, formOverlay);

    closeForm(formOverlay);

    toggleDelButton(btnDel);

    removeRow(list);



    HowerRows();

    //handle formData and save/edit item to storage

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);


      const storage = getStorage();
      let id;
      const {name, sirname, phone} = data;
      if (form.querySelector('.form-id').hasAttribute('data-id')) {
        id = form.querySelector('.form-id').getAttribute('data-id');
        form.querySelector('.form-id').removeAttribute('data-id');

        const result = storage.data.map(item => {
          if (item.id === id) {
            item.name = name;
            item.sirname = sirname;
            item.phone = phone;
          }
          return item;
        });
        storage.data = result;
        renderContacts(storage);
      } else {
        id = createId();
        const row = createRow({id, name, sirname, phone});
        list.append(row);
        storage.data.push({id, name, sirname, phone});
      }


      saveStorage(storage);
      handleSorting(storage.sort);

      form.reset();
      formOverlay.classList.remove('is-visible');
    });

    const =;
    () => {

    };

    //handle column sort by pressing arrow up/down button by user
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

    const =;
    () => {

    };

    //edit row
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.edit-icon')) {
        formOverlay.classList.add('is-visible');
        const title = form.querySelector('.form-title');
        title.textContent = 'Изменить контакт';
        const saveBtn = form.querySelector('button.btn-primary');

        saveBtn.textContent = 'Сохранить';
        const id = target.closest('.contact').querySelector('.delete[data-id]').getAttribute('data-id');

        const storage = getStorage();
        const data = storage.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            form.querySelector('#name').value = data[i].name;
            form.querySelector('.form-id').setAttribute('data-id', data[i].id);
            form.querySelector('#sirname').value = data[i].sirname;
            form.querySelector('#phone').value = data[i].phone;
            return;
          }
        }
      }
    });

    const =;
    () => {

    };

    //method for column sort
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


    const =;
    () => {

    };

    const renderContacts = (storage) => {

      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }

      Object.entries(storage.data).forEach(([index, value]) => {
        const {id, name, sirname, phone} = value;
        const row = createRow({id, name, sirname, phone});
        list.append(row);
      });
    };

    const createId = () => {
      let ID = ``;
      const characters = '0123456789';
      for (let i = 0; i < 9; i++) {
        ID += characters.charAt(Math.floor(Math.random() * 10));
      }
      return ID;
    };

    const handleSorting = (sortSettings) => {

      sortBy(sortSettings);

      const th = tHead.querySelector(`th:nth-child(${sortSettings.column + 1})`);
      sortSettings.direction ? th.classList.add('th-sort-asc') : th.classList.add('th-sort-desc');
    };

    const handleStorage = () => {
      const storage = getStorage();
      if (storage.data.length === 0) return;
      renderContacts(storage);
      handleSorting(storage.sort);
    };

    handleStorage();
  };

  window.phoneBookInit = init;
}
