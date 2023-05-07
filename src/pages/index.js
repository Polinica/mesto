// Импорт данных из других модулей
import {
  cardsSelector,
  cardTemplateSelector,
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
  profileAvatar,
  profileName,
  profileJob,
  profileEditButton,
  profileNameInput,
  profileJobInput,
  profileEditPopupSelector,
  newCardButton,
  newCardForm,
  newCardPopupSelector,
  imagePopupSelector,
  apiConfig,
} from "../utils/constants.js";
//import initialCards from "../utils/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css"; // импорт css-стилей для сборки в Webpack
import Api from "../components/Api.js";

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

const cards = {};

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  cards[data._id] = card;
  return card.generateCard();
}

// Инициализация Section, добавление исходных карточек

function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

// Инициализация классов
const api = new Api(apiConfig);

// Инициализация UserInfo
const userInfo = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob,
  avatarElement: profileAvatar,
});

api.getUserInfo().then((res) => {
  userInfo.fill(res);
  userInfo.renderName();
  userInfo.renderJob();
  userInfo.renderAvatar();
});

const cardsSection = new Section(
  {
    items: [],
    renderer: createCard,
  },
  cardsSelector
);

api.getInitialCards().then((res) => {
  res.forEach((data) => {
    const card = createCard(data);
    cardsSection.addItem(card);
  });
});

// Инициализация Popup с редактированием информации о пользователе
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, (data) => {
  api.setUserInfo(data).then((res) => {
    userInfo.fill(res);
    userInfo.renderName();
    userInfo.renderJob();
    profileEditPopup.close();
  });
});

// Инициализация Popup с добавлением новой карточки
const newCardPopup = new PopupWithForm(newCardPopupSelector, (data) => {
  cardsSection.addItem(createCard(data));
  newCardPopup.close();
  formValidators[newCardForm.getAttribute("name")].disableButtonState();
});

// Инициализация Popup с увеличенным изображением
const imagePopup = new PopupWithImage(imagePopupSelector);

// Установка слушателей событий
profileEditPopup.setEventListeners();

/** Обработчки событий */

profileEditButton.addEventListener("click", function () {
  ({ name: profileNameInput.value, job: profileJobInput.value } =
    userInfo.getUserInfo());
  profileEditPopup.setInputValues(userInfo.getUserInfo());
  profileEditPopup.open();
});

newCardPopup.setEventListeners();

newCardButton.addEventListener("click", function () {
  newCardPopup.open();
});

// const popupImage = new PopupWithImage(".popup_type_image");
// popupImage.setEventListeners();

imagePopup.setEventListeners();

// Вызов функций и методов при загрузке страницы
//cardsSection.renderItems();

/** Запустить валидацию форм на странице */
validateForms({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
});
