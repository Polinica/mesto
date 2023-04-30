export const cardsSelector = ".cards";
export const cardTemplateSelector = "#card";

/** Элементы страницы */
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");
export const profileEditButton = document.querySelector(
  ".profile__button_type_edit"
);

export const profileEditPopupElement = document.querySelector(
  ".popup_type_edit-profile"
);
export const newCardPopupElement = document.querySelector(
  ".popup_type_add-card"
);
//export const profileEditForm = profileEditPopup.querySelector(".popup__form");
export const profileNameInput = profileEditPopupElement.querySelector(
  ".popup__input_type_name"
);
export const profileJobInput = profileEditPopupElement.querySelector(
  ".popup__input_type_job"
);
export const profileEditPopupSelector = ".popup_type_edit-profile";

export const newCardButton = document.querySelector(
  ".profile__button_type_add"
);
export const newCardPopupSelector = ".popup_type_add-card";
export const newCardForm = newCardPopupElement.querySelector(".popup__form");
//export const newCardTitle = newCardPopup.querySelector(
//  ".popup__input_type_title"
//);
// export const newCardLink = newCardPopup.querySelector(
//   ".popup__input_type_link"
// );

export const imagePopupSelector = ".popup_type_image";
// export const imagePopupFigure = imagePopup.querySelector(".popup__image");
// export const imagePopupCaption = imagePopup.querySelector(
//   ".popup__image-caption"
// );

// export const popupCloseButtons = document.querySelectorAll(
//   ".popup__cancel-button"
// );

// export const popups = document.querySelectorAll(".popup");

// Импорт данных из других модулей
import {} from "../utils/constants.js";
import initialCards from "../utils/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Инициализация Section, добавление исходных карточек

function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

// Инициализация классов
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, cardTemplateSelector, handleCardClick);
      return card.generateCard();
    },
  },
  cardsSelector
);
cardsSection.renderItems();

// const setDisabledOnSubmitButton = (evt) => {
//   const submitButtonElement = evt.target.querySelector(".popup__save-button");
//   submitButtonElement.classList.add("popup__save-button_disabled");
//   submitButtonElement.disabled = true;
// };

// Инициализация Popup с редактированием информации о пользователе
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, (data) => {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

/** Обработчки событий */
profileEditButton.addEventListener("click", function () {
  ({ name: profileNameInput.value, job: profileJobInput.value } =
    userInfo.getUserInfo());
  profileNameInput.dispatchEvent(new Event("input"));
  profileJobInput.dispatchEvent(new Event("input"));
  profileEditPopup.open();
});

// Инициализация Popup с добавлением новой карточки
const newCardPopup = new PopupWithForm(newCardPopupSelector, (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  cardsSection.addItem(card.generateCard());
  newCardPopup.close();
  formValidators[newCardForm.getAttribute("name")].disableButtonState();
});
newCardPopup.setEventListeners();

newCardButton.addEventListener("click", function () {
  newCardPopup.open();
});

// const popupImage = new PopupWithImage(".popup_type_image");
// popupImage.setEventListeners();

// Инициализация Popup с увеличенным изображением
const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();

const formValidators = {}; // Экземпляры класса FormValidator, чтобы снаружи обращаться к их методам

/** Функция запускает валидацию всех форм на странице */
function validateForms(formClasses) {
  const formElements = Array.from(
    document.querySelectorAll(formClasses.formSelector)
  );
  formElements.forEach((formElement) => {
    const form = new FormValidator(formClasses, formElement);
    formValidators[formElement.getAttribute("name")] = form;
    form.enableValidation();
  });
}

/** Запустить валидацию форм на странице */
validateForms({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

// Инициализация UserInfo
const userInfo = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob,
});
