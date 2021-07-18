import './util.js';
import './form.js';
import './similar-elements.js';
import './create-map.js';
import './pre-load.js';
import {setUserFormSubmit} from './form.js';
import {createMarker} from './create-map.js';
import {getData} from './api.js';


const SIMILAR_CARD_COUNT = 10;

getData((adverts) => {
  const sliceAdverts = adverts.slice(0, SIMILAR_CARD_COUNT);
  sliceAdverts.forEach((point) => {
    createMarker(point);
  });
});


setUserFormSubmit();
