const LODGING_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const templateCard = document.querySelector('#card').content;
const card = templateCard.querySelector('article');

const getCard = function (advert) {
  const newCard = card.cloneNode(true);

  const title = newCard.querySelector('.popup__title');
  title.textContent = advert.offer.title;

  const address = newCard.querySelector('.popup__text--address');
  address.textContent = advert.offer.address;

  const priceForNight = newCard.querySelector('.popup__text--price');
  priceForNight.textContent = `${advert.offer.price  }₽/ночь`;

  const blockLodging = newCard.querySelector('.popup__type');
  const lodgingName = advert.offer.type;
  blockLodging.textContent = LODGING_TYPE[lodgingName];

  const capacity = newCard.querySelector('.popup__text--capacity');
  capacity.textContent = `${advert.offer.rooms  } комнаты для ${  advert.guests  } гостей`;

  const time = newCard.querySelector('.popup__text--time');
  time.textContent = `Заезд после ${  advert.offer.checkin  }, выезд до ${  advert.checkout}`;

  const features = newCard.querySelector('.popup__features');
  features.textContent = advert.offer.features.join(', ');

  const description = newCard.querySelector('.popup__description');
  description.textContent = advert.offer.description;

  const photos = newCard.querySelector('.popup__photos');
  const imageLodging = photos.querySelector('img');
  for (let i = 0; i < advert.offer.photos.length; i++) {
    imageLodging.src = advert.offer.photos[i];
    photos.appendChild(imageLodging);
  }
  const avatarImage = newCard.querySelector('.popup__avatar');
  avatarImage.src = advert.author.avatar;

  return newCard;
};

export {getCard};
