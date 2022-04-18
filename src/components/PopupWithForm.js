import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector(".form");
    this._submitButton = this._form.querySelector(".form__button");
    this._inputList = this._form.querySelectorAll(".form__item");
  }
  //собирает данные импутов формы
  _getInputValues() {
    this._objInputs = {};
    this._inputList.forEach((inputElement) => {
      this._objInputs[inputElement.name] = inputElement.value;
    });
    return this._objInputs;
  }
  setEventListeners() {
    // забирает из родительского класса обработчик закрытия попапа
    super.setEventListeners();
    //обработчик клика "сохранить" в форме
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // исполняет функцию сохранения, взяв данные, которые ввели в инпуты формы
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
