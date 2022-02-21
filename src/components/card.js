//функции для работы с карточками 
import {initialCards} from './index.js';
import {closePopup, openPopup} from './utils.js';
//constants
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector(".popup_type_add");
export const buttonEdit = document.querySelector(".profile__button");
export const buttonEditClose = document.querySelector(".popup__close");
export const buttonAdd = document.querySelector(".profile__button_act_add");
export const buttonAddClose = document.querySelector("#close");
export const imageOpen = document.querySelector(".popup_type_image");
const imageOpeninPopup = imageOpen.querySelector(".popup__title");
const imageInPopup = document.querySelector(".popup__image");
export const imageClose = imageOpen.querySelector("#active_img");
export const placeSection = document.querySelector(".places"); //секция, где должны быть карточки
export const formElementLocation = document.querySelector("#location");
const locationInput = formElementLocation.querySelector(".form__item_type_location");
const linkInput = formElementLocation.querySelector(".form__item_type_link");

//функция создания карточки (возвращает созданную разметку карточки)
export function cardCreate(cardName, cardLink) {
    const cardTemplate = document.querySelector("#card_template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardDesc = cardElement.querySelector(".card__description");
    cardDesc.textContent = cardName;
    cardImage.alt = cardName;
    cardImage.src = cardLink;
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
export function formSubmitAdd(event) {
    event.preventDefault();
    const locationValue = locationInput.value;
    const linkValue = linkInput.value;
    renderCard(locationValue, linkValue, placeSection);
    closePopup(popupAdd);
    formElementLocation.reset(); //очистить форму
  }
//функция добавления массива данных
export function cardsList() {
    initialCards.forEach(function (card) {
      renderCard(card.name, card.link, placeSection);
    });
  }