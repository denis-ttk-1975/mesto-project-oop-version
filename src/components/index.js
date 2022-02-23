import '../pages/index.css';
import {openPopup} from './utils.js';
import {handleClick, handleProfileFormSubmit} from './modal.js';
import {enableValidation} from './validate.js';
import {cardsList, addCard} from './card.js';
import {buttonEdit, buttonAdd,
  formElementLocation, popups, popupAdd, popupEdit, formElementProfile, validationConfig} from './constants.js';

// открыть попап редактирования профиля
buttonEdit.addEventListener("click", function () {
  openPopup(popupEdit)
});
//открыть попап для добавления карточки
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd)
});
//обработчик функции редактирования профиля
formElementProfile.addEventListener("submit", handleProfileFormSubmit);
//обработчик функции добавления карточки
formElementLocation.addEventListener("submit", addCard);
//обработчик закрытия попапа при клике на оверлей или крестик
popups.forEach(function (popup) {
  popup.addEventListener("mousedown", handleClick);
});

cardsList();
enableValidation(validationConfig);