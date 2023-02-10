import serviceStorage from './modules/serviceStorage.js';
import createElement from './modules/createElement';
import control from './modules/control.js';
import render from "./modules/render";
import sort from "./modules/sort";

const {sortColumnUpDown} = sort;

const {renderPhonebook} = render;

const {handleStorage} = serviceStorage;

const {} = createElement;

const {
  openForm, closeForm, toggleDelButton, removeRow, hoverRows, saveEditformData, editRow
} = control;

{
  const init = (selectorApp, title) => {
    const nameApp = 'phoneBook';
    const app = document.querySelector(selectorApp);
    const phonebook = renderPhonebook(app, title);
    const {tHead, list, logo, btnAdd, btnDel, formOverlay, form} = phonebook;

    const mainVars = new mainVars(tHead, list, logo, btnAdd, btnDel, formOverlay, form, nameApp);

    // Функционал

    openForm(btnAdd, form, formOverlay);

    closeForm(formOverlay);

    toggleDelButton(btnDel);

    removeRow(list);

    hoverRows(list, logo);

    saveEditformData(form, list, formOverlay, nameApp);

    editRow(list, formOverlay, form);

    sortColumnUpDown(tHead);

    handleStorage(tHead, list);
  };

  window.phoneBookInit = init;
}

export class mainVars {
  constructor(tHead,
              list,
              logo,
              btnAdd,
              btnDel,
              formOverlay,
              form,
              nameApp) {
    this.tHead = tHead;
    this.list = list;
    this.logo = logo;
    this.btnAdd = btnAdd;
    this.btnDel = btnDel;
    this.formOverlay = formOverlay;
    this.form = form;
    this.nameApp = nameApp;
  }
}