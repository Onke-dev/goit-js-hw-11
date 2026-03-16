// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';

const refs = {
  formEl: document.querySelector('.form'),
  galleryList: document.querySelector('.gallery'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const searchText = formData.get('search-text');
  if (searchText.trim() === '') {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } else {
    render.clearGallery();
    render.showLoader();
    pixabay
      .getImagesByQuery(searchText)
      .then(res => {
        if (res.hits.length === 0) {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
        } else {
          render.createGallery(res.hits);
        }
      })
      .catch(error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      })
      .finally(() => render.hideLoader());
  }
  refs.formEl.reset();
});
