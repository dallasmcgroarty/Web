import icons from 'url:../../img/icons.svg';

class View {
  _data;

  render(data, render=true) {
    if (!this.verifyData(data)) {
      return false;
    }

    if(!render) {
      return this._generateMarkup();
    }

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  verifyData(data) {
    if(!data || (Array.isArray(data) && data.length == 0)) return this.renderError();

    this._data = data;

    if (!this._data || Object.keys(this._data).length == 0) {
      this._renderNoRecipe();
      return false;
    }

    return true;
  }

  update(data) {
    this._data = data;

    const newDom = document.createRange().createContextualFragment(this._generateMarkup());
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      // update changed text
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }

      // update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });
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

  renderMessage = (msg=this._message) => {
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
