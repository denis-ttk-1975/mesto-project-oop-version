//функции для работы с карточками
import { closePopup, openPopup, renderLoading } from "./utils.js";
import {imageOpen, imageOpeninPopup, imageInPopup, popupAdd, popupConfidence,
  inputElementLocation, inputElementLink, formElementLocation, formConfidence,
  validationConfig, placeSection, cardTemplate, buttonFormAdd} from './constants.js';
import { deleteLikeOnCard, putLikeOnCard, deleteCard, postNewCard } from "./api.js";
import { userId } from "./index.js";

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
  //слушатель на удаление/обозначение лайка
  cardLike.addEventListener("click", (event) => {
    if (cardData.likes.some((userThatLiked) => userThatLiked._id == userId)) {
      deleteLikeOnCard(cardData._id)
        .then((card) => {
          cardData = card;
          cardLikeCounter.textContent = card.likes.length;
          event.target.classList.toggle("card__like_pos_active");
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
  cardTrash.addEventListener("click", function () {
    openPopup(popupConfidence);
    formConfidence.addEventListener("submit", function removeCard () {
      deleteCard(cardData._id)
        .then(() => {
          cardElement.remove();
          closePopup(popupConfidence);
          formConfidence.removeEventListener("submit", removeCard)
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    });
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
  renderLoading(true, buttonFormAdd);
  postNewCard(locationValue, linkValue)
    .then((card) => {
      renderCard(card, placeSection);
      buttonFormAdd.disabled = true;
      buttonFormAdd.classList.add(validationConfig.inactiveButtonClass);
      formElementLocation.reset(); //очистить форму
      closePopup(popupAdd);
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      renderLoading(false, buttonFormAdd);
    })
}
