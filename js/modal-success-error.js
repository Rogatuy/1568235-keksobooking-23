import {isEscEvent} from './util.js';
import {resetMarker} from './create-map.js';
import {clearFilter} from './filter.js';
import {clearPhoto} from './preview-photo.js';

const templateModalSuccess = document.querySelector('#success').content;
const modalSuccess = templateModalSuccess.querySelector('div');

const templateModalError = document.querySelector('#error').content;
const modalError = templateModalError.querySelector('div');

const templateModalErrorServer = document.querySelector('#error-server').content;
const modalErrorServer = templateModalErrorServer.querySelector('div');

const valueOfCapacityDefault = 1;

const disabledCapacityOptions = [2, 3, 100];

const resetFormRooms = () => {
  const selectFormCapacity = document.querySelector('#capacity');
  const optionFormCapacity = selectFormCapacity.querySelectorAll('option');
  disabledCapacityOptions.forEach((element) => {
    for (let i = 0; i <=optionFormCapacity.length; i++ )
    {if (optionFormCapacity[i].value === element) {
      optionFormCapacity[i].setAttribute('disabled', 'disabled');
    } else {
      optionFormCapacity[i].removeAttribute('disabled');
    }}
  });

  optionFormCapacity.value = valueOfCapacityDefault;
  // for (let i = 2; i <= 3; i++) {
  //   if (i <= event.target.value) {
  //     const targetOptionCapacity = userCapacitySelect.querySelector(`option[value='${i}']`);
  //     targetOptionCapacity.removeAttribute('disabled');
  //   }


};

const displayWindowSuccess = () => {
  const newModal = modalSuccess.cloneNode(true);
  const bodyPage = document.querySelector('body');
  bodyPage.appendChild(newModal);
  const onKeydown = (evt) => {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      resetMarker();
      document.querySelector('.ad-form').reset();
      clearFilter();
      clearPhoto();
      resetFormRooms();
      const placeholderPrice = document.querySelector('#price');
      placeholderPrice.setAttribute('placeholder', '1000');
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('click', onClick);
    }
  };
  const onClick = () => {
    newModal.style.display='none';
    resetMarker();
    document.querySelector('.ad-form').reset();
    clearFilter();
    clearPhoto();
    const placeholderPrice = document.querySelector('#price');
    placeholderPrice.setAttribute('placeholder', '1000');
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeydown);
  };

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
};

const displayWindowError = () => {
  const newModal = modalError.cloneNode(true);
  const bodyPage = document.querySelector('body');
  const buttonClose = newModal.querySelector('.error__button');
  bodyPage.appendChild(newModal);
  const onButton = () => {
    buttonClose.addEventListener('click', () => {
      newModal.style.display='none';
    });
    document.removeEventListener('click', onButton);
  };
  const onKeydown =  (evt) => {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      document.removeEventListener('keydown', onKeydown);
    }
  };
  const onClick = () => {
    newModal.style.display='none';
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
  document.addEventListener('click', onButton);
};

const displayWindowErrorServer = () => {
  const newModal = modalErrorServer.cloneNode(true);
  const bodyPage = document.querySelector('body');
  bodyPage.appendChild(newModal);
  const onKeydown = (evt) => {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      document.removeEventListener('keydown', onKeydown);
    }
  };
  const onClick = () => {
    newModal.style.display='none';
    document.removeEventListener('click', onClick);
  };
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
};

export {displayWindowSuccess, displayWindowError, displayWindowErrorServer, resetFormRooms};