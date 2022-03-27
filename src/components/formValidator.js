export class FormValidator {
  constructor(validationConfig, fieldset) {
    this._inputs = Array.from(fieldset.querySelectorAll(validationConfig.inputSelector))
    this._validationConfig = validationConfig
    this._form = fieldset.closest(validationConfig.formSelector)
    this._button = this._form.querySelector(validationConfig.submitButtonSelector)
    this._validationStatus = false
  }

  //Возвращает массив Inputs
  getInputsArray() {
    return this._inputs
  }

  //Узнать валидна форма или нет. Метод ориентируется на состояние кнопки сабмит
  //Обращайся к нему только когда форма открыта
  getValidationStatus() {
    return this._validationStatus
  }

  //Мгновенная валидация формы
  validate() {
    this._inputs.forEach(inputElement => {
        this._isValid(inputElement)
        this._toggleButtonState()
    })
  }

  //функця валидации полей - показать ошибку
  _showInputError(inputElement, errorElement, errorMessage) {
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._validationConfig.errorClass)
    inputElement.classList.add(this._validationConfig.inputErrorClass)
  }

  //функця валидации полей - скрыть ошибку
  _hideInputError(inputElement, errorElement) {
    errorElement.textContent = ''
    errorElement.classList.remove(this._validationConfig.errorClass)
    inputElement.classList.remove(this._validationConfig.inputErrorClass)
  }

  //функция проверки валидности поля
  _isValid(inputElement) {
  const errorElement = this._form.querySelector(`.form__item_type_error-${inputElement.id}`)
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage
      this._showInputError(inputElement, errorElement, errorMessage)

    } else {
      this._hideInputError(inputElement, errorElement)

    }
  }

  //функция проверки наличия невалидного поля в форме
  _hasInvalidInput(inputListArray) {
    return inputListArray.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся фунцкция вернёт true
      return !inputElement.validity.valid
    })
  }

  // функция для дезактивации кнопки в форме
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputs)) {
      this._button.classList.add(this._validationConfig.inactiveButtonClass)
      this._button.setAttribute('disabled', true)
      this._validationStatus = false

    } else {
      this._button.classList.remove(this._validationConfig.inactiveButtonClass)
      this._button.removeAttribute('disabled')
      this._validationStatus = true

    }
  }

  //добавление полям формы обработчиков
  _setEventListeners() {
    this._inputs.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement)
        this._toggleButtonState()
      })
    })
  }

  //включение валидации на форме
  enableValidation() {
    const handFormSumit = (event) => {
      event.preventDefault()
    }

    this._form.addEventListener("submit", handFormSumit)
    this._setEventListeners()
  }
}