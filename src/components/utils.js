import {
  imageInPopup,
  imageOpeninPopup,
  imageOpen,
  inputElementLocation,
  inputElementLink,
  buttonFormAdd,
  formElementLocation,
  validationConfig,
  popupAdd,
  cardTemplateSelector,
  placeSectionSelector,
  buttonConfidence,
  popupConfidence,
} from "./constants.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
//утилитарные функции
import { Api } from "./api.js";
import { Section } from "./section.js";
import { Card } from "./cardClass.js";
import { openPopupConfidenceNew } from "./modal.js";
import { handleEscDown } from "./modal.js";
const api = new Api();
const PopupImage = new PopupWithImage(".popup_type_image");
PopupImage.setEventListeners();

// const PopupConfide = new PopupWithForm(".popup__remove-card", ({}) => {
//   renderRemoving(true, buttonConfidence);
//   api
//     .deleteCard(как передать сюда id карты ????)
//     .then(() => {
//       this._element.remove();
//       PopupConfide.close();
//     })
//     .catch((err) => console.log(`Ошибка: ${err}`))
//     .finally(() => {
//       renderRemoving(false, buttonConfidence);
//     });
// });
// PopupConfide.setEventListeners();

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", handleEscDown);
}
//функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", handleEscDown);
}
//функция загрузки
export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
//функция удаления
export function renderRemoving(isRemoving, button) {
  if (isRemoving) {
    button.textContent = "Удаление...";
  } else {
    button.textContent = "Да";
  }
}

//!! далее Денис Улесов добавляет функции колл-бэков для передачи в листенеры класса Card в файле index.js

//!!функция клика на Like
export function likeHandler() {
  if (
    this._element
      .querySelector(".card__like")
      .classList.contains("card__like_pos_active")
  ) {
    api
      .deleteLikeOnCard(this._id)
      .then((data) => {
        this._element.querySelector(".card__like-counter").textContent =
          data.likes.length;
        this._element
          .querySelector(".card__like")
          .classList.remove("card__like_pos_active");
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  } else {
    api
      .putLikeOnCard(this._id)
      .then((data) => {
        this._element.querySelector(".card__like-counter").textContent =
          data.likes.length;
        this._element
          .querySelector(".card__like")
          .classList.add("card__like_pos_active");
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
}
//!!функция клика на Trash
export function trashHandler(id) {
  // const idCardForDelete = id;
  // PopupConfide.open();
  buttonConfidence.addEventListener("click", (event) => {
    event.preventDefault();
    renderRemoving(true, buttonConfidence);
    api
      .deleteCard(this._id)
      .then(() => {
        this._element.remove();
        closePopup(popupConfidence);
        //PopupForm.close()
      })
      .catch((error) => {
        console.log(`Ошибка при удалении карточки: ${error}`);
      })
      .finally(() => {
        renderRemoving(false, buttonConfidence);
      });
  });
  openPopup(popupConfidence);
  //PopupForm.open()
}
//!!функция клика на самой картинке для открытия попапа самой карточки
export function imageClickHandler() {
  // imageOpeninPopup.textContent = this._name;
  // imageInPopup.alt = this._name;
  // imageInPopup.src = this._link;
  // openPopup(imageOpen);
  PopupImage.open(this._name, this._link);
}

//!! Улесов Денис функция добавления новой карточки по клику на Submit попапа добавления карточки
// export function addCardNew(objInputs) {
//   // event.preventDefault();
//   // const locationValue = inputElementLocation.value;
//   // const linkValue = inputElementLink.value;
//   renderLoading(true, buttonFormAdd);
//   api
//     .postNewCard(objInputs.location, objInputs.link)
//     .then((result) => {
//       const section = new Section(
//         {
//           items: [],
//           renderer: function (element, userId) {
//             const cardElement = new Card(
//               element,
//               userId,
//               cardTemplateSelector,
//               {
//                 likeHandler,
//                 trashHandler,
//                 imageClickHandler,
//               }
//             );
//             return cardElement.generate();
//           },
//         },
//         placeSectionSelector
//       );
//       section.addItem(result, result.owner._id);
//       // renderCard(result, result.owner._id, placeSection);
//       // buttonFormAdd.disabled = true;
//       // buttonFormAdd.classList.add(validationConfig.inactiveButtonClass);
//       formElementLocation.reset(); //очистить форму
//       PopupFormAddCard.close();
//     })
//     .catch((error) => console.log(`Ошибка: ${error}`))
//     .finally(() => {
//       renderLoading(false, buttonFormAdd);
//     });
// }
