import createElement from "./createElement.js";


const {
  createTable, createMain, createButtonsGroup, createForm, createHeader, createLogo, createFooter, createRow
} = createElement;

const renderPhonebook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonsGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3 script-add',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const form = createForm();
  const footer = createFooter(title);
  header.headerContainer.append(logo);
  main.mainContainer.append(buttonsGroup.btnWrapper, table, form.overlay);
  app.append(header, main, footer);


  return {
    tHead: table.tHead,
    list: table.tbody,
    logo,
    btnAdd: buttonsGroup.btns[0],
    btnDel: buttonsGroup.btns[1],
    formOverlay: form.overlay,
    form: form.form,
  };
};

const renderContacts = (storage, $) => {

  while ($.list.firstChild) {
    $.list.removeChild($.list.firstChild);
  }

  Object.entries(storage.data).forEach(([index, value]) => {
    const {id, name, sirname, phone} = value;
    const row = createRow({id, name, sirname, phone});
    $.list.append(row);
  });
};

export default {
  renderPhonebook,
  renderContacts
};