//Выберем popup и кнопки для открытия и закрытия popup
let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-button');

// Выберем DOM .profile__name и .profile__discript
// для дальнейшего изменения textContent
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__discript');

// Выберем DOM .popup__form-name и .popup__form-about
// для  дальнейшего изменения значений формы и их передачу
let formName = document.querySelector('.popup__form-name');
let formJob = document.querySelector('.popup__form-about');

// Выберем кнопку сохрарнения
let saveButton = document.querySelector('.form__button');

// Выберем "форму"
let formElement = document.querySelector('.popup__form');

//Создаем функцию  по открытию popup через 
//(добавление класса) и при открытии  передаем в форму значения аргумента. 
function openPopup(popupName, popupjob) {
  popup.classList.add('popup_opened');
  document.querySelector('.popup__form-name').value = popupName;
  document.querySelector('.popup__form-about').value = popupjob;
}

//Вешаем слушатель на конпку 
//выполняем функцию в которую передаем аргументы текста из профиля. 
openPopupBtn.addEventListener('click', function() {
  openPopup(profileName.textContent, profileJob.textContent);
});

//Создаем функцию  по закрытию popup через 
//(удаление класса), так как при нажатии крестика, сихранение и отправка формы 
//не происходит,то больше функция ничего не умеет
function closePopup() {
  popup.classList.remove('popup_opened');
}

//Вешаем слушатель на кнопку креста и выполняем функцию по закрытию.
closePopupBtn.addEventListener('click', function() {
  closePopup();
});

//Создаем функцию по получению данных из значений форм и их отправке
// + обнуляем стандартную форму отправки
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closePopup();
}

//Вешаем слушатель на форму по действию submit (нажатие enter и\или click по конпке формы)
formElement.addEventListener('submit', formSubmitHandler);