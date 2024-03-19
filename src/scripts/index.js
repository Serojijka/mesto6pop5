import "../index.css";

import { initialCards } from "./cards";

import { createCardElement, handleLikeIcon, handleDeleteCard } from "./card";

import {
  closeModalWindow,
  openModalWindow,
  setCloseModalWindowEventListeners,
} from "./modal";

const placesWrap = document.querySelector(".places__list");

const profileFormModalWindow = document.querySelector(".popup_type_edit");
const profileForm = profileFormModalWindow.querySelector(".popup__form");
const profileTitleInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);

const cardFormModalWindow = document.querySelector(".popup_type_new-card");
const cardForm = cardFormModalWindow.querySelector(".popup__form");

const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const imageModalWindow = document.querySelector(".popup_type_image");
const imageElement = imageModalWindow.querySelector(".popup__image");
const imageCaption = imageModalWindow.querySelector(".popup__caption");

const openProfileFormButton = document.querySelector(".profile__edit-button");

const openCardFormButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const handlePreviewPicture = ({ name, link }) => {
  imageElement.src = link;
  imageElement.alt = `Изображение ${name}`;
  imageCaption.textContent = name;
  openModalWindow(imageModalWindow);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModalWindow(profileFormModalWindow);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  placesWrap.prepend(
    createCardElement(
      { name: cardNameInput.value, link: cardLinkInput.value },
      {
        onPreviewPicture: handlePreviewPicture,
        onLikeIcon: handleLikeIcon,
        onDeleteCard: handleDeleteCard,
      }
    )
  );

  closeModalWindow(cardFormModalWindow);
  cardForm.reset();
};

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

openProfileFormButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModalWindow(profileFormModalWindow);
});

openCardFormButton.addEventListener("click", () => {
  openModalWindow(cardFormModalWindow);
});

initialCards.forEach((data) => {
  placesWrap.append(
    createCardElement(data, {
      onPreviewPicture: handlePreviewPicture,
      onLikeIcon: handleLikeIcon,
      onDeleteCard: handleDeleteCard,
    })
  );
});

setCloseModalWindowEventListeners(profileFormModalWindow);
setCloseModalWindowEventListeners(cardFormModalWindow);
setCloseModalWindowEventListeners(imageModalWindow);
