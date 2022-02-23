//функции для работы с карточками 
import {closePopup, openPopup} from './utils.js';
import {imageOpen, imageOpeninPopup, imageInPopup, inputElementLocation,
  inputElementLink, formElementLocation, placeSection, popupAdd, validationConfig, initialCards, cardTemplate} from './constants.js';

//функция создания карточки (возвращает созданную разметку карточки)
export function cardCreate(cardName, cardLink) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.alt = cardName;
    cardImage.src = cardLink;
    const cardDescription = cardElement.querySelector(".card__description");
    cardDescription.textContent = cardName;
    //слушатель на лайк
    const cardLike = cardElement.querySelector(".card__like");
    cardLike.addEventListener("click", function (event) {
      event.target.classList.toggle("card__like_pos_active");
    });
    //слушатель на удаление
    const cardTrash = cardElement.querySelector(".card__trash");
    cardTrash.addEventListener("click", function () {
      cardElement.remove();
    });
    cardImage.addEventListener("click", function () {
      imageOpeninPopup.textContent = cardName;
      imageInPopup.alt = cardName;
      imageInPopup.src = cardLink;
      openPopup(imageOpen); //открыть попап с картинкой
    });
    return cardElement;
  }
// функция добавления карточки в разметку
export function renderCard(cardName, cardLink, section) {
    section.prepend(cardCreate(cardName, cardLink));
  }
  //функция добавления карточки
export function addCard(event) {
    event.preventDefault();
    const locationValue = inputElementLocation.value;
    const linkValue = inputElementLink.value;
    renderCard(locationValue, linkValue, placeSection);
    const buttonFormAdd = popupAdd.querySelector(validationConfig.submitButtonSelector);
    buttonFormAdd.disabled = true;
    buttonFormAdd.classList.add(validationConfig.inactiveButtonClass);
    formElementLocation.reset(); //очистить форму
    closePopup(popupAdd);
}
//функция добавления массива данных
export function cardsList() {
    initialCards.forEach(function (card) {
      renderCard(card.name, card.link, placeSection);
    });
  }