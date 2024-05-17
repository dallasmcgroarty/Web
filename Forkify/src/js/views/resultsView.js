import View from "./View";
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Uh Oh! That Recipe does not exist!';
  
  addHandlerRender = (handler) => {
    ['load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup = () => {
    return this._data.map(el => {
      return `
      <li class="preview">
        <a class="preview__link" href="#${el.id}">
          <figure class="preview__fig">
            <img src="${el.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${el.title}</h4>
            <p class="preview__publisher">${el.publisher}</p>
          </div>
        </a>
      </li>
    `;
    }).join('');
  }
}

export default ResultsView;
