import "../pages/index.css";
import { renderLoading, renderRemoving } from "./utils.js";
import {
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  addCardFormFieldSet,
  avatarFormFieldSet,
  validationConfig,
  placeSectionSelector,
  profileSelectors,
  editProfileFormFieldSet,
  cardTemplateSelector,
  buttonProfile,
  buttonFormAdd,
  buttonAvatarPhoto,
  nameInput,
  jobInput,
  buttonConfidence
} from "./constants.js";
import { FormValidator } from "./formValidator.js";
import { Api } from "./api.js";
import { Card } from "./card.js";
import { Section } from "./section.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";

const PopupImage = new PopupWithImage(".popup_type_image");
const api = new Api();
const infoUser = new UserInfo(profileSelectors);

const editProfileForm = new FormValidator(validationConfig, editProfileFormFieldSet);
editProfileForm.enableValidation();

const addCardForm = new FormValidator(validationConfig, addCardFormFieldSet);
addCardForm.enableValidation();

const avatarForm = new FormValidator(validationConfig, avatarFormFieldSet);
avatarForm.enableValidation();
// активировать попап для редактирования профиля
const PopupFormProfile = new PopupWithForm(".popup_type_edit", (objInputs) => {
  renderLoading(true, buttonProfile);
  api
    .patchProfile(objInputs.nameProfile, objInputs.descriptionProfile)
    .then((result) => {
      infoUser.setUserInfo({
        ...infoUser.getUserInfo(),
        name: result.name,
        about: result.about,
      });
      PopupFormProfile.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, buttonProfile);
    });
});
//экземпляр класса для открытия попапа аватара
const PopupFormAvatar = new PopupWithForm(".popup_type_avatar", (objInputs) => {
  renderLoading(true, buttonAvatarPhoto);
  api
    .patchAvatar(objInputs.avatarProfile)
    .then((result) => {
      infoUser.setUserInfo({
        ...infoUser.getUserInfo(),
        avatar: result.avatar,
      });
      avatarForm.validate();
      PopupFormAvatar.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, buttonAvatarPhoto);
    });
});
// активировать попап для добавления карточки
const PopupFormAddCard = new PopupWithForm(".popup_type_add", (objInputs) => {
  renderLoading(true, buttonFormAdd);
  api
    .postNewCard(objInputs.location, objInputs.link)
    .then((result) => {
      const section = new Section(
        {
          items: [],
          renderer: function (element, userId) {
            const cardElement = new Card(
              element,
              userId,
              cardTemplateSelector,
              {
                likeHandler,
                trashHandler,
                imageClickHandler,
              }
            );
            return cardElement.generate();
          },
        },
        placeSectionSelector
      );
      section.addItem(result, result.owner._id);
      addCardForm.validate();
      PopupFormAddCard.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      renderLoading(false, buttonFormAdd);
    });
});
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
PopupFormAddCard.setEventListeners();
PopupFormProfile.setEventListeners();
PopupFormAvatar.setEventListeners();
PopupConfide.setEventListeners();
PopupImage.setEventListeners();
// обработчик попапа редактирования профиля
buttonEdit.addEventListener("click", function () {
  openProfilePopup();
  PopupFormProfile.open();
  editProfileForm.validate();
});
//открыть попап для добавления карточки
buttonAdd.addEventListener("click", function () {
  PopupFormAddCard.open();
});
//открыть попап для редактирования аватара
buttonAvatar.addEventListener("click", function () {
  PopupFormAvatar.open();
});
//!!функция клика на Like
function likeHandler() {
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
function trashHandler(card, id) {
  deleteCard = card;
  deleteCardId = id;
  PopupConfide.open();
}
//!!функция клика на самой картинке для открытия попапа самой карточки
function imageClickHandler() {
  PopupImage.open(this._name, this._link);
}
// функция открытия попапа редактирования профиля с начальными данными
function openProfilePopup() {
  const infoProfile = infoUser.getUserInfo();
  nameInput.value = infoProfile.name;
  jobInput.value = infoProfile.about;
}
//загрузка данных
const promises = [api.getInitialCards(), api.getUserInfo()];
Promise.all(promises)
  .then(([cards, userData]) => {
    infoUser.setUserInfo(userData); //метод экземпляра класса UserInfo для обновления информации о профиле
    const section = new Section(
      {
        items: cards,
        renderer: function (element, userId) {
          const cardElement = new Card(element, userId, cardTemplateSelector, {
            likeHandler,
            trashHandler,
            imageClickHandler,
          });
          return cardElement.generate();
        },
      },
      placeSectionSelector
    );
    section.renderAll(userData._id);
  })
  .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
