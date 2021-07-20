import {preloadDisabledRemove} from './pre-load.js';

const LODGING_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const map = L.map('map-canvas')
  .setView ({
    lat: 35.6894,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

map.onload = preloadDisabledRemove();

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.6894,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);
export {marker};

const addressForm = document.querySelector('#address');
addressForm.value = `${marker.getLatLng().lat  }, ${  marker.getLatLng().lng}`;

const resetMarker = function () {
  marker.setLatLng({
    lat: 35.6894,
    lng: 139.692,
  });

  map.setView({
    lat: 35.6894,
    lng: 139.692,
  }, 10);
  addressForm.value = `${marker.getLatLng().lat  }, ${  marker.getLatLng().lng}`;
};

const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  if (typeof point.offer['title'] !== 'undefined') {
    popupElement.querySelector('.popup__title').textContent = point.offer.title;
  }else {
    popupElement.querySelector('.popup__title').remove();
  }

  if (typeof point.offer['address'] !== 'undefined') {
    popupElement.querySelector('.popup__text--address').textContent = point.offer.address;
  }else {
    popupElement.querySelector('.popup__text--address').remove();
  }

  if (typeof point.offer['price'] !== 'undefined') {
    popupElement.querySelector('.popup__text--price').textContent =  `${point.offer.price  }₽/ночь`;
  }else {
    popupElement.querySelector('.popup__text--price').remove();
  }

  if (typeof point.offer['type'] !== 'undefined') {
    popupElement.querySelector('.popup__type').textContent = LODGING_TYPE[point.offer.type];
  }else {
    popupElement.querySelector('.popup__type').remove();
  }

  if (typeof point.offer['rooms'] !== 'undefined' && typeof point.offer['guests'] !== 'undefined') {
    popupElement.querySelector('.popup__text--capacity').textContent =  `${point.offer.rooms  } комнаты для ${  point.offer.guests  } гостей`;
  }else {
    popupElement.querySelector('.popup__text--capacity').remove();
  }

  if (typeof point.offer['checkin'] !== 'undefined' && typeof point.offer['checkout'] !== 'undefined') {
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${  point.offer.checkin  }, выезд до ${  point.offer.checkout}`;
  }else {
    popupElement.querySelector('.popup__text--time').remove();
  }

  const addFeaturesInPopup = function (arrayFeatures) {
    const featuresBlockPopup = popupElement.querySelector('.popup__features');
    for (let i = 0; i < arrayFeatures.length; i++) {
      const classOfLi = `popup__feature--${  arrayFeatures[i]}`;
      const featuresBlock = featuresBlockPopup.querySelector(`.${  classOfLi}`);
      featuresBlock.style.display = 'inline-block';
    }
  };

  if (typeof point.offer['features'] !== 'undefined') {
    addFeaturesInPopup(point.offer.features);
  }else {
    popupElement.querySelector('.popup__features').remove();
  }


  popupElement.querySelector('.popup__description').textContent = point.offer.description;
  popupElement.querySelector('.popup__avatar').src = point.author.avatar;

  const photos = popupElement.querySelector('.popup__photos');
  const imageLodging = photos.querySelector('img');
  if (typeof point.offer['photos'] !== 'undefined') {
    for (let i = 0; i < point.offer.photos.length; i++) {
      imageLodging.src = point.offer.photos[i];
      photos.appendChild(imageLodging);
    }
  } else {
    popupElement.querySelector('.popup__photos').remove();
  }
  return popupElement;
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng} = point.location;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const markerForLodging = L.marker({
    lat,
    lng,
  },
  {
    icon,
  },
  );
  markerForLodging
    .addTo(markerGroup)
    .bindPopup(
      createCustomPopup(point),
      {
        keepInView: true,
      },
    );
};

const advertsToMarkers = function (adverts) {
  const sliceAdverts = adverts.slice();
  sliceAdverts.forEach((point) => {
    createMarker(point);
  });
};

export {createMarker, resetMarker, advertsToMarkers, markerGroup};
