export default class Card {
  /**
   * Класс отвечает за создание карточки
   *
   * Параметры:
   * name - отображаемый заголовок карточки
   * link - ссылка на изображение
   * templateSelector - селектор template-элемента с шаблоном карточки
   * handleCardClick - обработчик нажатия на изображение карточки
   */
  constructor(
    { name, link, likes, owner, createdAt, _id },
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    userId
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._owner = owner;
    this._createdAt = createdAt;
    this._id = _id;
    this._userId = userId;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(".card__like-button");

    // Заполнение содержимого
    const image = this._element.querySelector(".card__image");
    image.src = this._link;
    image.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__like-count").textContent =
      this._likes.length;
    if (this._owner._id !== this._userId) {
      this._element.querySelector(".card__delete-button").remove();
    }

    // Обработчики нажатий
    this._setEventlisteners();

    return this._element;
  }

  _setEventlisteners() {
    this._buttonLike.addEventListener("click", (evt) => {
      this._likeCard();
    });
    // this._element
    //   .querySelector(".card__delete-button")
    //   .addEventListener("click", () => this._deleteCard());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._link, this._name)
      );
    if (this._element.querySelector(".card__delete-button")) {
      this._element
        .querySelector(".card__delete-button")
        .addEventListener("click", () => this._deleteCard());
    }
  }

  _likeCard(evt) {
    this._buttonLike.classList.toggle("card__like-button_active");
  }

  _deleteCard() {
    this._handleDeleteCard(this._element);
  }
}
