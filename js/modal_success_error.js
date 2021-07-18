import {isEscEvent} from './util.js';
import {resetMarker} from './create-map.js';

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
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
      resetMarker();
      document.querySelector('.ad-form').reset();
    }
    newModal.addEventListener('click', () => { //не работает.хрен знает почему.
      newModal.style.display='none';
    });
  });
};

const displayWindowError = function () {
  const newModal = modalError.cloneNode(true);
  const bodyPage = document.querySelector('body');
  bodyPage.appendChild(newModal);

  const buttonClose = newModal.querySelector('.error__button');
  buttonClose.addEventListener('click', () => {
    newModal.style.display='none';
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
    }
  });
};

const displayWindowErrorServer = function () {
  const newModal = modalErrorServer.cloneNode(true);
  const bodyPage = document.querySelector('body');
  bodyPage.appendChild(newModal);

  document.addEventListener('click', () => {
    newModal.style.display='none';
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      newModal.style.display='none';
    }
  });
};

export {displayWindowSuccess, displayWindowError, displayWindowErrorServer};
