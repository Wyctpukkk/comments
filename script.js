// получаю элементы из DOM дерева
const inputName = document.querySelector('.form__input_name');
const inputText = document.querySelector('.form__input_text');
const inputDate = document.querySelector('.form__actions_date');
const sendComment = document.querySelector('.form__actions_send');
const errorName = document.querySelector('.errorName');
const errorText = document.querySelector('.errorText');
const commentsList = document.querySelector('.comments');

// Инициализирую переменные
let name;
let text;
// Получаю дату и время
let d = new Date();
const currentTimeString = `${
  d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
// Для удобства помещаю текущее время в переменную
let date = `Сегодня в ${currentTimeString}`;

// Регулярные выражения для валидации Имени и Текста
const regexpName = /^[а-я]/;
const regexpText = /^[0-9A-ZА-ЯЁ]+$/i;

// Промежуточный контроль прохождения валидации
let validateName = false;
let validateText = false;

// Навешиваю обработчики событий на элементы
inputName.addEventListener('input', (e) => validatorName(e.target.value));
inputText.addEventListener('input', (e) => validatorText(e.target.value));
inputDate.addEventListener('input', (e) => setDate(e.target.value));
sendComment.addEventListener('click', (e) => createComment(e));
document.addEventListener('keydown', (e) => {
  e.code == 'Enter' ? createComment(e) : '';
});

// Функция валидации Имени
function validatorName(value) {
  value == ''
    ? ((errorName.innerHTML = 'Не оставляйте поле пустым'),
      (validateName = false))
    : value.toLowerCase().match(regexpName)
    ? ((errorName.innerHTML = ''), (name = value), (validateName = true))
    : ((errorName.innerHTML = 'Используйте кириллицу'), (validateName = false));
}

// Функция валидации Текста
function validatorText(value) {
  value == ''
    ? ((errorText.innerHTML = 'Не оставляйте поле пустым'),
      (validateText = false))
    : value.length < 20
    ? ((errorText.innerHTML = 'Не менее 20 символов'), (validateText = false))
    : value.toLowerCase().match(regexpText)
    ? ((errorText.innerHTML = ''), (text = value), (validateText = true))
    : ((errorText.innerHTML = 'Используйте только Латиницу, Кириллицу и Цифры'),
      (validateText = false));
}

// Функция установки времени в комментарий
function setDate(value) {
  let today = getDate();
  let yesterday = getDate(-1);
  if (new Date(today).getTime() == new Date(value).getTime()) {
    date = `Сегодня в ${currentTimeString}`;
  } else if (new Date(yesterday).getTime() == new Date(value).getTime()) {
    date = `Вчера в ${currentTimeString}`;
  } else {
    date = `${value} в ${currentTimeString}`;
  }
}

// Функция запроса времени и форматирования в удобный формат
function getDate(count = 0) {
  let d = new Date();
  d.setDate(d.getDate() + count);
  let year = d.getFullYear();
  let month =
    d.getMonth() + 1 < 10
      ? '0' + String(d.getMonth() + 1)
      : String(d.getMonth() + 1);
  let day = d.getDate() < 10 ? '0' + String(d.getDate()) : String(d.getDate());
  return year + '-' + month + '-' + day;
}

// Функция получающаяя актуальное количество комментариев, а так же
// функция навешивает обработчики событий на удалить и лайкнуть, а так же выполняет их
function actions() {
  btnLike = [...document.querySelectorAll('.comments__btn_like')];
  btnDelete = [...document.querySelectorAll('.comments__btn_delete')];
  btnLike.map((obj, _) => {
    obj.classList.contains('active')
      ? obj.addEventListener('click', (e) => {
          e.target.classList.remove('active');
          actions();
        })
      : obj.addEventListener('click', (e) => {
          e.target.classList.add('active');
          actions();
        });
  });
  btnDelete.map((obj, _) => {
    obj.addEventListener('click', (e) =>
      e.target.parentNode.parentNode.parentNode.parentNode.remove()
    );
  });
}
actions(); // самовызов функции при инициализации

function createComment(e) {
  e.preventDefault();

  // итоговая валидация
  if (validateName && validateText) {
    let div = document.createElement('div');
    div.innerHTML = `<div class="comments__item">
      <p class="comments__name">${name}</p>
      <p class="comments__text">
      ${text}
      </p>
      <div class="comments__actions">
        <p class="comments__date">${date}</p>
        <div class="comments__btn">
        <button class="comments__btn_like"></button>
        <button class="comments__btn_delete"></button>
        </div>
      </div>
    </div>`;
    commentsList.append(div);
    clearInputs();
  } else {
    errorText.innerHTML = 'Не оставляйте поле пустым';
    errorName.innerHTML = 'Не оставляйте поле пустым';
  }
  actions();
}

// Функция очищающаяя поля ввода при добавлении комментария
function clearInputs() {
  inputName.value = '';
  inputText.value = '';
  inputDate.value = '';
}
