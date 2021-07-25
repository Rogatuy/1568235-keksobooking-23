import { getData } from './api.js';
import {preloadDisabledRemove} from './pre-load.js';
import {displayWindowErrorServer} from './modal-success-error.js';
import {mainRenderPoints} from './filter.js';

const LODGING_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const mainPinIconSetting = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const mainPinCoordinates = {
  lat: 35.68940,
  lng: 139.69200,
};

const smallPinIconSetting = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

let adverts = [];
const map = L.map('map-canvas')
  .on('load', () => {
    getData(
      (loadedAdverts) =>  {
        mainRenderPoints(loadedAdverts),
        adverts = loadedAdverts;
      },
      () => displayWindowErrorServer(),
    );
    preloadDisabledRemove();
  })
  .setView(mainPinCoordinates, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon(mainPinIconSetting);

const marker = L.marker(
  mainPinCoordinates,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);
export {marker};

const addressForm = document.querySelector('#address');
addressForm.value = `${mainPinCoordinates.lat.toFixed(5)  }, ${  mainPinCoordinates.lng.toFixed(5)}`;

const resetMarker = () => {
  marker.setLatLng(mainPinCoordinates);

  map.setView(mainPinCoordinates, 10);
  addressForm.setAttribute('value',`${mainPinCoordinates.lat.toFixed(5)  }, ${  mainPinCoordinates.lng.toFixed(5) }`);
};

const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  if (point.offer['title']) {
    popupElement.querySelector('.popup__title').textContent = point.offer.title;
  }else {
    popupElement.querySelector('.popup__title').remove();
  }

  if (point.offer['address']) {
    popupElement.querySelector('.popup__text--address').textContent = point.offer.address;
  }else {
    popupElement.querySelector('.popup__text--address').remove();
  }

  if (point.offer['price']) {
    popupElement.querySelector('.popup__text--price').textContent =  `${point.offer.price  }₽/ночь`;
  }else {
    popupElement.querySelector('.popup__text--price').remove();
  }

  if (point.offer['type']) {
    popupElement.querySelector('.popup__type').textContent = LODGING_TYPE[point.offer.type];
  }else {
    popupElement.querySelector('.popup__type').remove();
  }

  if (point.offer['rooms'] && point.offer['guests']) {
    popupElement.querySelector('.popup__text--capacity').textContent =  `${point.offer.rooms  } комнаты для ${  point.offer.guests  } гостей`;
  }else {
    popupElement.querySelector('.popup__text--capacity').remove();
  }

  if (point.offer['checkin'] && point.offer['checkout']) {
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${  point.offer.checkin  }, выезд до ${  point.offer.checkout}`;
  }else {
    popupElement.querySelector('.popup__text--time').remove();
  }

  const addFeaturesInPopup = (arrayFeatures) => {
    const featuresBlockPopup = popupElement.querySelector('.popup__features');
    for (const elementOfFeatures of arrayFeatures) {
      const classOfLi = `popup__feature--${  elementOfFeatures}`;
      const featuresBlock = featuresBlockPopup.querySelector(`.${  classOfLi}`);
      featuresBlock.style.display = 'inline-block';
    }
  };

  if (point.offer['features']) {
    addFeaturesInPopup(point.offer.features);
  }else {
    popupElement.querySelector('.popup__features').remove();
  }


  popupElement.querySelector('.popup__description').textContent = point.offer.description;
  popupElement.querySelector('.popup__avatar').src = point.author.avatar;

  const photos = popupElement.querySelector('.popup__photos');
  const imageLodging = photos.querySelector('img');
  if (point.offer['photos']) {
    for (const photosElement of point.offer.photos) {
      imageLodging.src = photosElement;
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
  const icon = L.icon(smallPinIconSetting);
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

const advertsToMarkers = (markersAdverts) => {
  const sliceAdverts = markersAdverts.slice();
  sliceAdverts.forEach((point) => {
    createMarker(point);
  });
};

export {createMarker, resetMarker, advertsToMarkers, adverts, markerGroup};
