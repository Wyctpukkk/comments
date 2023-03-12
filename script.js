inputName = document.querySelector('.form__input_name');
inputText = document.querySelector('.form__input_text');
inputDate = document.querySelector('.form__actions_date');
sendComment = document.querySelector('.form__actions_send');
errorName = document.querySelector('.errorName');
errorText = document.querySelector('.errorText');
commentsList = document.querySelector('.comments');

let name;
let text;
let date = new Date();

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
  date = value;
}

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
          <button class="comments__btn_like">
            <img src="/img/heart-empty.svg" alt="like" />
          </button>
          <button class="comments__btn_delete">
            <img src="/img/remove.svg" alt="delete" />
          </button>
        </div>
      </div>
    </div>`;
    commentsList.append(div);
  } else {
    console.log('валидация не пройдена');
  }
}
