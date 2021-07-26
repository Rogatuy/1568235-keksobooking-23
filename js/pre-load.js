const advertForm = document.querySelector('.ad-form');
const advertFormHeader = advertForm.querySelector('.ad-form-header');
const advertFormElements = advertForm.querySelectorAll('.ad-form__element');

const elementDisabled = (element, status) =>  {
  element.disabled = status;
};

const filtersForm = document.querySelector('.map__filters');
const mapFiltersForm = filtersForm.querySelectorAll('.map__filter');

const advertFormToogleDisabled = (status) => {
  if (status) {
    advertForm.classList.add('ad-form--disabled');
    elementDisabled(advertFormHeader, true);
    for (const advertElement of advertFormElements) {
      elementDisabled(advertElement, true);
    }
  } else {
    advertForm.classList.remove('ad-form--disabled');
    elementDisabled(advertFormHeader, false);
    for (const advertElement of advertFormElements) {
      elementDisabled(advertElement, false);
    }
  }
};

const filterFormToogleDisabled = (status) => {
  if (status) {
    filtersForm.classList.add('map__filters--disabled');
    for (const mapFilter of mapFiltersForm) {
      elementDisabled(mapFilter, true);
    }
  } else {
    filtersForm.classList.remove('map__filters--disabled');
    for (const mapFilter of mapFiltersForm) {
      elementDisabled(mapFilter, false);
    }
  }
};

const preloadDisabled = () => {
  advertFormToogleDisabled(true);
  filterFormToogleDisabled(true);
};

preloadDisabled();

const preloadDisabledRemove = () => {
  advertFormToogleDisabled(false);
  filterFormToogleDisabled(false);
};

export {preloadDisabledRemove, filterFormToogleDisabled};
