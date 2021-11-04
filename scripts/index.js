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

const popup = document.querySelector(".popup");

//функция открытия попапа
function open(popup) {
  popup.classList.add("popup_opened");
}
//функция закрытия попапа
function close(popup) {
  popup.classList.remove("popup_opened");
  deleteForm(); //очистить форму
}
// открыть попап редактирования профиля
const buttonEdit = document.querySelector(".profile__button");
buttonEdit.addEventListener("click", function () {
  popup.classList.add("popup_opened");
});
//закрыть попап редактирования профиля
const buttonEditClose = document.querySelector(".popup__close");
buttonEditClose.addEventListener("click", function () {
  close(popup);
});
//открыть попап для добавления карточки
const popupAdd = document.querySelector(".popup_type_add");
const buttonAdd = document.querySelector(".profile__button_act_add");
buttonAdd.addEventListener("click", function () {
  popupAdd.classList.add("popup_opened");
});
//закрыть попап добавления карточки
const buttonAddClose = document.querySelector("#close");
buttonAddClose.addEventListener("click", function () {
  close(popupAdd);
});

// функция редактирования профиля
const formElementProfile = document.querySelector("#profile");
const nameInput = formElementProfile.querySelector(".form__item_type_name");
const jobInput = formElementProfile.querySelector(".form__item_type_description");
function formSubmitEdit(evt) {
  evt.preventDefault(); //отменяет стандартную отправку формы
  const nameValue = nameInput.value;
  const descriptionValue = jobInput.value;
  const nameOutput = document.querySelector(".profile__name");
  const descriptionOutput = document.querySelector(".profile__description");
  nameOutput.textContent = nameValue;
  descriptionOutput.textContent = descriptionValue;
  close(popup);
}
formElementProfile.addEventListener("submit", formSubmitEdit);

const imageOpen = document.querySelector(".popup_type_image");
const imageOpeninPopup = imageOpen.querySelector(".popup__title");
const imageInPopup = document.querySelector(".popup__image");
const imageClose = imageOpen.querySelector("#active_img");

//закрыть попап картинки
imageClose.addEventListener("click", function () {
  imageOpen.classList.remove("popup_opened");
});

//функция создания карточки (возвращает созданную разметку карточки)
const placeSection = document.querySelector(".places"); //секция, где должны быть карточки
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
    open(imageOpen); //открыть попап с картинкой
  });
  return cardElement;
}

// функция добавления карточки в разметку
function renderCard(cardName, cardLink, section) {
  section.prepend(cardCreate(cardName, cardLink));
}

const formElementLocation = document.querySelector("#location");
const locationInput = formElementLocation.querySelector(".form__item_type_location");

//функция очистки формы
const linkInput = formElementLocation.querySelector(".form__item_type_link");
function deleteForm() {
  linkInput.value = "";
  locationInput.value = "";
}

//функция добавления карточки
function formSubmitAdd(evt) {
  evt.preventDefault();
  const locationValue = locationInput.value;
  const linkValue = linkInput.value;
  renderCard(locationValue, linkValue, placeSection);
  close(popupAdd);
  deleteForm(); //очистить форму
}
formElementLocation.addEventListener("submit", formSubmitAdd);

//функция добавления массива данных
function cardsList() {
  initialCards.forEach(function (card) {
    renderCard(card.name, card.link, placeSection);
  });
}
cardsList();
