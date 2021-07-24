import {marker, resetMarker} from './create-map.js';
import {displayWindowSuccess, displayWindowError} from './modal-success-error.js';
import {sendData} from './api.js';
import {clearFilter} from './filter.js';
import {clearPhoto} from './preview-photo.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const LODGING_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const pricePlaceholderDefault = 1000;
const advertForm = document.querySelector('.ad-form');

const getPictures = function (picture) {
  const pictureInput = advertForm.querySelector(picture);
  pictureInput.setAttribute('accept', 'image/png, image/jpeg');
};

getPictures('#avatar');
getPictures('#images');

const userTitleInput = advertForm.querySelector('#title');
userTitleInput.addEventListener('input', () => {
  const valueLength = userTitleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    userTitleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    userTitleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    userTitleInput.setCustomValidity('');
  }
  userTitleInput.reportValidity();
});

const userPriceInput = advertForm.querySelector('#price');
userPriceInput.addEventListener('input', () => {
  const valuePrice = userPriceInput.value;
  if (valuePrice > MAX_PRICE_VALUE) {
    userPriceInput.setCustomValidity('Цена не может превышать 1000000 руб.');
  } else {
    userPriceInput.setCustomValidity('');
  }
  userPriceInput.reportValidity();
});

const userTypeSelect = advertForm.querySelector('#type');

userTypeSelect.addEventListener('change', (event) => {
  const valueOption = event.target.value;
  userPriceInput.placeholder = LODGING_MIN_PRICE[valueOption];
  userPriceInput.min = LODGING_MIN_PRICE[valueOption];
});

const userRoomNumberSelect = advertForm.querySelector('#room_number');
const userCapacitySelect = advertForm.querySelector('#capacity');
userRoomNumberSelect.addEventListener('change', (event) => {
  const optionsAdvertForm = userCapacitySelect.querySelectorAll('option');
  optionsAdvertForm.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  if (event.target.value > 3) {
    userCapacitySelect.value = 0;
    const targetOption = userCapacitySelect.querySelector('option[value="0"]');
    targetOption.removeAttribute('disabled');
  } else {
    userCapacitySelect.value = event.target.value;
    for (let i = 1; i <= 3; i++) {
      if (i >= event.target.value) {
        const targetOptionCapacity = userCapacitySelect.querySelector('option[value = "i"]'); //с количеством комнат и гостями разобрался. но тут он i не берет, не понимаю почему. цифру берет, а i нет.
        targetOptionCapacity.removeAttribute('disabled');
      }
    }
  }
});
//   const userCapacitySelectZero = userCapacitySelect.querySelector('[value="0"]');
//   const userCapacitySelectOne = userCapacitySelect.querySelector('[value="1"]');
//   const userCapacitySelectTwo = userCapacitySelect.querySelector('[value="2"]');
//   const userCapacitySelectThree = userCapacitySelect.querySelector('[value="3"]');

//   userCapacitySelectZero.setAttribute('disabled', 'disabled');
//   userCapacitySelectOne.setAttribute('disabled', 'disabled');
//   userCapacitySelectTwo.setAttribute('disabled', 'disabled');
//   userCapacitySelectThree.setAttribute('disabled', 'disabled');

//   const resetSelected = function () {
//     userCapacitySelectOne.removeAttribute('selected');
//     userCapacitySelectTwo.removeAttribute('selected');
//     userCapacitySelectThree.removeAttribute('selected');
//     userCapacitySelectZero.removeAttribute('selected');
//   };

//   if (event.target.value === '1') {
//     userCapacitySelectOne.removeAttribute('disabled');
//     resetSelected();
//     userCapacitySelectOne.setAttribute('selected', 'selected');
//   }
//   if (event.target.value === '2') {
//     userCapacitySelectTwo.removeAttribute('disabled');
//     userCapacitySelectOne.removeAttribute('disabled');
//     resetSelected();
//     userCapacitySelectTwo.setAttribute('selected', 'selected');
//   }
//   if (event.target.value === '3') {
//     userCapacitySelectTwo.removeAttribute('disabled');
//     userCapacitySelectOne.removeAttribute('disabled');
//     userCapacitySelectThree.removeAttribute('disabled');
//     resetSelected();
//     userCapacitySelectThree.setAttribute('selected', 'selected');
//   }
//   if (event.target.value === '100') {
//     userCapacitySelectZero.removeAttribute('disabled');
//     resetSelected();
//     userCapacitySelectZero.setAttribute('selected', 'selected');
//   }
// });

const addressForm = advertForm.querySelector('#address');
const addAddressInput = function () {
  marker.on('moveend', (evt) => {
    const mainAddress = evt.target.getLatLng();
    addressForm.value = `${mainAddress.lat.toFixed(5)  }, ${  mainAddress.lng.toFixed(5)}`;
  });
};

addAddressInput();

const setUserFormSubmit = function () {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => displayWindowSuccess(),
      () => displayWindowError(),
      new FormData(evt.target),
    );
  });
};

const buttonResetForm = document.querySelector('.ad-form__reset');
buttonResetForm.addEventListener('click', () => {
  userPriceInput.setAttribute('placeholder', pricePlaceholderDefault);
  resetMarker();
  clearFilter();
  clearPhoto();
});

const userTimeInSelect = advertForm.querySelector('#timein');
const userTimeOutSelect = advertForm.querySelector('#timeout');

const changeTimeInput = function (event, userTimeSelect) {
  userTimeSelect.value = event.target.value;
};

userTimeInSelect.addEventListener('change', (event) => {
  changeTimeInput(event, userTimeOutSelect);
});

userTimeOutSelect.addEventListener('change', (event) => {
  changeTimeInput(event, userTimeInSelect);
});

export {setUserFormSubmit};
