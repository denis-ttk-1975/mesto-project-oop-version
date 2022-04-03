import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector(".form");
    this._formButton = this._form.querySelector(".form__button");
  }
  //собирает данные импутов формы
  _getInputValues() {
    this._inputElements = this._form.querySelectorAll(".form__edit");
    this._objInputs = {};
    this._inputElements.forEach((inputElement) => {
      console.log(inputElement)
      this._objInputs[inputElement.name] = inputElement.value;
    })
    return this._objInputs
  }
  setEventListeners() {
    // забирает из родительского класса обработчик закрытия попапа
    super.setEventListeners();
    //обработчик клика "сохранить" в форме
    this._formButton.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // исполняет функцию сохранения, взяв данные, которые ввели в инпуты формы
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
