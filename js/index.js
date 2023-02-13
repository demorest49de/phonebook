import serviceStorage from './modules/serviceStorage.js';
import control from './modules/control.js';
import render from "./modules/render.js";
import {sortColumnUpDown} from "./modules/sort.js";

const {renderPhonebook} = render;

const {
  openForm, closeForm, toggleDelButton, removeRow, hoverRows, submitFormData, editRow
} = control;

{
  const init = (selectorApp, title) => {
    const nameApp = 'phoneBook';
    const app = document.querySelector(selectorApp);
    const phonebook = renderPhonebook(app, title);
    const {tHead, list, logo, btnAdd, btnDel, formOverlay, form} = phonebook;
    const mainVars = {tHead, list, logo, btnAdd, btnDel, formOverlay, form, nameApp, title};

    // Функционал

    openForm(mainVars);

    closeForm(mainVars);

    toggleDelButton(mainVars);

    removeRow(mainVars);

    hoverRows(mainVars);

    submitFormData(mainVars);

    editRow(mainVars);

    sortColumnUpDown(mainVars);

    serviceStorage.handleStorage(mainVars)
  };

  window.phoneBookInit = init;
}