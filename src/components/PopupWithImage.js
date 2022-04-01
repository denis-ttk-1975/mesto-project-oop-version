import {Popup} from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
//метод для открытия попапа
open() {
    document.querySelector(this.popupSelector).classList.add("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose());
  }

}