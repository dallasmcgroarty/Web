import View from "./View";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick = (handler) => {
    this._parentElement.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = e.target.closest('button');
      handler(Number(btn.dataset.page));
    });
  }

  _generateMarkup = () => {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // page 1 and more pages
    if (this._data.page === 1 && numPages > 1) {
      return `
        <button data-page="${2}" class="btn--inline pagination__btn--next">
          <span class="page">Page 2</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // page 1 and no other pages
    if (this._data.page === 1 && numPages === 1) {
      return;
    }

    // last page
    if (this._data.page === numPages) {
      return `
        <button data-page="${numPages - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span class="page">Page ${numPages - 1}</span>
        </button>
      `;
    }

    // other page
    return `
      <button data-page="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span class="page">Page ${this._data.page - 1}</span>
      </button>
      <button data-page="${this._data.page + 1}" class="btn--inline pagination__btn--next">
        <span class="page">Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default PaginationView;
