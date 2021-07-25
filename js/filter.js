import {debounce} from './utils/debounce.js';
import {markerGroup, advertsToMarkers} from './create-map.js';
import {getData} from './api.js';
import {displayWindowErrorServer} from './modal-success-error.js';

const PRICE_MIN_MAX = {
  MIN: 10000,
  MAX: 50000,
};

const SIMILAR_PLACE_COUNT = 10;


const filtersCheckboxes = document.querySelectorAll('.map__checkbox');
const filtersMap = document.querySelector('.map__filters');
const typeOfElement = document.querySelector('#housing-type');
const priceOfElement = document.querySelector('#housing-price');
const roomsOfElement = document.querySelector('#housing-rooms');
const guestsOfElement = document.querySelector('#housing-guests');


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

const getAdvertRank = (advert) => {
  const chooseAdvert = filtersMap.querySelectorAll('.map__checkbox:checked');
  let rank = 0;
  chooseAdvert.forEach((feature) => {
    if (advert.offer.features && advert.offer.features.includes(feature.value)) {
      rank += 1;
    }
  });
  return rank;
};

const compareAdvert = (placeA, placeB) => {
  const rankA = getAdvertRank(placeA);
  const rankB = getAdvertRank(placeB);
  return rankB - rankA;
};

const getFilterFeatures = (offer) => {
  const chooseAdvert = filtersMap.querySelectorAll('.map__checkbox:checked');
  chooseAdvert.forEach((element) => {
    if (!offer.includes(element.name)) {
      return false;
    }
  });
  return true;
};

const getFiltersAll = (adverts) => {
  const housingAdvert = typeOfElement.value;
  const roomsAdvert = roomsOfElement.value;
  const guestsAdvert = guestsOfElement.value;
  const priceAdvert = priceOfElement.value;
  const compareValues = (offerValue, filterValue) => filterValue === 'any' ? true : String(offerValue) === filterValue;
  const compareValuesFeatures = (features, cb) => features === undefined ? false : cb;

  const newAdverts = [];
  for (let i = 0; newAdverts.length < 10 || i < adverts.length - 1; i++) {
    const offer = adverts[i];
    console.log(offer);
    if (
      compareValues(offer.type, housingAdvert) &&
      compareValues(offer.rooms, roomsAdvert) &&
      compareValues(offer.guests, guestsAdvert) &&
      getPriceFilter(priceAdvert, offer.price) &&
      compareValuesFeatures(offer.features, getFilterFeatures)
    ) {
      newAdverts.push(offer);
    }}
  return newAdverts;
};


const mainRenderPoints = (adverts) => {
  advertsToMarkers(adverts.slice(0, SIMILAR_PLACE_COUNT));
  filtersMap.addEventListener('change', () => {
    getFiltersAll(adverts);
    const clearMarkerPoints = () => {
      markerGroup.clearLayers();
      advertsToMarkers(getFiltersAll(adverts).sort(compareAdvert).slice(0, SIMILAR_PLACE_COUNT));
    };
    const debounceClearMarkerPoints = debounce(() => clearMarkerPoints(adverts));
    debounceClearMarkerPoints();
  });
};

const clearFilter = () => {
  filtersMap.reset();
  getData(
    (places) => mainRenderPoints(places),
    () => displayWindowErrorServer,
  );
};

export {mainRenderPoints, clearFilter};
