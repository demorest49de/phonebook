import serviceStorage from "./serviceStorage";
import render from "./render";
import createElement from "./createElement";


const {
  createId,
  createRow,
} = createElement;

const {
  getStorage,
  removeContactFromStorage,
  saveStorage
} = serviceStorage;

const {
  renderContacts
} = render;

const openForm = (btnAdd, form, formOverlay) => {
  btnAdd.addEventListener('click', () => {
    const addBtn = form.querySelector('button.btn-primary');
    form.querySelector('.form-title').textContent = 'Добавить контакт';

    addBtn.textContent = 'Добавить';
    formOverlay.classList.add('is-visible');
  });
};

const closeForm = (formOverlay) => {
  formOverlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')
      || target.classList.contains('btn-danger')
    ) {
      formOverlay.classList.remove('is-visible');
    }
  });
};

const toggleDelButton = (btnDel) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach((del) => {
      del.classList.toggle('is-visible');
    });
  });
};

const removeRow = (list) => {
  list.addEventListener('click', e => {
    const target = e.target;

    if (target === target.closest('.del-icon')) {
      target.closest('.contact').remove();

      const contact = target.closest('.contact').querySelector('.delete[data-id]');

      if (contact.hasAttribute('data-id')) {
        removeContactFromStorage(contact.getAttribute('data-id'));
      }
    }
  });
};

const hoverRows = (list, logo) => {
  list.addEventListener('mouseenter', e => {
    const target = e.target;
    if (target.querySelector('.contact')) {
      const allRows = list.querySelectorAll('.contact');
      hoverRow(allRows, logo);
    }
  });
};

const hoverRow = (allRows, logo) => {
  const text = logo.textContent;
  allRows.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const saveEditformData = (form, list, formOverlay, nameApp) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);


    const storage = getStorage(nameApp);
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
};

const editRow = (list, formOverlay, form) => {
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
};

export default {
  openForm,
  closeForm,
  toggleDelButton,
  removeRow,
  hoverRows,
  saveEditformData,
  editRow
};