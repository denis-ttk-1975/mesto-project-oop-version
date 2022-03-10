//функции для работы с карточками
import { closePopup, openPopup } from "./utils.js";
import {imageOpen, imageOpeninPopup, imageInPopup, inputElementLocation,
  inputElementLink, formElementLocation, placeSection, popupAdd, validationConfig, cardTemplate} from './constants.js';
import { deleteLikeOnCard, putLikeOnCard, deleteCard, postNewCard, userId } from "./api.js";

//функция создания карточки (возвращает созданную разметку карточки)
export function cardCreate(cardName, cardLink, cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.alt = cardName;
  cardImage.src = cardLink;
  const cardDescription = cardElement.querySelector(".card__description");
  cardDescription.textContent = cardName;
  //счетчик лайков
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  cardLikeCounter.textContent = cardData.likes.length;
  //слушатель на лайк
  const cardLike = cardElement.querySelector(".card__like");
  cardLike.addEventListener("click", function (event) {
    event.target.classList.toggle("card__like_pos_active");
  });
  if (cardData.likes.some((userThatLiked) => userThatLiked._id == userId)) {
    cardLike.classList.add("card__like_pos_active");
  }
  //слушатель на удаление/обозначение лайка
  cardLike.addEventListener("click", (event) => {
    if (cardData.likes.some((userThatLiked) => userThatLiked._id == userId)) {
      deleteLikeOnCard(cardData._id)
        .then((card) => {
          cardData = card;
          cardLikeCounter.textContent = card.likes.length;
          event.target.classList.remove("card__like_pos_active");
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    } else {
      putLikeOnCard(cardData._id)
        .then((card) => {
          cardData = card;
          cardLikeCounter.textContent = card.likes.length;
          event.target.classList.add("card__like_pos_active");
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  });
  //слушатель на удаление карточки
  const cardTrash = cardElement.querySelector(".card__trash");
  if (cardData.owner._id !== userId) {
    cardTrash.remove();
  }
  cardTrash.addEventListener("click", function (event) {
    deleteCard(cardData._id)
      .then(() => {
        event.target.closest(".card").remove();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  });
  cardImage.addEventListener("click", function (event) {
    imageOpeninPopup.textContent = event.target.alt;
    imageInPopup.alt = event.target.alt;
    imageInPopup.src = event.target.src;
    openPopup(imageOpen); //открыть попап с картинкой
  });
  return cardElement;
}
// функция добавления карточки в разметку
export function renderCard(cardData, section) {
  const cardName = cardData.name;
  const cardLink = cardData.link;
  section.prepend(cardCreate(cardName, cardLink, cardData));
}
//функция добавления карточки
export function addCard(event) {
  event.preventDefault();
  const locationValue = inputElementLocation.value;
  const linkValue = inputElementLink.value;
  const buttonFormAdd = popupAdd.querySelector(validationConfig.submitButtonSelector);
  postNewCard(locationValue, linkValue)
    .then((card) => {
      renderCard(card, placeSection);
      buttonFormAdd.disabled = true;
      buttonFormAdd.classList.add(validationConfig.inactiveButtonClass);
      formElementLocation.reset(); //очистить форму
      closePopup(popupAdd);
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}
