//! функция проверки есть ли у карточки лайк поставленный текущим пользователем ранее и сохраненный в массиве на сервере
//! кладу в глобальную область видимости чтоб было видно в классе Card
//! ? возможно надо перенести все функции в utils ?

function findUserLike(likeData, myUserId) {
  return likeData.some(function (likerData) {
    return myUserId === likerData._id;
  });
}
// ОБЪЯВЛЕНИЕ КЛАССА Card
export class Card {
  // в конструктор передаются объект с данными о карточке, ID текущего пользователя,
  // селектор template карточки и объект с тремя функциями обработчиками слушателей
  constructor(
    card,
    userId,
    cardTemplateSelector,
    { likeHandler, trashHandler, imageClickHandler }
  ) {
    this._name = card.name;
    this._link = card.link;
    this._owner = card.owner;
    this._id = card._id;
    this._likes = card.likes; //массив с лайками
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._userId = userId;
    // колл-бэки для слушателей
    this._likeHandler = likeHandler;
    this._trashHandler = trashHandler;
    this._imageClickHandler = imageClickHandler;
  }

  _getElement() {
    const cardElement = this._cardTemplate
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like").addEventListener("click", () => {
      this._likeHandler();
    });

    if (this._element.querySelector(".card__trash")) {
      this._element
        .querySelector(".card__trash")
        .addEventListener("click", () => {
          this._trashHandler(this._id);
        });
    }

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._imageClickHandler();
      });
  }

  generate() {
    this._element = this._getElement();

    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__description").textContent = this._name;
    this._element.id = this._id;
    this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;

    // проверяем ставил ли наш пользователь лайк и если ставил то красим сердечко
    if (findUserLike(this._likes, this._userId)) {
      this._element
        .querySelector(".card__like")
        .classList.add("card__like_pos_active");
    }

    // удаляем кнопку удаления (корзинку) если карточка создана другим пользователем
    const cardTrash = this._element.querySelector(".card__trash");
    if (this._owner._id !== this._userId) {
      cardTrash.remove();
    }
    // генерируем слушатели на лайк, корзину и большую карточку
    this._setEventListeners();

    return this._element;
  }
}
