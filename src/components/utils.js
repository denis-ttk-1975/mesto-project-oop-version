import { imageInPopup, imageOpeninPopup, imageOpen } from "./constants.js";

//утилитарные функции
import { Api } from "./api.js";
const api = new Api();

import { openPopupConfidenceNew } from "./modal.js";
import { handleEscDown } from "./modal.js";

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", handleEscDown);
}
//функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", handleEscDown);
}
//функция загрузки
export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
//функция удаления
export function renderRemoving(isRemoving, button) {
  if (isRemoving) {
    button.textContent = "Удаление...";
  } else {
    button.textContent = "Да";
  }
}

// далее Денис Улесов добавляет функции колл-бэков для передачи в листенеры класса Card в файле index.js

//функция клика на Like
export function likeHandler() {
  if (
    this._element
      .querySelector(".card__like")
      .classList.contains("card__like_pos_active")
  ) {
    api
      ._deleteLikeOnCard(this._id)
      .then((data) => {
        this._element.querySelector(".card__like-counter").textContent =
          data.likes.length;
        this._element
          .querySelector(".card__like")
          .classList.remove("card__like_pos_active");
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  } else {
    api
      ._putLikeOnCard(this._id)
      .then((data) => {
        this._element.querySelector(".card__like-counter").textContent =
          data.likes.length;
        this._element
          .querySelector(".card__like")
          .classList.add("card__like_pos_active");
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
}
//функция клика на Trash
export function trashHandler() {
  openPopupConfidenceNew(this._id);
}
//функция клика на самой картинке для открытия попапа самой карточки
export function imageClickHandler() {
  imageOpeninPopup.textContent = this._name;
  imageInPopup.alt = this._name;
  imageInPopup.src = this._link;
  openPopup(imageOpen);
}
