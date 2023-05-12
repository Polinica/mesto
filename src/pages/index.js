// Импорт данных из других модулей
import {
  cardsSelector,
  cardTemplateSelector,
  formSelectors, // селекторы и классы элементов формы
  profileElements, // элементы страницы с информацией о пользователе
  profileEditButton,
  profileNameInput,
  profileJobInput,
  profileEditPopupSelector,
  avatarChangeButton,
  avatarChangePopupSelector,
  newCardButton,
  newCardForm,
  newCardPopupSelector,
  imagePopupSelector,
  confirmationPopupSelector,
} from "../utils/constants.js";

import { apiConfig } from "../utils/apiConfig.js";
//import initialCards from "../utils/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css"; // импорт css-стилей для сборки в Webpack
import Api from "../components/Api.js";

/**
 * Переменные страницы
 */
const formValidators = {}; // хранение экземпляров валидаторов форм
const cards = {}; // хранение полученных карточек

/**
 * Дополнительные функции
 */

/**
 * Запускает валидацию всех форм на странице
 * @param {object} formSelectors - Объект с классами и селекторами элементов форм:
 * - formSelector,
 * - inputSelector,
 * - submitButtonSelector,
 * - inactiveButtonClass,
 * - inputErrorClass,
 * - errorClass
 */
function validateForms(formSelectors) {
  const formElements = Array.from(
    document.querySelectorAll(formSelectors.formSelector)
  );
  formElements.forEach((formElement) => {
    const form = new FormValidator(formSelectors, formElement);
    formValidators[formElement.getAttribute("name")] = form;
    form.enableValidation();
  });
}

/**
 * Создает элемент карточки
 * @param {object} data - Объект с содержимым карточки
 * @returns {object}
 */
function createCard(data) {
  const card = new Card(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
    userInfo.id
  );
  cards[data._id] = card;
  return card.generateCard();
}

/**
 * Обрабатывает нажатие на картинку карточки
 * @param {string} imageLink - Ссылка на картинку
 * @param {string} text - Описание картинки
 */
function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

/**
 * Обрабатывает нажатие на удаление карточки
 * @param {string} cardId - ID карточки
 */
function handleDeleteCard(cardId) {
  popupWithConfirmation.setTarget(cardId);
  popupWithConfirmation.open();
}

/**
 * Обрабатывает нажатие на лайк в карточке
 * @param {string} cardId - ID карточки
 * @param {boolean} isLiked - Текущий статус лайка
 * @returns {Promise}
 */
function handleLikeCard(cardId, isLiked) {
  cards[cardId].blockLikeButton();
  api
    .toggleLike(cardId, isLiked)
    .then((likes) => {
      cards[cardId].setLikes(likes);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      cards[cardId].unblockLikeButton();
    });
}

/**
 * Выполняет сброс формы при открытии попапа с формой
 */
function handleOpenForm() {
  formValidators[this.formName].hideErrors();
  formValidators[this.formName].disableButtonState();
}

/**
 * Инициализация классов
 */
const api = new Api(apiConfig);

// Инициализация UserInfo
const userInfo = new UserInfo({
  nameElement: profileElements.name,
  jobElement: profileElements.job,
  avatarElement: profileElements.avatar,
});

const cardsSection = new Section(createCard, cardsSelector);

// Попапы
const profileEditPopup = new PopupWithForm(
  profileEditPopupSelector,
  (data) => {
    profileEditPopup.blockSubmitButton();
    api
      .setUserInfo(data)
      .then((res) => {
        userInfo.fill(res);
        userInfo.renderName();
        userInfo.renderJob();
        profileEditPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        profileEditPopup.unblockSubmitButton();
      });
  },
  handleOpenForm
);

const avatarChangePopup = new PopupWithForm(
  avatarChangePopupSelector,
  (data) => {
    avatarChangePopup.blockSubmitButton();

    api
      .changeAvatar(data.link)
      .then((res) => {
        userInfo.fill(res);
        userInfo.renderAvatar();
        avatarChangePopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        avatarChangePopup.unblockSubmitButton();
      });
  },
  handleOpenForm
);

// avatarChangePopup.setEventListeners();

// Инициализация Popup с добавлением новой карточки
const newCardPopup = new PopupWithForm(
  newCardPopupSelector,
  (data) => {
    newCardPopup.blockSubmitButton();

    api
      .addNewCard(data)
      .then((res) => {
        cardsSection.addItem(createCard(res), true);
        newCardPopup.close();
        // formValidators[newCardForm.getAttribute("name")].disableButtonState();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        newCardPopup.unblockSubmitButton();
      });
  },
  handleOpenForm
);

// Инициализация Popup с увеличенным изображением
const imagePopup = new PopupWithImage(imagePopupSelector);

// Установка слушателей событий
profileEditPopup.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(
  confirmationPopupSelector,
  (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cards[cardId].delete();
        popupWithConfirmation.close();
      })
      .catch((err) => console.error(err));
  }
);

// popupWithConfirmation.setEventListeners();

/**
 * Первоначальное получение данных от сервера
 */
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((results) => {
    userInfo.fill(results[0]);
    userInfo.renderName();
    userInfo.renderJob();
    userInfo.renderAvatar();
    cardsSection.renderItems(results[1]);
  })
  .catch((err) => console.error(err));

/**
 * Установка слушателей для работы попапов
 */
// Попап редактирования информации
profileEditPopup.setEventListeners();

profileEditButton.addEventListener("click", function () {
  ({ name: profileNameInput.value, job: profileJobInput.value } =
    userInfo.getUserInfo());
  // profileEditPopup.setInputValues(userInfo.getUserInfo());
  profileEditPopup.open();
  profileNameInput.dispatchEvent(new Event("input"));
  profileJobInput.dispatchEvent(new Event("input"));
});

// Попап обновления аватара
avatarChangePopup.setEventListeners();

avatarChangeButton.addEventListener("click", () => {
  avatarChangePopup.open();
});

// Попап добавления новой карточки
newCardPopup.setEventListeners();

newCardButton.addEventListener("click", function () {
  newCardPopup.open();
});

// const popupImage = new PopupWithImage(".popup_type_image");
// popupImage.setEventListeners();

// Попап с подтвержденим информации
popupWithConfirmation.setEventListeners();

// Попап с увеличенным изображением
imagePopup.setEventListeners();

// Вызов функций и методов при загрузке страницы
//cardsSection.renderItems();

/**
 * Включение валидации форм
 */
validateForms(formSelectors);
