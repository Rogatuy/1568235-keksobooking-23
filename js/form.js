import {marker, resetMarker} from './create-map.js';
import {displayWindowSuccess, displayWindowError} from './modal_success_error.js';
import {sendData} from './api.js';
import {clearFilter} from './filter.js';

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
  userCapacitySelect.querySelector('[value="2"]').setAttribute('disabled', 'disabled');
  userCapacitySelect.querySelector('[value="3"]').setAttribute('disabled', 'disabled');
  userCapacitySelect.querySelector('[value="0"]').setAttribute('disabled', 'disabled');
  userCapacitySelect.querySelector('[value="1"]').setAttribute('disabled', 'disabled');

  if (event.target.value === '1') {
    userCapacitySelect.querySelector('[value="1"]').removeAttribute('disabled', 'disabled');
  }
  if (event.target.value === '2') {
    userCapacitySelect.querySelector('[value="2"]').removeAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="1"]').removeAttribute('disabled', 'disabled');
  }
  if (event.target.value === '3') {
    userCapacitySelect.querySelector('[value="2"]').removeAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="3"]').removeAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="1"]').removeAttribute('disabled', 'disabled');
  }
  if (event.target.value === '100') {
    userCapacitySelect.querySelector('[value="0"]').removeAttribute('disabled', 'disabled');
  }
});

const addressForm = advertForm.querySelector('#address');
const addAddressInput = function () {
  marker.on('moveend', (evt) => {
    const mainAddress = evt.target.getLatLng();
    addressForm.value = `${mainAddress.lat.toFixed(5)  }, ${  mainAddress.lng.toFixed(5)}`;
  });
};

addAddressInput();

const setUserFormSubmit = () => {
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
  const placeholderPrice = document.querySelector('#price');
  placeholderPrice.setAttribute('placeholder', '1000');
  resetMarker();
  clearFilter();
});

const userTimeInSelect = advertForm.querySelector('#timein');
const userTimeOutSelect = advertForm.querySelector('#timeout');
userTimeInSelect.addEventListener('change', (event) => {
  if (event.target.value === '12:00') {
    userTimeOutSelect.value = '12:00';
  }
  if (event.target.value === '13:00') {
    userTimeOutSelect.value = '13:00';
  }
  if (event.target.value === '14:00') {
    userTimeOutSelect.value = '14:00';
  }
});

userTimeOutSelect.addEventListener('change', (event) => {
  if (event.target.value === '12:00') {
    userTimeInSelect.value = '12:00';
  }
  if (event.target.value === '13:00') {
    userTimeInSelect.value = '13:00';
  }
  if (event.target.value === '14:00') {
    userTimeInSelect.value = '14:00';
  }
});

export {setUserFormSubmit};
