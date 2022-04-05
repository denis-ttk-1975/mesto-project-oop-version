import {
  buttonConfidence,
  jobInput,
  nameInput,
  profileSelectors,
} from "./constants.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Api } from "./api.js";
import { UserInfo } from "./UserInfo.js";

const infoUser = new UserInfo(profileSelectors);
const api = new Api();
const PopupImage = new PopupWithImage(".popup_type_image");
let deleteCard, deleteCardId;

const PopupConfide = new PopupWithForm(".popup__remove-card", () => {
  renderRemoving(true, buttonConfidence);
  api
    .deleteCard(deleteCardId)
    .then(() => {
      deleteCard.remove();
      PopupConfide.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderRemoving(false, buttonConfidence);
    });
});
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
//!!функция клика на Like
export function likeHandler() {
  if (
    this._element
      .querySelector(".card__like")
      .classList.contains("card__like_pos_active")
  ) {
    api
      .deleteLikeOnCard(this._id)
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
      .putLikeOnCard(this._id)
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
//!!функция клика на Trash
export function trashHandler(card, id) {
  deleteCard = card;
  deleteCardId = id;
  PopupConfide.open();
}
//!!функция клика на самой картинке для открытия попапа самой карточки
export function imageClickHandler() {
  PopupImage.open(this._name, this._link);
}
// функция открытия попапа редактирования профиля с начальными данными
export function openProfilePopup() {
  const infoProfile = infoUser.getUserInfo();
  nameInput.value = infoProfile.name;
  jobInput.value = infoProfile.about;
}
PopupConfide.setEventListeners();
PopupImage.setEventListeners();
