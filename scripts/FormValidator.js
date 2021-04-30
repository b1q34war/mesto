export default class FormValidation {
  constructor (config, form) {
    this._config = config; //конфиг формы
    this._form = form; //форма

    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector)); //нашли все импуты в форме
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector); //нашли кнопку сабмита
  }
    //Проверка валидности импута (возвращаем его состояние)
  _hasInvalidInput = (inputlist)  => {
    return inputlist.some(inputElement => !inputElement.validity.valid);
  }
    //изменение состояния кнопки и ее стиля
  _toggleButtonState = (inputlist) => {
    if (this._hasInvalidInput(inputlist)) {
      // Если не валиден импут красим
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      //если валиден убираем подкраску
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };
    //показ ошибки и подкраска импута
  _showInputError = (inputElement) => {
    //Находим элемент куда будем вставлять текст ошибки
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    //Подкраска импута
    inputElement.classList.add(this._config.inputErrorClass);
    //Вставляем текст ошибки
    errorElement.textContent = inputElement.validationMessage;
    //Сделаем объект видимым
    errorElement.classList.add(this._config.errorClass);
  };
    //скрытие ошибки и подкраски импута
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass)
  };
    //для формы и каждого импута проверяем валидность
  _checkInput = (inputElement) => {
    if (inputElement.validity.valid) {
      //если валидно прячем ошибки (вызов метода по скрытию ошибок)
      this._hideInputError(inputElement);
    } else {
      //если не валидно показываем ошибки (вызов метода по показу ошибок)
      this._showInputError(inputElement);
    }
  };

    //Включаем листнер на объектах формы и формах.
    //выключим стандартное поведение сабмита для форм.
  _setInputListners = () => {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
      //для каждого импута вызываем функцию проверки импута при каждом импуте юзером
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (event) => {
        this._checkInput(inputElement);
        //для конпки вызовем функцию переклювчения состояния и вида в зависимости от состояния импута (валидно или нет)
        this._toggleButtonState(this._inputList);
      });
    });
      //проверяем\изменяем первоночальное состояние кнопки
    this._toggleButtonState(this._inputList);
  }; 

  enableValidation() { //внешний метод (ручка) - вызываем метод с включением листнеров.
    this._setInputListners();
  }
}