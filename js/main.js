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

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('icon');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

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

    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')
        || target.classList.contains('btn-danger')
      ) {
        formOverlay.classList.remove('is-visible');
      }
    });

    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
      }
    });
    // использование задержек
    // setTimeout(() => {
    //   const contact =  createRow({
    //     name: 'andre',
    //     surname: 'shevchenko',
    //     phone: '+79066761878',
    //   });
    //   list.append(contact);
    // }, 2000);

    //стандартное поведение формы после отправки данных на форму происходит перезагрузка страницы
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      //при отправки данных на форму: извл-ние данных из формы, идет запрос на сервер, изменение данных в приложении, внешний вид
      // отправка данных на сервер по событию клик не верно!

      //получение данных из формы
      // непправильный способ - не правильный это поулчение данных с формы через queryselector это не правильно - ресурсозатратно и лишний код
      // правильный 1 способ - через поля по именам
      // console.log(': ',form.name.value);
      // console.log(': ',form.sirname.value);
      // console.log(': ',form.phone.value);
      // правильный 2 способ - formdata
      const formData = new FormData(e.target);

      // console.log(': ',formData.get('phone'));
      //интерировать можно с пом forof foreach или spread оператора
      // console.log(': ', [...formData.entries()]);
      //
      // console.log(': ', Object.fromEntries(formData.entries()));
    });

    // form.name.addEventListener('focus', e => {
    //   console.warn(': ', e.type, e.target.value);
    // });
    //
    // form.name.addEventListener('blur', e => {
    //   console.error(': ', e.type, e.target.value);
    // });
    //
    // form.name.addEventListener('change', e => {
    //   console.log(': ', e.type, e.target.value);
    // });

    tHead.querySelectorAll('tr th:not(:nth-child(1))').forEach((headerCell, column, nodelist) => {


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


    const sortTableByColumn = (column, sortSwitch) => {
      const dirModifier = sortSwitch ? 1 : -1;
      const rows = [...list.childNodes];
      const sortedRows = rows.sort((a, b) => {
        const aText = a.childNodes[column].textContent;
        const bText = b.childNodes[column].textContent;
        console.log(': ',column);
        console.log('aText: ', aText);
        console.log('bText: ', bText);
        return aText > bText ? (1 * dirModifier) : (-1 * dirModifier);
      });


      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      list.append(...sortedRows);
    };
  };

  window.phoneBookInit = init;
}
