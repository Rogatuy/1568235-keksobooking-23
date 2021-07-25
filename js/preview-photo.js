const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const previewPhotoHeight = 44;
const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__input');
const blockPreview = document.querySelector('.ad-form__photo');
const photoPreview = document.createElement('img');
blockPreview.classList.add('ad-form-header__preview');
photoPreview.setAttribute('height', previewPhotoHeight);
blockPreview.append(photoPreview);


const previewsPhoto = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

previewsPhoto(avatarChooser, avatarPreview);
previewsPhoto(photoChooser, photoPreview);

const clearPhoto = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.src = '';
};

export {clearPhoto};
