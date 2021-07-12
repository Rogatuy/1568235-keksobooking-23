import './util.js';
import './data.js';
import './form.js';
import './similar-elements.js';
import './create-map.js';
import './pre-load.js';


// const SIMILAR_CARD_COUNT = 10;

// import {getCard} from './similar-elements.js';
import {createMarker} from './create-map.js';

// const points = [
//   {
//     title: 'Номер раз',
//     lat: 35.5894,
//     lng: 139.592,
//   },
//   {
//     title: 'Номер два',
//     lat: 35.7894,
//     lng: 139.792,
//   },
// ];

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((advert) => {
    // console.log(advert);
    advert.location.forEach((point) => { //в этой строчке я ищу все lat и lng в массиве. но что-то тут не то, и я не понимаю что(((
      createMarker(point);
    });
  });

//  getCard(advert);
// });
