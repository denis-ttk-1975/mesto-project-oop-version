import "../pages/index.css";
import { openPopup, renderLoading } from "./utils.js";
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
  profileSelectors,
  editProfileFormFieldSet,
  cardTemplate,
  cardTemplateSelector,
  placeSection,
  buttonProfile,
  buttonAvatarPhoto,
  buttonFormAdd
} from "./constants.js";
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
import { PopupWithImage } from "./PopupWithImage.js";

const api = new Api();
const infoUser = new UserInfo(profileSelectors);

const editProfileForm = new FormValidator(validationConfig, editProfileFormFieldSet);
editProfileForm.enableValidation();

const addCardForm = new FormValidator(validationConfig, addCardFormFieldSet);
addCardForm.enableValidation();

const avatarForm = new FormValidator(validationConfig, avatarFormFieldSet);
avatarForm.enableValidation();
//экземпляр класса для открытия попапа профиля
const PopupFormProfile = new PopupWithForm(".popup_type_edit", (objInputs) => {
  renderLoading(true, buttonProfile);
  api
    .patchProfile(objInputs.nameProfile, objInputs.descriptionProfile)
    .then((objInputs) => {
      infoUser.setUserInfo({
        ...infoUser.getUserInfo(),
        name: objInputs.name,
        about: objInputs.about,
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
    .then((objInputs) => {
      infoUser.setUserInfo({
        ...infoUser.getUserInfo(),
        avatar: objInputs.avatar,
      });
      //avatarForm.validate();
      PopupFormAvatar.close();
      
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, buttonAvatarPhoto);
    });
});
PopupFormProfile.setEventListeners()
PopupFormAvatar.setEventListeners()
// обработчик попапа редактирования профиля
buttonEdit.addEventListener("click", function () {
  openProfilePopup();
  PopupFormProfile.open();
  editProfileForm.validate();
});
// обработчик попапа редактирования профиля
buttonAdd.addEventListener("click", function () {
  PopupFormProfile.open();
});
//открыть попап для редактирования аватара
buttonAvatar.addEventListener("click", function () {
  PopupFormAvatar.open()
});
//обработчик функции добавления карточки
formElementLocation.addEventListener("submit", addCardNew);

//обработчик закрытия попапа при клике на оверлей или крестик
// popups.forEach(function (popup) {
//   popup.addEventListener("mousedown", handleClick);
// });

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