import  Card from  './Card.js';
import  FormValidatior from './FormValidator.js'

export {openPopup, popupView};

//------------------------------------------Выбираем эелементы DOM------------------------------------------------

//popup 
const popupProfile = document.querySelector(".popup_edit_profile");
const popupCard = document.querySelector(".popup_add_card");
const popupView = document.querySelector(".popup_view_foto");
//popup__overlay
const popupOverlayProfile = document.querySelector(".popup__overlay-profile");
const popupOverlayAddCard = document.querySelector(".popup__overlay-add-card");
const popupOverlayViewFoto = document.querySelector(".popup__overlay-view-foto");

//кнопки для открытия popup
const openPopupProfileBtn = document.querySelector(".profile__edit-button");
const openPopupCardBtn = document.querySelector(".profile__add-button");

//кнопки для закрытия popup
const closePopupProfileBtn = document.querySelector(".popup__close-button");
const closePopupCardBtn = document.querySelector(".popup__close-button_card");
const closePopupViewBtn = document.querySelector(".popup__close-button_view");

//кнопки сохрарнения
const saveProfileButton = document.querySelector(".popup__form-button");
const saveCardButton = document.querySelector(".popup__form-button_add_card");

//"формы"
const formProfileElement = document.querySelector("form[name=edit-profile]");
const formCardElement = document.querySelector("form[name=edit-card]");
const forms = document.querySelectorAll('.popup__form',);
  //массив из форм
const formList = Array.from(forms);

//DOM .profile__name и .profile__discript
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__discript");

//DOM input для  дальнейшего изменения значений формы и их передачу
const formName = document.querySelector(".popup__input_value_name");
const formJob = document.querySelector(".popup__input_value_job");
const formCardName = document.querySelector(".popup__input_card_name");
const formCardSrc = document.querySelector(".popup__input_card_src");

//DOM .gallery__cards куда будем вставлять наш temlate (.append)
const galleryContainer = document.querySelector(".gallery__cards");


//----------------------------------------Функции откртия, закртия popup--------------------------------------------------

//Создаем универсальную функцию по открытию popup через ввод параметра (параметр - переменная класса)
//Добаим обработчк событий (закрытие) на клавишу Escape для открытого попапа.
//(keyup, так как по себе знаю, иногда желательно подержать открытое окошко
//чекнуть данные, которые навводил

//Функция открытия попапа и вешаем слушатель кнопки esc
function openPopup(item) {
  item.classList.add("popup_opened");
  window.addEventListener('keyup', closePopupOnEsc)
}

//Функция закрытия попапа при нажатии esc и снятия листнера
function closePopupOnEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
    window.removeEventListener('keyup', closePopupOnEsc) 
  }
}

//Создаем универсальную функцию по закртию popup и снимаем листнер клавиши esc
const closePopup = () => {
  const openedPopup = document.querySelector('.popup_opened')
  openedPopup.classList.remove("popup_opened");
  window.removeEventListener('keyup', closePopupOnEsc)
}

//----------------------------------------отправка формы и валидация------------------------------------------------


function handleProfileSubmit(evt) {
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closePopup();
}

//Создаем функцию по получению данных из значений формы добавления карточки и их отправке
function handleCardSubmit(evt) {
  const cardData = {
    name: formCardName.value,
    link: formCardSrc.value
  }
  galleryContainer.prepend(crateCard(cardData, '#card_template'));
  closePopup();
  saveCardButton.classList.add('popup__form-button_inactive');
  saveCardButton.setAttribute('disabled', true);
  formCardElement.reset();
}

//конфиг для валидации формы
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__form-message-error_active'
}

  //Для каждой формы врубаем валидацию - дерагем (ручку) метод класса по включению валидации
formList.forEach((element) => {
  const formValidator = new FormValidatior(config, element);
  formValidator.enableValidation();
}
)

//---------------------------------------------------------карточки ------------------------------------------------

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// функция по созданию карточки которая дергает метод из класса по созданию картчоки
function crateCard (cardData, template) {
  const card = new Card (cardData, template);
  return card.renderCard();
}

//Обойдем массив с данными для создания карточек при закгрузке страницы

initialCards.forEach(function (element) {
  galleryContainer.append(crateCard(element, '#card_template'));
})

//---------------------------------------подготовка попапа профайла к откртию------------------------------------------------
/* Я открываю попап редактирования профайла, (все ок).
далее начинаю редактировать форму.
любой импут формы довожу до состояния ошибки. (функция проверки отрабатывает на ура, все ок.)
закрываю попап крестом, ескейпом или кликом по оверлею.
открывю попап - данные в значения импутов передались, евента импута от юзера при этом не было.
ипуты хоть и заполнены, но горят красным....
 */
//для устранения этой проблемы - создаим функцию проверки импутов и повесим ее на каждое открытие попапа.
//передадим состояние кнопки сохранения.
//универсально не повесим иначе попап с добавлением карточки, будет сразу ругатся на пустые поля.

const checkProfileImput = ()  => {
  const inputList = Array.from(formProfileElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    const errorElement = formProfileElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__form-message-error_active');
    saveProfileButton.classList.remove('popup__form-button_inactive');
    saveProfileButton.removeAttribute('disabled');
  });
}

//---------------------------------------Слушатели на кнопках и активация их действий------------------------------------------------
//Вешаем слушатель на кнопку открытия popup для редактирования профайла
//передаем функцию с параметрами.

openPopupProfileBtn.addEventListener("click", function() {
  checkProfileImput();
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  openPopup(popupProfile);
});

//Вешаем слушатель на кнопку открытия popup для добавления фотографии
openPopupCardBtn.addEventListener("click", () => openPopup(popupCard)); 

//Вешаем слушатель на кнопку креста popupProfile
closePopupProfileBtn.addEventListener("click", closePopup);

//Вешаем слушатель на кнопку креста popupCard
closePopupCardBtn.addEventListener("click", closePopup);

//Вешаем слушатель на кнопку креста popupCard
closePopupViewBtn.addEventListener("click", closePopup);

//Вешаем слушатель на закрытие Popup при клике на overlay разных попапов.
popupOverlayProfile.addEventListener("click", closePopup);
popupOverlayAddCard.addEventListener("click", closePopup);
popupOverlayViewFoto.addEventListener("click", closePopup);

//Вешаем слушатель на форму по действию submit (нажатие enter и\или click по конпке формы)
formProfileElement.addEventListener("submit", handleProfileSubmit);
formCardElement.addEventListener("submit", handleCardSubmit);