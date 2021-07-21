import {isEscEvent} from './util.js';
import {resetMarker} from './create-map.js';
import {clearFilter} from './filter.js';

const templateModalSuccess = document.querySelector('#success').content;
const modalSuccess = templateModalSuccess.querySelector('div');

const templateModalError = document.querySelector('#error').content;
const modalError = templateModalError.querySelector('div');

const templateModalErrorServer = document.querySelector('#error-server').content;
const modalErrorServer = templateModalErrorServer.querySelector('div');

const displayWindowSuccess = function () {
  const newModal = modalSuccess.cloneNode(true);
  const bodyPage = document.querySelector('body');
  bodyPage.appendChild(newModal);
  const onKeydown = function (evt) {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      resetMarker();
      document.querySelector('.ad-form').reset();
      clearFilter();
      const placeholderPrice = document.querySelector('#price');
      placeholderPrice.setAttribute('placeholder', '1000');
      document.removeEventListener('keydown', onKeydown);
    }
  };
  const onClick = function () {
    newModal.style.display='none';
    resetMarker();
    document.querySelector('.ad-form').reset();
    clearFilter();
    const placeholderPrice = document.querySelector('#price');
    placeholderPrice.setAttribute('placeholder', '1000');
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
};

const displayWindowError = function () {
  const newModal = modalError.cloneNode(true);
  const bodyPage = document.querySelector('body');
  const buttonClose = newModal.querySelector('.error__button');
  bodyPage.appendChild(newModal);
  const onButton = function () {
    buttonClose.addEventListener('click', () => {
      newModal.style.display='none';
    });
    document.removeEventListener('click', onButton);
  };
  const onKeydown = function (evt) {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      document.removeEventListener('keydown', onKeydown);
    }
  };
  const onClick = function () {
    newModal.style.display='none';
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
  document.addEventListener('click', onButton);
};

const displayWindowErrorServer = function () {
  const newModal = modalErrorServer.cloneNode(true);
  const bodyPage = document.querySelector('body');
  bodyPage.appendChild(newModal);
  const onKeydown = function (evt) {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      document.removeEventListener('keydown', onKeydown);
    }
  };
  const onClick = function () {
    newModal.style.display='none';
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
};

export {displayWindowSuccess, displayWindowError, displayWindowErrorServer};
