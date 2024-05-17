import icons from 'url:../../img/icons.svg';

class View {
  _data;

  render(data) {
    if(!data || (Array.isArray(data) && data.length == 0)) return this.renderError();

    this._data = data;

    if (!this._data || Object.keys(this._data).length == 0) {
      this._renderNoRecipe();
      return false;
    }

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _renderNoRecipe() {
    this._clear();
    this._parentElement.innerHTML = '<h1>Recipe does not exist.</h1>';
  }

  renderSpinner = () => {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage = (msg) => {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${msg}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError = (msg = this._errorMessage) => {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${msg}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default View;
