import '../pages/index.css';
import {openPopup, closePopup, deleteLoader, getLoader} from './utils.js';
import {handleClick, handleProfileFormSubmit, handleAvatarSubmit} from './modal.js';
import {enableValidation} from './validate.js';
import {addCard, renderCard} from './card.js';
import {buttonEdit, buttonAdd, buttonAvatar, popupAvatar,
  formElementLocation, popups, popupAdd, popupEdit, formElementProfile, validationConfig,
  placeSection, buttonProfile, buttonAvatarPhoto, popupConfidence, formConfidence} from './constants.js';
import { getInitialCards, getUserInfo, updateUserInfo } from './api.js'

// открыть попап редактирования профиля
buttonEdit.addEventListener("click", function () {
  deleteLoader(buttonProfile);
  openPopup(popupEdit)
});
//открыть попап для добавления карточки
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd)
});
//открыть попап для редактирования аватара
buttonAvatar.addEventListener("click", function () {
  deleteLoader(buttonAvatarPhoto);
  openPopup(popupAvatar);
});
//обработчик функции редактирования аватара
buttonAvatarPhoto.addEventListener("click", function () {
  getLoader(buttonAvatarPhoto);
  closePopup(popupAvatar);
  openPopup(popupConfidence); //открыть попап с уточняющим вопросом
});
//обработчик функции редактирования аватара после уточняющего вопроса
formConfidence.addEventListener("submit", function (event) {
  handleAvatarSubmit(event);
});
//обработчик функции редактирования профиля
formElementProfile.addEventListener("submit", (event) => {
  handleProfileFormSubmit(event);
});
//обработчик функции добавления карточки
formElementLocation.addEventListener("submit", addCard);
//обработчик закрытия попапа при клике на оверлей или крестик
popups.forEach(function (popup) {
  popup.addEventListener("mousedown", handleClick);
});
//активация валидации
enableValidation(validationConfig);
//загрузка данных
const promises = [getInitialCards(), getUserInfo()]
  Promise.all(promises)
  .then(([cards, userData]) => {
    updateUserInfo(userData);
    cards.reverse().forEach(card => {
      renderCard(card, placeSection); 
    });
  })
  .catch(err => console.log(`Ошибка загрузки данных: ${err}`))