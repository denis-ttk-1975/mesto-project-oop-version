const initialCards = [
  {
    name: "Карелия",
    link: "https://images.unsplash.com/photo-1548288242-d454d4648b55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1472&q=80",
  },
  {
    name: "Калининград",
    link: "https://images.unsplash.com/photo-1572872750804-15c2b20473de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Москва",
    link: "https://images.unsplash.com/photo-1599343265703-0f5a075c49f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Минск",
    link: "https://images.unsplash.com/photo-1591509352193-c3e6676f71c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector(".popup_type_add");
const buttonEdit = document.querySelector(".profile__button");
const buttonEditClose = document.querySelector(".popup__close");
const buttonAdd = document.querySelector(".profile__button_act_add");
const buttonAddClose = document.querySelector("#close");
const formElementProfile = document.querySelector("#profile");
const nameInput = formElementProfile.querySelector(".form__item_type_name");
const jobInput = formElementProfile.querySelector(".form__item_type_description");
const imageOpen = document.querySelector(".popup_type_image");
const imageOpeninPopup = imageOpen.querySelector(".popup__title");
const imageInPopup = document.querySelector(".popup__image");
const imageClose = imageOpen.querySelector("#active_img");
const placeSection = document.querySelector(".places"); //секция, где должны быть карточки
const formElementLocation = document.querySelector("#location");
const locationInput = formElementLocation.querySelector(".form__item_type_location");
const linkInput = formElementLocation.querySelector(".form__item_type_link");


//функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
// функция редактирования профиля
function formSubmitEdit(evt) {
  evt.preventDefault(); //отменяет стандартную отправку формы
  const nameValue = nameInput.value;
  const descriptionValue = jobInput.value;
  const profileName = document.querySelector(".profile__name");
  const profileDescrip = document.querySelector(".profile__description");
  profileName.textContent = nameValue;
  profileDescrip.textContent = descriptionValue;
  closePopup(popupEdit);
}
//функция создания карточки (возвращает созданную разметку карточки)
function cardCreate(cardName, cardLink) {
  const cardTemplate = document.querySelector("#card_template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDesc = cardElement.querySelector(".card__description");
  cardDesc.textContent = cardName;
  cardImage.alt = cardName;
  cardImage.src = cardLink;
  //слушатель на лайк
  const cardLike = cardElement.querySelector(".card__like");
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_pos_active");
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
function renderCard(cardName, cardLink, section) {
  section.prepend(cardCreate(cardName, cardLink));
}

//функция добавления карточки
function formSubmitAdd(evt) {
  evt.preventDefault();
  const locationValue = locationInput.value;
  const linkValue = linkInput.value;
  renderCard(locationValue, linkValue, placeSection);
  closePopup(popupAdd);
  formElementLocation.reset(); //очистить форму
}


// открыть попап редактирования профиля
buttonEdit.addEventListener("click", function () {
  openPopup(popupEdit)
});
//закрыть попап редактирования профиля
buttonEditClose.addEventListener("click", function () {
  closePopup(popupEdit);
});
//открыть попап для добавления карточки
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd)
});
//закрыть попап добавления карточки
buttonAddClose.addEventListener("click", function () {
  closePopup(popupAdd);
});
//обработчик функции редактирования профиля
formElementProfile.addEventListener("submit", formSubmitEdit);
//закрыть попап картинки
imageClose.addEventListener("click", function () {
  closePopup(imageOpen);
});
//обработчик функции добавления карточки
formElementLocation.addEventListener("submit", formSubmitAdd);

//функция добавления массива данных
function cardsList() {
  initialCards.forEach(function (card) {
    renderCard(card.name, card.link, placeSection);
  });
}
cardsList();
