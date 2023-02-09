import serviceStorage from "./serviceStorage";

const {
  removeContactFromStorage
} = serviceStorage;

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


export default {
  openForm,
  closeForm,
  toggleDelButton,
  removeRow,
  hoverRows,
};