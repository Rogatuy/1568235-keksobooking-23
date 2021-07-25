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

const disabledCapacityOptions = [];
let notDisabledCapacityOption = null;
const selectFormCapacity = document.querySelector('#capacity');
const optionFormCapacity = selectFormCapacity.querySelectorAll('option');

for (let i = 0; i < optionFormCapacity.length; i++ ) {
  if (optionFormCapacity[i].hasAttribute('selected')) {
    notDisabledCapacityOption = optionFormCapacity[i].value;
  } else {
    disabledCapacityOptions.push(optionFormCapacity[i].value);
  }
}


const resetFormRooms = () => {
  for (let i = 0; i < optionFormCapacity.length; i++ ) {
    disabledCapacityOptions.forEach((item) => {
      if (optionFormCapacity[i].value === `${item}`) {
        optionFormCapacity[i].setAttribute('disabled', 'disabled');
      }
      if (optionFormCapacity[i].value === `${notDisabledCapacityOption}`) {
        optionFormCapacity[i].removeAttribute('disabled');}
    });
  }
};

const displayWindowSuccess = () => {
  const newModal = modalSuccess.cloneNode(true);
  const bodyPage = document.querySelector('body');
  bodyPage.appendChild(newModal);
  const removeListeners = () => {
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onClick);
  };

  function onKeydown(evt) {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      resetMarker();
      document.querySelector('.ad-form').reset();
      clearFilter();
      clearPhoto();
      resetFormRooms();
      const placeholderPrice = document.querySelector('#price');
      placeholderPrice.setAttribute('placeholder', '1000');
      removeListeners();
    };
  };

  function onClick() {
    newModal.style.display='none';
    resetMarker();
    document.querySelector('.ad-form').reset();
    clearFilter();
    clearPhoto();
    resetFormRooms();
    const placeholderPrice = document.querySelector('#price');
    placeholderPrice.setAttribute('placeholder', '1000');
    removeListeners();
  };

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
};


const displayWindowError = () => {
  const newModal = modalError.cloneNode(true);
  const bodyPage = document.querySelector('body');
  const buttonClose = newModal.querySelector('.error__button');
  bodyPage.appendChild(newModal);
  const removeListeners = () => {
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onClick);
    document.removeEventListener('click', onButton);

  function onButton() {
    buttonClose.addEventListener('click', () => {
      newModal.style.display='none';
    });
    removeListeners();
  };

  function onKeydown (evt) {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      removeListeners();
    }
  };

  function onClick() {
    newModal.style.display='none';
    removeListeners();
  };

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
  document.addEventListener('click', onButton);
};

const displayWindowErrorServer = () => {
  const newModal = modalErrorServer.cloneNode(true);
  const bodyPage = document.querySelector('body');
  bodyPage.appendChild(newModal);
  const removeListeners = () => {
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onClick);
  }

  function onKeydown (evt) {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      document.removeEventListener('keydown', onKeydown);
      removeListeners();
    }
  };
  function onClick() {
    newModal.style.display='none';
    document.removeEventListener('click', onClick);
    removeListeners();
  };
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
};

export {displayWindowSuccess, displayWindowError, displayWindowErrorServer, resetFormRooms};
