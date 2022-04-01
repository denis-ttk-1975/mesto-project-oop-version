export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
  }
  //метод для открытия попапа
  open() {
    document.querySelector(this.popupSelector).classList.add("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose());
  }
  //метод для закрытия попапа
  close() {
    document.querySelector(this.popupSelector).classList.remove("popup_opened");
    window.addEventListener("keydown", this._handleEscClose());
  }
  //метод для закрытия попапа при нажатии ESC
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
  //метод для навешивания слушателей
  setEventListeners = () => {
    document
      .querySelector(this.popupSelector)
      .addEventListener("mousedown", (event) => {
        if (event.target.classList.contains("popup_opened")) {
          this.close();
        }
        if (event.target.classList.contains("popup__close")) {
          this.close();
        }
      });
  };
}
