//------------------------------------------Выбираем эелементы DOM------------------------------------------------

//popup 
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

//кнопки сохрарнения
const saveProfileButton = document.querySelector(".popup__form-button");
const saveCardButton = document.querySelector(".popup__form-button_add_card");

//"формы"
const formProfileElement = document.querySelector("form[name=edit-profile]");
const formCardElement = document.querySelector("form[name=edit-card]");

//DOM .profile__name и .profile__discript
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__discript");

//DOM input для  дальнейшего изменения значений формы и их передачу
const formName = document.querySelector(".popup__input_value_name");
const formJob = document.querySelector(".popup__input_value_job");
const formCardName = document.querySelector(".popup__input_card_name");
const formCardSrc = document.querySelector(".popup__input_card_src");

//поля картинки и описания в попапе просмотра картинок
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

//DOM .gallery__cards куда будем вставлять наш temlate (.append)
const galleryContainer = document.querySelector(".gallery__cards");

//находим контент шаблона
const photoTemplate = document.querySelector('template').content;

//----------------------------------------Функции откртия, закртия popup--------------------------------------------------

//Создаем универсальную функцию по открытию popup через ввод параметра (параметр - переменная класса)
function openPopup(item) {
  item.classList.add("popup_opened");
}

//Создаем универсальную функцию по закртию popup через ввод параметра (параметр - переменная класса)
function closePopup(item) {
  item.classList.remove("popup_opened");
}

//----------------------------------------Функции обработки событий карточки--------------------------------------------------

//Создаем  функцию по вкл\выкл кнопки лайка
function handleLike(evt) {
  evt.target.classList.toggle('gallery__like-button_active');
 } 

 //Создаем  функцию удалению карточки
 function dropObject (element) {
    element.remove();
  }

 //Делаем функцию по откртию попапа с картинкой при клике на картинку.
 function openImageView(element) {
   return function openImagePopup () {
      openPopup(popupView);
      popupImage.src = element.link;
      popupCaption.textContent = element.name;
 }
}

//----------------------------------------отправка формы--------------------------------------------------

//Создаем функцию по получению данных из значений формы редактирования профайла и их отправке
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closePopup(popupProfile);
}

//Создаем функцию по получению данных из значений формы добавления карточки и их отправке
function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: formCardName.value,
    link: formCardSrc.value
  }
  galleryContainer.prepend(createCard(cardData))
  closePopup(popupCard);
  formCardElement.reset();
}

//-----------------------------------Функция создания карточки из шаблона-------------------------------------------------------

function createCard (cardData) {
  //клонируем контент шаблона
  const photoElement = photoTemplate.querySelector('.gallery__card').cloneNode(true);
  //Выбираем элементы которые будем изменять
  const galleryPhoto = photoElement.querySelector('.gallery__photo');
  const galleryText = photoElement.querySelector('.gallery__text');
  const galleryTrashButton = photoElement.querySelector('.gallery__trash-button');
  const galleryLikeButton =  photoElement.querySelector('.gallery__like-button')
  // вставляем значения из объекта - аргумента функции в клонируемый контент
  galleryPhoto.src = cardData.link;
  galleryText.textContent = cardData.name;
  galleryPhoto.alt = cardData.name;
  //Делаем кнопку Like активной
  galleryLikeButton.addEventListener('click', handleLike);
  //Делаем кнопку Trash активной
  galleryTrashButton.addEventListener('click', () => dropObject(photoElement)); 
  //Делаем картинку активной
  galleryPhoto.addEventListener('click', openImageView(cardData))
  //"Возвращаем" полученую карточку.
  return photoElement
}

//перебераем массив, записи данных из массива передаем в значения карточки шаблона
//массив в отдельном файле.

initialCards.forEach(function (element) {
  galleryContainer.append(createCard(element));
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
openPopupCardBtn.addEventListener("click", () => openPopup(popupCard)); 

//Вешаем слушатель на кнопку креста popupProfile
closePopupProfileBtn.addEventListener("click", () => closePopup(popupProfile));

//Вешаем слушатель на кнопку креста popupCard
closePopupCardBtn.addEventListener("click", () =>  closePopup(popupCard));

//Вешаем слушатель на кнопку креста popupCard
closePopupViewBtn.addEventListener("click", () => closePopup(popupView));

//Вешаем слушатель на форму по действию submit (нажатие enter и\или click по конпке формы)
formProfileElement.addEventListener("submit", handleProfileSubmit);
formCardElement.addEventListener("submit", handleCardSubmit);