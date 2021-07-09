
import {preloadDisabledRemove} from './pre-load.js';

const nextButton = document.querySelector('#next');

const resetButton = document.querySelector('#reset');
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

resetButton.addEventListener('click', () => {
  marker.setLatLng({
    lat: 35.6894,
    lng: 139.692,
  });

  map.setView({
    lat: 35.6894,
    lng: 139.692,
  }, 10);
});

const points = [
  {
    title: 'Номер раз',
    lat: 35.5894,
    lng: 139.592,
  },
  {
    title: 'Номер два',
    lat: 35.7894,
    lng: 139.792,
  },
];

const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = point.title;
  popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${point.lat}, ${point.lng}`;

  return popupElement;
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng} = point;
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

points.forEach((point) => {
  createMarker(point);
});

nextButton.addEventListener('click', () => {
  markerGroup.clearLayers();
  points.slice(0, points.length / 2).forEach((point) => {
    createMarker(point);
  });
  nextButton.remove();
});
