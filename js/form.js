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
const newAd = document.querySelector('.ad-form');
const userTitleInput = newAd.querySelector('#title');

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


const userPriceInput = newAd.querySelector('#price');
userPriceInput.addEventListener('input', () => {
  const valuePrice = userPriceInput.value;
  if (valuePrice > MAX_PRICE_VALUE) {
    userPriceInput.setCustomValidity('Цена не может превышать 1000000 руб.');
  } else {
    userPriceInput.setCustomValidity('');
  }
  userPriceInput.reportValidity();
});


const userTypeSelect = newAd.querySelector('#type');

userTypeSelect.addEventListener('change', (event) => {
  const valueOption = event.target.value;
  userPriceInput.placeholder = LODGING_MIN_PRICE[valueOption];
  userPriceInput.min = LODGING_MIN_PRICE[valueOption];
});


// ниже топорный код!!!!))))))))
const userRoomNumberSelect = newAd.querySelector('#room_number');
const userCapacitySelect = newAd.querySelector('#capacity');
userRoomNumberSelect.addEventListener('change', (event) => {
  if (event.target.value === '1') {
    userCapacitySelect.querySelector('[value="1"]').removeAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="2"]').setAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="3"]').setAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="0"]').setAttribute('disabled', 'disabled');
  }
  if (event.target.value === '2') {
    userCapacitySelect.querySelector('[value="2"]').removeAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="3"]').setAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="1"]').removeAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="0"]').setAttribute('disabled', 'disabled');
  }
  if (event.target.value === '3') {
    userCapacitySelect.querySelector('[value="2"]').removeAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="3"]').removeAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="1"]').removeAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="0"]').setAttribute('disabled', 'disabled');
  }
  if (event.target.value === '100') {
    userCapacitySelect.querySelector('[value="2"]').setAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="3"]').setAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="1"]').setAttribute('disabled', 'disabled');
    userCapacitySelect.querySelector('[value="0"]').removeAttribute('disabled', 'disabled');
  }
}); //этот код дичайше топорный.)))мне прямо неприятно, насколько он топорный.)))))) Можешь подсказать, как можно сделать иначе? И я в разметку изначально добавил disabled на все, кроме 1, так же можно сделать?
