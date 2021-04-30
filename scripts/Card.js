//Импортируем функции открытия попапа и селектор попапа в параметры функции
import {openPopup, popupView} from './index.js';



export default class Card {
    constructor(cardData, templateSelector) {
      this._cardData = cardData; //Параметры для карточки
      this._templateSelector = templateSelector //шаблон
      this._popupImage = document.querySelector(".popup__image");//картинка в попапе
      this._popupCaption = document.querySelector(".popup__caption");//подпись картинки в попапе
      this._element = this._cloneElement(); //Запишем полученный шаблон в переменную, дабы потом разово селектить нужные объекты.
      this._prepareChilds();//теперь класс знает об переменных внутри _prepareChilds 
    }
  
    //Клонируем теплейт
  _cloneElement () {
    this._cloneElement = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    return this._cloneElement;
    } 
  
    //Находим элементы в шаблоне, что нам далее понадобятся.
  _prepareChilds() {
    this._galleryPhoto = this._element.querySelector('.gallery__photo');
    this._galleryText = this._element.querySelector('.gallery__text');
    this._likeButton = this._element.querySelector('.gallery__like-button');
    this._galleryTrashButton = this._element.querySelector('.gallery__trash-button');
    } 
  
    // вставляем новые значения
  _makeElement () {
    this._galleryPhoto.src = this._cardData.link;
    this._galleryPhoto.alt = this._cardData.name;
    this._galleryText.textContent = this._cardData.name;
    }
  
    //Вешаем слушатели на объекты
  _makeEventListners () {
    this._likeButton.addEventListener('click', () => this._like());
    this._galleryTrashButton.addEventListener('click', () => this._remove()); 
    this._galleryPhoto.addEventListener('click',() => this._preview());
    }
  
    //тоггл кнопки лайка
  _like () {
    this._likeButton.classList.toggle('gallery__like-button_active');
    } 
  
    //Метод удаления элемента
  _remove () {
    this._element.remove();
    }
  
    //наполняем данными превью картинки
  _preview () {
    this._popupImage.src = this._cardData.link;
    this._popupImage.alt = this._cardData.name;
    this._popupCaption.textContent = this._cardData.name;
    openPopup(popupView);
    }
  
    //делаем достпный из вне метод с готовой и сгенерированной карточкой 
  renderCard () {
    this._makeElement(); //вернули измененный шаблон.
    this._makeEventListners();//Навесели слушаетелей.
    return this._element;
    }
  }