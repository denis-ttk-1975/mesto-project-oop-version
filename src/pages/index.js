import "../pages/index.css";
import { renderLoading, renderRemoving } from "../utils/utils.js";
import {
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  validationConfig,
  placeSectionSelector,
  profileSelectors,
  cardTemplateSelector,
  buttonProfile,
  buttonFormAdd,
  buttonAvatarPhoto,
  nameInput,
  jobInput,
  buttonConfidence
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

const popupImage = new PopupWithImage(".popup_type_image");
const api = new Api({
  baseURL: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: "bb6ff8a2-6249-481e-b654-c07491020021",
    "Content-Type": "application/json",
  },
});
const section = new Section(
  {
    items: {},
    renderer: function (element, userId) {
      const cardElement = new Card(element, userId, cardTemplateSelector, {
        handleLike,
        handleTrashClick,
        clickImage,
      });
      return cardElement.generateCard();
    },
  },
  placeSectionSelector
);

const infoUser = new UserInfo(profileSelectors);
//Запускаем валидацию полей форм
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
//Собираем формы и включаем валидацию
enableValidation(validationConfig);

// активировать попап для редактирования профиля
const popupFormProfile = new PopupWithForm(".popup_type_edit", (objInputs) => {
  renderLoading(true, buttonProfile);
  api
    .patchProfile(objInputs.nameProfile, objInputs.descriptionProfile)
    .then((result) => {
      infoUser.setUserInfo({
        ...infoUser.getUserInfo(),
        name: result.name,
        about: result.about,
      });
      popupFormProfile.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, buttonProfile);
    });
});
//экземпляр класса для открытия попапа аватара
const popupFormAvatar = new PopupWithForm(".popup_type_avatar", (objInputs) => {
  renderLoading(true, buttonAvatarPhoto);
  api
    .patchAvatar(objInputs.avatarProfile)
    .then((result) => {
      infoUser.setUserInfo({
        ...infoUser.getUserInfo(),
        avatar: result.avatar,
      });
      popupFormAvatar.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, buttonAvatarPhoto);
    });
});
// активировать попап для добавления карточки
const popupFormAddCard = new PopupWithForm(".popup_type_add", (objInputs) => {
  renderLoading(true, buttonFormAdd);
  api
    .postNewCard(objInputs.location, objInputs.link)
    .then((result) => {
      section.addItem(result, result.owner._id);
      popupFormAddCard.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      renderLoading(false, buttonFormAdd);
    });
});
let deleteCard, deleteCardId;
const popupConfide = new PopupWithForm(".popup__remove-card", () => {
  renderRemoving(true, buttonConfidence);
  api
    .deleteCard(deleteCardId)
    .then(() => {
      deleteCard.remove();
      popupConfide.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderRemoving(false, buttonConfidence);
    });
});
popupFormAddCard.setEventListeners();
popupFormProfile.setEventListeners();
popupFormAvatar.setEventListeners();
popupConfide.setEventListeners();
popupImage.setEventListeners();
//обработчик попапа редактирования профиля
buttonEdit.addEventListener("click", function () {
  openProfilePopup();
  popupFormProfile.open();
  formValidators.formEditProfile.resetValidation();
});
//обработчик попапа для добавления карточки
buttonAdd.addEventListener("click", function () {
  popupFormAddCard.open();
  formValidators.formAddPicture.resetValidation();
});
//открыть попап для редактирования аватара
buttonAvatar.addEventListener("click", function () {
  popupFormAvatar.open();
  formValidators.formAvatar.resetValidation();
});
//функция клика на Like
const handleLike = (card) => {
  if (card.getLike()) {
    api
      .deleteLikeOnCard(card.getId())
      .then((res) => {
        card.updateLikes(res);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  } else {
    api
      .putLikeOnCard(card.getId())
      .then((res) => {
        card.updateLikes(res);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
};
//функция клика на Trash
function handleTrashClick(card, id) {
  deleteCard = card;
  deleteCardId = id;
  popupConfide.open();
}
//функция клика на самой картинке для открытия попапа самой карточки
function clickImage() {
  popupImage.open(this._name, this._link);
}
//функция открытия попапа редактирования профиля с начальными данными
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
    section.renderAll(cards, userData._id);
  })
  .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
