import "../pages/index.css";
import { renderLoading } from "./utils.js";
import {
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  formElementLocation,
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
} from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { Api } from "./api.js";
import { Card } from "./card.js";
import { likeHandler, trashHandler, imageClickHandler, openProfilePopup} from "./utils.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";

const api = new Api({
  baseURL: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: "bb6ff8a2-6249-481e-b654-c07491020021",
    "Content-Type": "application/json",
  },
})

const section = new Section(
  {
    items: {},
    renderer: function (element, userId) {
      const cardElement = new Card(element, userId, cardTemplateSelector, {
        likeHandler,
        trashHandler,
        imageClickHandler,
      });
      return cardElement.generate();
    }
  }, placeSectionSelector)

const infoUser = new UserInfo(profileSelectors);

//Запускаем валидацию полей форм
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator
    validator.enableValidation()
  })
}

//Собираем формы и включаем валидацию
enableValidation(validationConfig)

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
      section.addItem(result, result.owner._id);
      formElementLocation.reset(); //очистить форму
      PopupFormAddCard.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      renderLoading(false, buttonFormAdd);
    });
});
PopupFormAddCard.setEventListeners();
PopupFormProfile.setEventListeners();
PopupFormAvatar.setEventListeners();
// обработчик попапа редактирования профиля
buttonEdit.addEventListener("click", function () {
  openProfilePopup();
  PopupFormProfile.open();
  formValidators.formEditProfile.resetValidation()
});

//открыть попап для добавления карточки
buttonAdd.addEventListener("click", function () {
  PopupFormAddCard.open();
  formValidators.formAddPicture.resetValidation()
});
//открыть попап для редактирования аватара
buttonAvatar.addEventListener("click", function () {
  PopupFormAvatar.open();
  formValidators.formAvatar.resetValidation()
});

//загрузка данных
const promises = [api.getInitialCards(), api.getUserInfo()];
Promise.all(promises)
  .then(([cards, userData]) => {
    infoUser.setUserInfo(userData); //метод экземпляра класса UserInfo для обновления информации о профиле
    section.renderAll(cards, userData._id);
  })
  .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));