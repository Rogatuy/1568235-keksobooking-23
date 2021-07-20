import {debounce} from './utils/debounce.js';
import {markerGroup, advertsToMarkers} from './create-map.js';
import {getData} from './api.js';
import {displayWindowErrorServer} from './modal_success_error.js';


const PRICE_MIN_MAX = {
  MIN: 10000,
  MAX: 50000,
};

const SIMILAR_PLACE_COUNT = 10;


const filtersCheckboxes = document.querySelectorAll('.map__checkbox');
const filtersMap = document.querySelector('.map__filters');
const typeOfAdvert = document.querySelector('#housing-type');
const priceOfAdvert = document.querySelector('#housing-price');
const roomsOfAdvert = document.querySelector('#housing-rooms');
const guestsOfAdvert = document.querySelector('#housing-guests');


const getPriceFilter = (key, price) => {
  switch (key) {
    case 'any':
      return true;
    case 'low':
      return price < PRICE_MIN_MAX.MIN;
    case 'middle':
      return (PRICE_MIN_MAX.MIN < price) && (price < PRICE_MIN_MAX.MAX);
    case 'high':
      return price > PRICE_MIN_MAX.MAX;
    default:
      return false;
  }
};

const getAdvertRank = function (advert) {
  const chooseAdvert = filtersMap.querySelectorAll('.map__checkbox:checked');
  let rank = 0;
  chooseAdvert.forEach((feature) => {
    if (advert.offer.features && advert.offer.features.includes(feature.value)) {
      rank += 1;
    }
  });
  return rank;
};

const compareAdvert = function (placeA, placeB) {
  const rankA = getAdvertRank(placeA);
  const rankB = getAdvertRank(placeB);
  return rankB - rankA;
};

const filterFeatures = function (offer) {
  const chooseAdvert = filtersMap.querySelectorAll('.map__checkbox:checked');
  chooseAdvert.forEach((element) => {
    if (!offer.includes(element.name)) {
      return false;
    }
  });
  return true;
};

const filtersAll = function (advert) {
  const housingAdvert = typeOfAdvert.value;
  const roomsAdvert = roomsOfAdvert.value;
  const guestsAdvert = guestsOfAdvert.value;
  const priceAdvert = priceOfAdvert.value;
  const compareValues = (offerValue, filterValue) => filterValue === 'any' ? true : String(offerValue) === filterValue;
  const compareValuesFeatures = (features, cb) => features === undefined ? false : cb;

  return advert.filter(({offer}) =>
    compareValues(offer.type, housingAdvert) &&
    compareValues(offer.rooms, roomsAdvert) &&
    compareValues(offer.guests, guestsAdvert) &&
    getPriceFilter(priceAdvert, offer.price) &&
    compareValuesFeatures(offer.features, filterFeatures));
};

const mainRenderPoints = function (advert) {
  advertsToMarkers(advert.slice(0, SIMILAR_PLACE_COUNT));
  filtersMap.addEventListener('change', () => {
    filtersAll(advert);
    const clearMarkerPoints = function () {
      markerGroup.clearLayers();
      advertsToMarkers(filtersAll(advert).sort(compareAdvert).slice(0, SIMILAR_PLACE_COUNT));
    };
    const debounceClearMarkerPoints = debounce(() => clearMarkerPoints(advert));
    debounceClearMarkerPoints();
  });
};

const clearFilter = function () {
  typeOfAdvert.value = 'any';
  priceOfAdvert.value = 'any';
  roomsOfAdvert.value = 'any';
  guestsOfAdvert.value = 'any';
  filtersCheckboxes.forEach((checkbox) => checkbox.checked = false);
  getData(
    (places) => mainRenderPoints(places),
    () => displayWindowErrorServer,
  );
};

export {mainRenderPoints, clearFilter};
