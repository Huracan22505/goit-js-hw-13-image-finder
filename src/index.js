import cardTpl from './templates/card.hbs';
import './css/styles.css';
import ImgFinderServise from './js/img-finder-servise';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imgFinderServise = new ImgFinderServise();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();

  imgFinderServise.query = e.currentTarget.elements.query.value;

  loadMoreBtn.show();
  imgFinderServise.resetPage();
  clearGallery();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  imgFinderServise.fetchImg().then(hits => {
    if (hits.length < 12) {
      appendCardMarkup(hits);
      loadMoreBtn.hide();
    } else {
      appendCardMarkup(hits);
      loadMoreBtn.enable();
    }
  });
}

function appendCardMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(hits));
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
