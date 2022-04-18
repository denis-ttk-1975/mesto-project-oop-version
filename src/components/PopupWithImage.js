import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this.popup.querySelector(".popup__image"); //изображение в попапе, определенном по селектору из Popup
    this.title = this.popup.querySelector(".popup__title"); //подпись изображения в попапе, определенном по селектору из Popup
  }
  //метод для открытия попапа
  open(name, link) {
    this.title.textContent = name;
    this.image.alt = name;
    this.image.src = link;
    super.open();
  }
}
