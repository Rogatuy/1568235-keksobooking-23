import { offer, author } from './util.js';


const lodgingType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const exampleCard = offer();
const exampleAuthor = author();


const templateCard = document.querySelector('#card').content;
const card = templateCard.querySelector('article');

const getCard = function (advert, authorAvatar) {

  const newCard = card.cloneNode(true);

  const title = newCard.querySelector('.popup__title');
  title.textContent = advert.title;

  const address = newCard.querySelector('.popup__text--address');
  address.textContent = advert.address;

  const priceForNight = newCard.querySelector('.popup__text--price');
  priceForNight.textContent = `${advert.price  }₽/ночь`;

  const blockLodging = newCard.querySelector('.popup__type');
  const lodgingName = advert.type;
  blockLodging.textContent = lodgingType[lodgingName];

  const capacity = newCard.querySelector('.popup__text--capacity');
  capacity.textContent = `${advert.rooms  } комнаты для ${  advert.guests  } гостей`;

  const time = newCard.querySelector('.popup__text--time');
  time.textContent = `Заезд после ${  advert.checkin  }, выезд до ${  advert.checkout}`;

  const features = newCard.querySelector('.popup__features');
  features.textContent = advert.features.join(', ');

  const description = newCard.querySelector('.popup__description');
  description.textContent = advert.description;

  const photos = newCard.querySelector('.popup__photos');
  const imageLodging = photos.querySelector('img');
  for (let i = 0; i < advert.photos.length; i++) {
    imageLodging.src = advert.photos[i];
    photos.appendChild(imageLodging);
  }
  const avatarImage = newCard.querySelector('.popup__avatar');
  avatarImage.src = authorAvatar.avatar;

  return newCard;
};

const endCard = getCard(exampleCard,exampleAuthor);

const insertCard = document.querySelector('.map__canvas');
insertCard.appendChild(endCard);

