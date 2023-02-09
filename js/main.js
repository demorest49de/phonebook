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
        <div class="hide-class form-id"></div>
        <div class="form-group">
          <label class="form-label" for="name">Имя:</label>
          <input class="form-input" name="name" id="name" type="text" data-id="" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="sirname">Фамилия:</label>
          <input class="form-input" name="sirname" 
          id="sirname" type="text" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="phone">Телефон:</label>
          <input class="form-input" name="phone" 
          id="phone" type="text" required>
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
    tdDel.setAttribute('data-id', id);
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('icon');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

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

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const handleHoverRow = (allRows, logo) => {
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

  const init = (selectorApp, title) => {
    const nameApp = 'phoneBook';
    const app = document.querySelector(selectorApp);
    const phonebook = renderPhonebook(app, title);
    const {tHead, list, logo, btnAdd, btnDel, formOverlay, form} = phonebook;

    // Функционал

    // handle open form
    btnAdd.addEventListener('click', () => {
      const addBtn = form.querySelector('button.btn-primary');
      form.querySelector('.form-title').textContent = 'Добавить контакт';
      console.log(': ', addBtn);
      addBtn.textContent = 'Добавить';
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

      if (target === target.closest('.del-icon')) {
        target.closest('.contact').remove();
        //remove from storage
        const contact = target.closest('.contact').querySelector('.delete[data-id]');

        if (contact.hasAttribute('data-id')) {
          removeFromStorage(contact.getAttribute('data-id'));
        }
      }
    });

    //hower rows
    const handleHowerRows = () => {
      list.addEventListener('mouseenter', e => {
        const target = e.target;
        if (target.querySelector('.contact')) {
          const allRows = list.querySelectorAll('.contact');
          handleHoverRow(allRows, logo);
        }
      });
    };
    handleHowerRows();

    //handle formData and save/change item to storage

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
          if(item.id === id){
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

    //handle column sort by pressing arrow up/down button by user
    tHead.querySelectorAll('tr th:not(:nth-child(1))')
      .forEach((headerCell, column) => {
        headerCell.addEventListener('click', () => {

          const sortSwitch = headerCell.classList.toggle('th-sort-asc');
          headerCell.classList.toggle('th-sort-desc', !sortSwitch);

          let temp = column + 1;

          const storage = getStorage();
          storage.sort = {column: temp, direction: sortSwitch};

          sortBy({column: temp, direction: sortSwitch});

          tHead.querySelectorAll('tr th:not(:nth-child(1))').forEach((cell, number) => {

            let temp = number + 1;
            if (column + 1 !== temp) {
              cell.classList.remove('th-sort-asc', 'th-sort-desc');
            }
          });
        });
      });

    //edit row
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.edit-icon')) {
        formOverlay.classList.add('is-visible');
        const title = form.querySelector('.form-title');
        title.textContent = 'Изменить контакт';
        const saveBtn = form.querySelector('button.btn-primary');
        console.log(': ', saveBtn);
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

    const getStorage = () => {
      const empty = createEmptyObject();
      const storage = localStorage.getItem(nameApp) ?
        localStorage.getItem(nameApp) : localStorage.setItem(nameApp, empty);
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

    const renderContacts = (storage) => {
      if (storage.data.length === 0) return;

      while(list.firstChild){
        list.removeChild(list.firstChild)
      }

      Object.entries(storage.data).forEach(([index, value]) => {
        const {id, name, sirname, phone} = value;
        const row = createRow({id, name, sirname, phone});
        list.append(row);
      });
    };

    const removeFromStorage = (id) => {
      const storage = getStorage();

      const data = storage.data;
      const result = data.filter(x => x.id !== id);
      storage.data = result;
      saveStorage(storage);
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

      renderContacts(storage);
      handleSorting(storage.sort);
    };

    handleStorage();
  };

  window.phoneBookInit = init;
}
