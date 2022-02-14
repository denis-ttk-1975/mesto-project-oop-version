const showInputError = (inputElement, errorMessage) => {
    const errorMessageElement = inputElement.closest('.form__edit').querySelector('.form__item_type_error');
    console.log(errorMessageElement);
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.classList.add("form__item_type_active");
    inputElement.classList.add("form__item_type_error");
}
const hideInputError = (inputElement) => {
    inputElement.classList.remove("form__item_type_active");
}

const checkImputValidity = (inputElement) => {
    const isInputValid = inputElement.validity.valid
    if (!isInputValid){
        const errorMessage = inputElement.validationMessage;
        showInputError(inputElement, errorMessage)
    } else {
        hideInputError(inputElement)
    }
}

const setEventLiseners = (formElement) => {
  const inputList = formElement.querySelectorAll(".form__item");
  const inputListArray = Array.from(inputList);
  const submitButtonElement = formElement.querySelector(".form__button");
  inputListArray.forEach(inputElement => {
    inputElement.addEventListener("input", (event) => {
      const {value} = event.target;
      checkImputValidity(inputElement);
    });
    
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".form");
  const formListArray = Array.from(formList);
  const handFormSumit = (event) => {
    event.preventDefault();
  };

  formListArray.forEach(formElement => {
    formElement.addEventListener("submit", handFormSumit);
    setEventLiseners(formElement)
  });
};
enableValidation();
