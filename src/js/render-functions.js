// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
const galleryItems = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export function createGallery(images) {
  const markup = images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<li class="item">
        <a class="img-photo" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"></a>
        <div class="wrap-info">
            <p class="info">Likes ${likes}</p>
            <p class="info">Views ${views}</p>
            <p class="info">Comments ${comments}</p>
            <p class="info">Downloads ${downloads}</p>
        </div>
      </li>`;
    })
    .join('');
  galleryItems.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  galleryItems.innerHTML = '';
}

export function showLoader() {
    loader.classList.add('loader');
    loader.style.display = "flex";
}

export function hideLoader() {
    loader.classList.add('is-hidden');
}
