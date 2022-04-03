export class Section {
  constructor({ items = [], renderer }, selector) {
    this._itemsInfo = items;
    this.selector = selector;
    this._renderer = renderer;
    this.container = document.querySelector(selector);
  }

  //добавляет все карточки в контейнер
  renderAll(userId) {
    this.container.innerHTML = "";
    this._itemsInfo.forEach((element) => {
      this.container.append(this._renderer(element, userId));
    });
  }

  //Добавляет дом-элемент в контейнер
  addItem(element, userId) {
    this.container.prepend(this._renderer(element, userId));
  }

  //Добавлят информацию о карточках
  getInfo(info) {
    this._itemsInfo = Array.from(info);
  }

  //Покажет итемы в консоль
  showItems() {
    console.log(this._itemsInfo);
  }
}