import {markerGroup, advertsToMarkers, adverts} from './create-map.js';

const PRICE_MIN_MAX = {
  MIN: 10000,
  MAX: 50000,
};

const SIMILAR_PLACE_COUNT = 10;


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

const getFilterFeatures = (checkingFeature) => {
  const chooseAdvert = filtersMap.querySelectorAll('.map__checkbox:checked');
  let result = true;
  chooseAdvert.forEach((element) => {
    if (!checkingFeature.includes(element.value)) {
      result = false;
    }
  });
  return result;
};

const getFiltersAll = (bestAdverts) => {
  const housingAdvert = typeOfElement.value;
  const roomsAdvert = roomsOfElement.value;
  const guestsAdvert = guestsOfElement.value;
  const priceAdvert = priceOfElement.value;
  const compareValues = (offerValue, filterValue) => filterValue === 'any' ? true : String(offerValue) === filterValue;
  const compareValuesFeatures = (features, cb) => features === undefined ? false : cb(features);

  const newAdverts = [];
  for (let i = 0; newAdverts.length < 10 && i < bestAdverts.length - 1; i++) {
    const advert = bestAdverts[i];
    const offer = advert.offer;
    if (
      compareValues(offer.type, housingAdvert) &&
      compareValues(offer.rooms, roomsAdvert) &&
      compareValues(offer.guests, guestsAdvert) &&
      getPriceFilter(priceAdvert, offer.price) &&
      compareValuesFeatures(offer.features, getFilterFeatures)
    ) {
      newAdverts.push(advert);
    }}
  return newAdverts;
};

const makeAllGood = (rightAdverts) => {
  advertsToMarkers(rightAdverts.slice(0, SIMILAR_PLACE_COUNT));
};


const mainRenderPoints = (goodAdverts) => {
  makeAllGood(goodAdverts);

  filtersMap.addEventListener('change', () => {
    advertsToMarkers(getFiltersAll(goodAdverts).sort(compareAdvert).slice(0, SIMILAR_PLACE_COUNT));
  });
};

const clearFilter = () => {
  filtersMap.reset();
  markerGroup.clearLayers();
  makeAllGood(adverts);
};

export {mainRenderPoints, clearFilter};
