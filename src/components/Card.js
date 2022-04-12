// ОБЪЯВЛЕНИЕ КЛАССА Card
export class Card {
  // в конструктор передаются объект с данными о карточке, ID текущего пользователя,
  // селектор template карточки и объект с тремя функциями обработчиками слушателей
  constructor(
    card,
    userId,
    cardTemplateSelector,
    { handleLike, handleTrashClick, clickImage }
  ) {
    this._name = card.name;
    this._link = card.link;
    this._owner = card.owner;
    this._id = card._id;
    this._likes = card.likes; //массив с лайками
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._userId = userId;
    // колл-бэки для слушателей
    this._handleLike = handleLike;
    this._handleTrashClick = handleTrashClick;
    this._clickImage = clickImage;
  }

  _getElement() {
    const cardElement = this._cardTemplate.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like").addEventListener("click", () => {
      this._handleLike(this);
    });

    if (this._element.querySelector(".card__trash")) {
      this._element.querySelector(".card__trash").addEventListener("click", () => {
          this._handleTrashClick(this._element, this._id);
        });
    }

    this._cardImage.addEventListener("click", () => {
        this._clickImage(this._name, this._link);
      });
  }
  // метод проверки есть ли у карточки лайк поставленный текущим пользователем ранее и сохраненный в массиве на сервере
  _findUserLike(likeData, myUserId) {
    return likeData.some(function (likerData) {
      return myUserId === likerData._id;
    });
  }
  //метод для установки или удаления лайка и счетчика
  updateLikes(data) {
    this._likes = data.likes;
    this._element.querySelector(".card__like").classList.toggle("card__like_pos_active");
    this._element.querySelector(".card__like-counter").textContent = data.likes.length;
  }
//метод, возвращающий факт наличия лайка
  getLike() {
    return this._element.querySelector(".card__like").classList.contains("card__like_pos_active");
  }
  //метод, возвращающий id
  getId() {
    return this._id;
  }
  generateCard() {
    this._element = this._getElement();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._element.querySelector(".card__description").textContent = this._name;
    this._element.id = this._id;
    this._element.querySelector(".card__like-counter").textContent = this._likes.length;

    // проверяем ставил ли наш пользователь лайк и если ставил то красим сердечко
    if (this._findUserLike(this._likes, this._userId)) {
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
