//------------------------------------------Выбираем эелементы DOM------------------------------------------------

//Выберем popup 
const popupProfile = document.querySelector(".popup_edit_profile");
const popupCard = document.querySelector(".popup_add_card");
const popupView = document.querySelector(".popup_view_foto");

//кнопки для открытия popup
const openPopupProfileBtn = document.querySelector(".profile__edit-button");
const openPopupCardBtn = document.querySelector(".profile__add-button");

//кнопки для закрытия popup
const closePopupProfileBtn = document.querySelector(".popup__close-button");
const closePopupCardBtn = document.querySelector(".popup__close-button_card");
const closePopupViewBtn = document.querySelector(".popup__close-button_view");

// Выберем кнопки сохрарнения
const saveProfileButton = document.querySelector(".popup__form-button");
const saveCardButton = document.querySelector(".popup__form-button_add_card");

// Выберем "формы"
const formProfileElement = document.querySelector("form[name=edit-profile]");
const formCardElement = document.querySelector("form[name=edit-card]");

// Выберем DOM .profile__name и .profile__discript
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__discript");

//Выберем DOM input для  дальнейшего изменения значений формы и их передачу
const formName = document.querySelector(".popup__input_value_name");
const formJob = document.querySelector(".popup__input_value_job");
const formCardName = document.querySelector(".popup__input_card_name");
const formCardSrc = document.querySelector(".popup__input_card_src");

//выбираем поля картинки и описания в попапе просмотра картинок
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Выберем DOM .gallery__cards куда будем вставлять наш temlate (.append)
const galleryContainer = document.querySelector(".gallery__cards");

//----------------------------------------Функции откртия, закртия popup--------------------------------------------------

//Создаем универсальную функцию по открытию popup через ввод параметра (параметр - переменная класса)
function openPopup(item) {
  item.classList.add("popup_opened");
}

//Создаем универсальную функцию по закртию popup через ввод параметра (параметр - переменная класса)
function closePopup(item) {
  item.classList.remove("popup_opened");
}

//----------------------------------------отправка формы--------------------------------------------------

//Создаем функцию по получению данных из значений формы редактирования профайла и их отправке
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closePopup(popupProfile);
}

//Создаем функцию по получению данных из значений формы добавления карточки и их отправке
function formSubmitHandlerCard(evt) {
  evt.preventDefault();
  cardData (formCardSrc.value, formCardName.value, 'prepend');
  closePopup(popupCard);
  formCardElement.reset();
}

//-----------------------------------Функция создания карточки из шаблона-------------------------------------------------------

function cardData (link, dsc, place) {
  const photoTemplate = document.querySelector('template').content;
  const photoElement = photoTemplate.querySelector('.gallery__card').cloneNode(true);
  photoElement.querySelector('.gallery__photo').src = link;
  photoElement.querySelector('.gallery__text').textContent = dsc;
  photoElement.querySelector('.gallery__photo').alt = dsc;
  //Делаем кнопку Like активной
  photoElement.querySelector('.gallery__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like-button_active'); 
  });
  //Делаем кнопку Trash активной
  photoElement.querySelector('.gallery__trash-button').addEventListener('click', function () {
    const allCard = photoElement.querySelector('.gallery__trash-button').closest('.gallery__card');
    allCard.remove(); 
  });
  //Делаем картинку активной
  photoElement.querySelector('.gallery__photo').addEventListener('click', function () {
    openPopup(popupView);
    popupImage.src = link;
    popupCaption.textContent = dsc;
  });
  //Выбираем куда будем добавлять карточку.
  if (place) {
    galleryContainer.prepend(photoElement);
  } else {
    galleryContainer.append(photoElement);
  }
}

//-----------------------------------Автозаполнение стартовых карточек в gallery-------------------------------------------------------

//массив с данными
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

//перебераем массив, записи данных из массива передаем в значения карточки шаблона
//Карточки будут добавлены в начало, так как парамерт place к функции создания карточки не передается.
initialCards.forEach(function (element) {
    cardData (element.link, element.name)
})

//---------------------------------------Слушатели на кнопках и активация их действий------------------------------------------------

//Вешаем слушатель на кнопку открытия popup для редактирования профайла
//передаем функцию с параметрами.
openPopupProfileBtn.addEventListener("click", function() {
  openPopup(popupProfile);
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
});

//Вешаем слушатель на кнопку открытия popup для добавления фотографии
openPopupCardBtn.addEventListener("click", function() {
  openPopup(popupCard);
});

//Вешаем слушатель на кнопку креста popupProfile
closePopupProfileBtn.addEventListener("click", function() {
  closePopup(popupProfile);
});

//Вешаем слушатель на кнопку креста popupCard
closePopupCardBtn.addEventListener("click", function() {
  closePopup(popupCard);
});

//Вешаем слушатель на кнопку креста popupCard
closePopupViewBtn.addEventListener("click", function() {
  closePopup(popupView);
});

//Вешаем слушатель на форму по действию submit (нажатие enter и\или click по конпке формы)
formProfileElement.addEventListener("submit", formSubmitHandlerProfile);
formCardElement.addEventListener("submit", formSubmitHandlerCard);