//объект настроек
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  errorClass: 'form__item_type_active',
  inputErrorClass:'form__input-error',
}
//функця валидации полей - показать ошибку
const showInputError = (inputElement, errorElement, errorMessage, config) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
};
//функця валидации полей - скрыть ошибку
const hideInputError = (inputElement, errorElement, config) => {
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
};
//функция проверки валидности поля
const isValid = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.form__item_type_error-${inputElement.id}`);
  const isInputValid = inputElement.validity.valid;
  if (!isInputValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(inputElement, errorElement, errorMessage, config);
  } else {
    hideInputError(inputElement, errorElement, config);
  }
};
//добавление полям формы обработчиков
const setEventListeners = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const inputListArray = Array.from(inputList);
  //const submitButtonElement = formElement.querySelector(".form__button");
  inputListArray.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
    });
  });
};
// включение валидации 
const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  const formListArray = Array.from(formList);
  const handFormSumit = (event) => {
    event.preventDefault();
  };
  formListArray.forEach(formElement => {
    formElement.addEventListener("submit", handFormSumit);
    setEventListeners(formElement, config);
  });
};
enableValidation(validationConfig);
