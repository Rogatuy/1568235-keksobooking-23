const getRandomWhole = (min, max) => {
  if (min < 0) {
    min = 0;
  }

  if (max <= min) {
    max = min + 1;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

const getRandomFractional = (min, max, quantity) => {
  if (min < 0) {
    min = 0;
  }

  if (max <= min) {
    max = min + 1;
  }

  if (quantity < 0) {
    quantity = 1;
  }

  if (quantity > 20) {
    quantity = 20;
  }

  return (Math.random() * (max - min) + min).toFixed(quantity);
};

const AVATAR_ADRESS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const TYPE_OBJECT = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_CHECK = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES_OBJECT = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS_OBJECT = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomElement = (elements) => elements[getRandomWhole(0, elements.length - 1)];

const getAvatar = () => {
  const getIndexAvatar = getRandomWhole(0, AVATAR_ADRESS.length - 1);
  const avatar = AVATAR_ADRESS[getIndexAvatar];
  AVATAR_ADRESS.splice(getIndexAvatar, 1);
  return avatar;
};

const getFeatures = () => {
  const featuresLength = getRandomWhole(0,6);
  const featuresMassive = [];
  featuresMassive.length = featuresLength;
  for (let index = 0; index <= featuresMassive.length-1; index++) {
    const number = getRandomWhole(0, FEATURES_OBJECT.length - 1);
    featuresMassive[index] = FEATURES_OBJECT[number];
    FEATURES_OBJECT.splice(number, 1);
  }
  return featuresMassive;
};

const getPhoto = () => {
  const photoMassive = [];
  const photoMassiveLength = getRandomWhole(0,Number.POSITIVE_INFINITY);
  photoMassive.length = photoMassiveLength;
  for (let index = 0; index <= photoMassive.length-1; index++) {
    const number = getRandomWhole(0, PHOTOS_OBJECT.length - 1);
    photoMassive[index] = PHOTOS_OBJECT[number];
  }
  return photoMassive;
};


const author = () => ({
  avatar: getAvatar(),
});

const offer = () => {
  const offered = {
    title: 'Объект аренды',
    address: getRandomFractional(35.65, 35.7, 5) + ' ' + getRandomFractional(139.7, 139.8, 5),
    price: getRandomWhole(0, Number.POSITIVE_INFINITY),
    type: getRandomElement(TYPE_OBJECT),
    rooms: getRandomWhole(0, Number.POSITIVE_INFINITY),
    guests: getRandomWhole(0, Number.POSITIVE_INFINITY),
    checkin: getRandomElement(TIME_CHECK),
    checkout: getRandomElement(TIME_CHECK),
    features: getFeatures(),
    description: 'Прекрасное жилье',
    photos: getPhoto(),
  };
  return offered;
};

const getObjectMassive = () => {
  const objectMassive = [];
  for (let index = 0; index <= 9; index++) {
    objectMassive[index] = [author(), offer(), location()];
  }
  return objectMassive;
};

console.log(getObjectMassive());
