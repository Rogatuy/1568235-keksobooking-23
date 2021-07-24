import './util.js';
import './form.js';
import './create-map.js';
import './pre-load.js';
import {setUserFormSubmit} from './form.js';
import {getData} from './api.js';
import './preview-photo.js';
import {displayWindowErrorServer} from './modal-success-error.js';
import './filter.js';
import {mainRenderPoints} from './filter.js';

getData (
  (adverts) => mainRenderPoints(adverts),
  () => displayWindowErrorServer(),
);

setUserFormSubmit();
