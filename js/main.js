'use strict';

{
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('div');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;
    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.className = className;
      button.type = type;
      button.textContent = text;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createSingleButton = ({className, type, text}) => {
    const button = document.createElement('button');
    button.className = className;
    button.type = type;
    button.textContent = text;

    return button;
  };

  const createTable = () => {
    const table = document.createElement('table');

    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend',
      `
      <tr>
      <th class="delete">Удалить</th>
      <th>Имя</th>
      <th>Фамилия</th>
      <th>Телефон</th>
      </tr>
      `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend',
      `
        <button class="close" type="button"></button>
        <h2 class="form-title">Добавить контакт</h2>
        <div class="form-group">
          <label class="form-label" for="name">Имя:</label>
          <input class="form-input" name="name" id="name" type="text" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="sirname">Фамилия:</label>
          <input class="form-input" name="sirname" 
          id="sirname" type="text" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="phone">Телефон:</label>
          <input class="form-input" name="phone" 
          id="phone" type="number" required>
        </div>
      `);


    const buttonsGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonsGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
      btns: buttonsGroup,
    };
  };

  const createFooter = (title) => {
    const footer = document.createElement('footer');
    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;
    footer.classList.add('footer');
    const pText = document.createElement('p');
    pText.textContent = `Все права защищены ©${title}`;
    footer.footerContainer.append(pText);
    return footer;
  };

  const renderPhonebook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonsGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
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

  const createRow = ({id, name: firstName, sirname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('icon');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdId = document.createElement('td');
    tdId.textContent = id;
    tdId.classList.add('hide-class');

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = sirname;

    const tdPhone = document.createElement('td');
    tdPhone.classList.add('phoneNumber');
    const phoneLink = document.createElement('a');
    tr.phoneLink = phoneLink;
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;

    tdPhone.append(phoneLink);

    const editButtonProps =
      {
        className: 'icon edit-icon',
        type: 'button',
        text: '',
      };

    const tdEdit = document.createElement('td');
    const buttonEdit = createSingleButton(editButtonProps);
    buttonEdit.classList.add('icon');
    buttonEdit.classList.add('edit-icon');
    tdEdit.append(buttonEdit);

    tr.append(tdId, tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phonebook = renderPhonebook(app, title);
    const {tHead, list, logo, btnAdd, btnDel, formOverlay, form} = phonebook;

    // Функционал

    const allRow = renderContacts(list, window.data);
    hoverRow(allRow, logo);

    // handle open form
    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    // handle close form
    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')
        || target.classList.contains('btn-danger')
      ) {
        formOverlay.classList.remove('is-visible');
      }
    });

    //handle toggle del buttons for each row
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });

    //remove row
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
      }
      const phone = target.closest('.contact').querySelector('.phoneNumber').textContent;
      removeStorage(phone);
    });

    //handle formData and save to storage
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      console.log(': ', data);
      const {name, sirname, phone} = data;
      const id = createId();
      const row = createRow({id, name, sirname, phone});
      list.append(row);
      form.reset();
      formOverlay.classList.remove('is-visible');

      setStorage({id, name, sirname, phone});
    });

    //handle column sort
    tHead.querySelectorAll('tr th:not(:nth-child(1))')
      .forEach((headerCell, column) => {
        headerCell.addEventListener('click', () => {

          const sortSwitch = headerCell.classList.toggle('th-sort-asc');
          headerCell.classList.toggle('th-sort-desc', !sortSwitch);

          sortTableByColumn(column + 1, sortSwitch);

          tHead.querySelectorAll('tr th:not(:nth-child(1))').forEach((cell, number) => {
            if (number !== column) {
              cell.classList.remove('th-sort-asc', 'th-sort-desc');
            }
          });
        });
      });

    //method for column sort
    const sortTableByColumn = (column, sortSwitch) => {
      const dirModifier = sortSwitch ? 1 : -1;
      const rows = [...list.childNodes];
      const sortedRows = rows.sort((a, b) => {
        const aText = a.childNodes[column].textContent.trim();
        const bText = b.childNodes[column].textContent.trim();
        localStorage.setItem('sort', JSON.stringify({column, sortSwitch}));
        return aText > bText ? (1 * dirModifier) : (-1 * dirModifier);
      });


      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      list.append(...sortedRows);
    };

    const getStorage = () => {
      return getLocalStorageData();
    };

    const restoreStoragedData = () => {
      const storageData = getStorage();

      Object.entries(storageData).forEach(([index, value]) => {
        if (!checkId(index)) return;
        const row = createRow({id: index, name: value.name, sirname: value.sirname, phone: value.phone});
        list.append(row);
      });
    };

    const setStorage = (contact) => {
      localStorage.setItem(contact.id, JSON.stringify(contact));
    };

    const removeStorage = (phone) => {
      const data = getStorage();
      Object.entries(data).forEach(([index, value]) => {
        if (value.phone === phone) {
          localStorage.removeItem(index);
        }
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

    //handle if id is id of contact
    const checkId = (id) => {
      const characters = '0123456789';
      for (let i = 0; i < id.length; i++) {
        if (!characters.includes(id[i])) return false;
      }
      return true;
    };

    const getLocalStorageData = () => Object.entries(localStorage)
      .reduce((acc, [key, value]) => {
        let newValue;
        try {
          newValue = JSON.parse(value);
        } catch {
          newValue = value;
        }
        return {
          ...acc,
          [key]: newValue,
        };
      }, {});

    const restoreSorting = () => {
      const sortingSettings = localStorage.getItem('sort');
      console.log(': ',sortingSettings);
      const parsedSettings = JSON.parse(sortingSettings);
      sortTableByColumn(parsedSettings.column, parsedSettings.sortSwitch);

      const th = tHead.querySelector(`th:nth-child(${parsedSettings.column + 1})`);
      parsedSettings.sortSwitch ? th.classList.add('th-sort-asc') : th.classList.add('th-sort-desc');
    };


    const handleStorage = () => {
      restoreStoragedData();
      restoreSorting();
    };

    handleStorage();
  };

  window.phoneBookInit = init;
}
