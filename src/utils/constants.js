/**
 * Элементы страницы и их селекторы
 */
// Контейнер с карточками
export const cardsSelector = ".cards";
export const cardTemplateSelector = "#card";

// Общие элементы форм
export const formSelector = ".popup__form";
export const inputSelector = ".popup__input";
export const submitButtonSelector = ".popup__save-button";
export const inactiveButtonClass = "popup__save-button_disabled";
export const inputErrorClass = "popup__input_type_error";
export const errorClass = "popup__input-error_active";

/** Элементы страницы */ // Редаткирование информации о пользователе
export const profileAvatar = document.querySelector(".profile__avatar-image");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");
export const profileEditButton = document.querySelector(
  ".profile__button_type_edit"
);
export const profileEditPopupSelector = ".popup_type_edit-profile";
const profileEditPopupElement = document.querySelector(
  profileEditPopupSelector
);

//export const profileEditForm = profileEditPopup.querySelector(".popup__form");
export const profileNameInput = profileEditPopupElement.querySelector(
  ".popup__input_type_name"
);
export const profileJobInput = profileEditPopupElement.querySelector(
  ".popup__input_type_job"
);

// Добавление новых карточек
export const newCardPopupSelector = ".popup_type_add-card";
export const newCardPopupElement = document.querySelector(newCardPopupSelector);
export const newCardButton = document.querySelector(
  ".profile__button_type_add"
);
export const newCardForm = newCardPopupElement.querySelector(formSelector);
//export const newCardTitle = newCardPopup.querySelector(
//  ".popup__input_type_title"
//);
// export const newCardLink = newCardPopup.querySelector(
//   ".popup__input_type_link"
// );

// Попап с увеличенным изображением
export const imagePopupSelector = ".popup_type_image";

// Попап с подтверждением
export const confirmationPopupSelector = ".popup_type_confirm";

// Настройки для подключения к серверу
const token = "e15cec99-d6b9-42d3-8bac-fea59fe72095";
const cohortId = "cohort-65";
export const apiConfig = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};
