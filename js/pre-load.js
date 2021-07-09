const advertForm = document.querySelector('.ad-form');
const advertFormHeader = advertForm.querySelector('.ad-form-header');
const advertFormElements = advertForm.querySelectorAll('.ad-form__element');

const advertFormDisabled = function () {
  advertForm.classList.add('ad-form--disabled');
  advertFormHeader.setAttribute('disabled', 'disabled');
  for (let i = 0; i < advertFormElements.length; i++) {
    advertFormElements[i].setAttribute('disabled', 'disabled');
  }
};

const filtersForm = document.querySelector('.map__filters');
const mapfiltersForm = filtersForm.querySelectorAll('.map__filter');

const filterFormDisabled = function () {
  filtersForm.classList.add('map__filters--disabled');
  for (let i = 0; i < mapfiltersForm.length; i++) {
    mapfiltersForm[i].setAttribute('disabled', 'disabled');
  }
};

const preloadDisabled = function () {
  advertFormDisabled();
  filterFormDisabled();
};

preloadDisabled();


const advertFormRemoveDisabled = function () {
  advertForm.classList.remove('ad-form--disabled');
  advertFormHeader.removeAttribute('disabled');
  for (let i = 0; i < advertFormElements.length; i++) {
    advertFormElements[i].removeAttribute('disabled');
  }
};

const filterFormRemoveDisabled = function () {
  filtersForm.classList.remove('map__filters--disabled');
  for (let i = 0; i < mapfiltersForm.length; i++) {
    mapfiltersForm[i].removeAttribute('disabled');
  }
};

const preloadDisabledRemove = function () {
  advertFormRemoveDisabled();
  filterFormRemoveDisabled();
};

export {preloadDisabledRemove};
