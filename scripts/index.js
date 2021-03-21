//Выберем popup и кнопки для открытия и закрытия popup
let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-button');

// Выберем DOM .profile__name и .profile__discript
// для дальнейшего изменения textContent
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__discript');

// Выберем DOM popup__input_value_name и .popup__input_value_job
// для  дальнейшего изменения значений формы и их передачу
let formName = document.querySelector('.popup__input_value_name');
let formJob = document.querySelector('.popup__input_value_job');

// Выберем кнопку сохрарнения
let saveButton = document.querySelector('.popup__form-button');

// Выберем "форму"
let formElement = document.querySelector('.popup__form');

//Создаем функцию  по открытию popup через 
//(добавление класса) и при открытии  передаем в форму значения аргумента. 
function openPopup() {
  popup.classList.add('popup_opened');
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}

//Создаем функцию  по закрытию popup через 
//(удаление класса), так как при нажатии крестика, сихранение и отправка формы 
//не происходит,то больше функция ничего не умеет
function closePopup() {
  popup.classList.remove('popup_opened');
}

//Создаем функцию по получению данных из значений форм и их отправке
// + обнуляем стандартную форму отправки
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closePopup();
}

//Вешаем слушатель на конпку 
//выполняем функцию в которую передаем аргументы текста из профиля. 
openPopupBtn.addEventListener('click', openPopup);

//Вешаем слушатель на кнопку креста и выполняем функцию по закрытию.
closePopupBtn.addEventListener('click', closePopup);

//Вешаем слушатель на форму по действию submit (нажатие enter и\или click по конпке формы)
formElement.addEventListener('submit', formSubmitHandler);