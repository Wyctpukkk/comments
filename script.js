const inputName = document.querySelector('.form__input_name');
const inputText = document.querySelector('.form__input_text');
const inputDate = document.querySelector('.form__actions_date');
const sendComment = document.querySelector('.form__actions_send');
const errorName = document.querySelector('.errorName');
const errorText = document.querySelector('.errorText');
const commentsList = document.querySelector('.comments');

let name;
let text;
let d = new Date();
const currentTimeString = `${
  d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
let date = `Сегодня в ${currentTimeString}`;

const regexpName = /^[а-я]/;

let validateName = false;
let validateText = false;

inputName.addEventListener('input', (e) => validatorName(e.target.value));
inputText.addEventListener('input', (e) => validatorText(e.target.value));
inputDate.addEventListener('input', (e) => setDate(e.target.value));
sendComment.addEventListener('click', (e) => createComment(e));

function validatorName(value) {
  value == ''
    ? ((errorName.innerHTML = 'Не оставляйте поле пустым'),
      (validateName = false))
    : value.toLowerCase().match(regexpName)
    ? ((errorName.innerHTML = ''), (name = value), (validateName = true))
    : ((errorName.innerHTML = 'Используйте кириллицу'), (validateName = false));
}

function validatorText(value) {
  value == ''
    ? ((errorText.innerHTML = 'Не оставляйте поле пустым'),
      (validateText = false))
    : value.toLowerCase().match(regexpName)
    ? ((errorText.innerHTML = ''), (text = value), (validateText = true))
    : ((errorText.innerHTML = 'Используйте кириллицу'), (validateText = false));
}

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

function addLike() {
  btnLike = [...document.querySelectorAll('.comments__btn_like')];
  btnDelete = [...document.querySelectorAll('.comments__btn_delete')];
  btnLike.map((obj, _) => {
    obj.addEventListener('click', (e) => e.target.classList.toggle('active'));
  });
  btnDelete.map((obj, _) => {
    obj.addEventListener('click', (e) => console.log(e));
  });
  console.log(btnLike);
}
addLike();

function createComment(e) {
  e.preventDefault();

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
  } else {
    console.log('валидация не пройдена');
  }
  addLike();
  clearInputs();
}

function clearInputs() {
  inputName.value = '';
  inputText.value = '';
}
