const adressImport = 'https://23.javascript.pages.academy/keksobooking';
const adressExport = 'https://23.javascript.pages.academy/keksobooking/data';

const getData = function (onSuccess, onFail)  {
  fetch(adressExport)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail();
      }
    })
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      onFail();
    });
};


const sendData = function (onSuccess, onFail, body) {
  fetch(
    adressImport,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


export {getData, sendData};
