import "../pages/index.css";
import { openPopup } from "./utils.js";
import {
  handleClick,
  handleProfileFormSubmit,
  handleAvatarSubmit,
  openProfilePopup,
} from "./modal.js";
import { addCard, renderCard } from "./card.js";
import {
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  popupAvatar,
  popups,
  popupAdd,
  formElementProfile,
  formElementLocation,
  formElementAvatar,
  addCardFormFieldSet,
  avatarFormFieldSet,
  validationConfig,
  placeSectionSelector,
  profileName,
  profileDescrip,
  profileImage,
  profileSelectors,
  editProfileFormFieldSet,
  cardTemplate,
  cardTemplateSelector,
  placeSection,
} from "./constants.js";
import { getInitialCards, getUserInfo } from "./api.js";
import { FormValidator } from "./formValidator.js";
import { Api } from "./api.js";
import { Card } from "./cardClass.js";
import {
  likeHandler,
  trashHandler,
  imageClickHandler,
  addCardNew,
} from "./utils.js";
import { Section } from "./section.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
// import { PopupWithImage } from "./PopupWithImage.js";
// const PopupFormProfile = new PopupWithForm(".popup_type_edit", handleProfileFormSubmit);

const api = new Api();

const editProfileForm = new FormValidator(
  validationConfig,
  editProfileFormFieldSet
);
editProfileForm.enableValidation();

const addCardForm = new FormValidator(validationConfig, addCardFormFieldSet);
addCardForm.enableValidation();

const avatarForm = new FormValidator(validationConfig, avatarFormFieldSet);
avatarForm.enableValidation();

// открыть попап редактирования профиля
buttonEdit.addEventListener("click", function () {
  //openProfilePopup();
  PopupWithForm.open();
  editProfileForm.validate();
});
//открыть попап для добавления карточки
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd);
});
//открыть попап для редактирования аватара
buttonAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
});
//обработчик функции редактирования аватара
formElementAvatar.addEventListener("submit", function (event) {
  handleAvatarSubmit(event);
});
//обработчик функции редактирования профиля
formElementProfile.addEventListener("submit", (event) => {
  handleProfileFormSubmit(event);
});
//обработчик функции добавления карточки
// formElementLocation.addEventListener("submit", addCard);
formElementLocation.addEventListener("submit", addCardNew);

//обработчик закрытия попапа при клике на оверлей или крестик
popups.forEach(function (popup) {
  popup.addEventListener("mousedown", handleClick);
});

const infoUser = new UserInfo(profileSelectors);
console.log("infoUser: ", infoUser);

//загрузка данных

const promises = [api.getInitialCards(), api.getUserInfo()];
Promise.all(promises)
  .then(([cards, userData]) => {
    infoUser.setUserInfo(userData); //метод экземпляра класса UserInfo для обновления информации о профиле
    console.log("infoUser: ", infoUser);

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
