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

const createId = () => {
  let ID = ``;
  const characters = '0123456789';
  for (let i = 0; i < 9; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 10));
  }
  return ID;
};

export default {
  createContainer,
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createSingleButton,
  createTable,
  createForm,
  createFooter,
  createRow,
  createId,
};