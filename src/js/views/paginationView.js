import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, other pages
    if (this._curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(`next`);
    }

    // Last page
    if (this._curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(`prev`);
    }
    // Other page
    if (this._curPage < numPages) {
      return this._generateMarkupButton(`prev`).concat(
        this._generateMarkupButton(`next`)
      );
    }
    // Page 1, no other
    return '';
  }

  _generateMarkupButton(index) {
    if (index === `prev`)
      return `
      <button data-goto="${
        this._curPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}svg#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._curPage - 1}</span>
      </button>
  `;

    if (index === 'next')
      return `
  <button data-goto="${
    this._curPage + 1
  }" class="btn--inline pagination__btn--next">
      <span>Page ${this._curPage + 1}</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
  </button>
  `;
  }
}

export default new PaginationView();
