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


getRandomWhole();
getRandomFractional();

