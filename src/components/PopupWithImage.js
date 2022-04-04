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
// или так:
// open(event) {
//     this.title.textContent = event.target.alt;
//     this.image.alt = event.target.alt;
//     this.image.src = event.target.src;
//     super.open()
//   }
//}
