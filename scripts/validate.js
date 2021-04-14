//Проверка валидности импута (возвращаем его состояние)
const hasInvalidInput = (inputlist) => {
  return inputlist.some(inputElement => !inputElement.validity.valid);
}

//Функция изменения состояния кнопки и ее стиля
const toggleButtonState = (inputlist, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputlist)) {
    // Если не валиден импут красим
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    //если валиден убираем подкраску
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

//Функция показа ошибки у подкраска импута
const showInputError = (formElement, inputElement, validationConfig) => {
  //Находим элемент куда будем вставлять текст ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //Подкраска импута
  inputElement.classList.add(validationConfig.inputErrorClass);
  //Вставляем текст ошибки
  errorElement.textContent = inputElement.validationMessage;
  //Сделаем объект видимым
  errorElement.classList.add(validationConfig.errorClass);
};

//Функция скрытия ошибки и подкраски импута
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass)
};

//Для формы и каждого импута проверяем валидность
const checkInput = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.valid) {
    //если валидно прячем ошибки (вызов функции по скрытию ошибок)
    hideInputError(formElement, inputElement, validationConfig);
  } else {
    //если не валидно показываем ошибки (вызов функции по показу ошибок)
    showInputError(formElement, inputElement, validationConfig);
  }
};


//Включаем листнер на объектах формы и формах.
  //выключим стандартное поведение сабмита для форм.
const setInputListners = (formElement, validationConfig) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });
  //находим импуты формы и кнопку, передаем их в массив
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  //для каждого импута вызываем функцию проверки импута при каждом импуте юзером
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (event) => {
        checkInput(formElement, inputElement, validationConfig);
        //для конпки вызывем функцию переклювчения состояния и вида в зависимости от состояния импута (валидно или нет)
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  //проверяем\изменяем первоночальное состояние кнопки
  toggleButtonState(inputList, buttonElement, validationConfig);
}; 

//Функция включения валидации 
const enableValidation = (validationConfig) => {
  //находим  все формы и делаем массив
  const formElements = document.querySelectorAll(validationConfig.formSelector);
  const formList = Array.from(formElements);
  //для каждой формы из массива выполняем функцию по включнию листнеров
  formList.forEach((formElement) => {
    setInputListners(formElement, validationConfig);
  });
};

/* Вызов функции включения\проверки валидации с объектом в качестве аргументов функции*/ 
  enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__form-message-error_active'
});
