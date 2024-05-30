import View from "./View";
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';
  
  addHandlerRender = (handler) => {
    ['load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup = () => {
    const id = window.location.hash.slice(1);

    return this._data.map(el => {
      return `
      <li class="preview">
        <a class="preview__link ${el.id == id ? 'preview__link--active' : ''}" href="#${el.id}">
          <figure class="preview__fig">
            <img src="${el.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${el.title}</h4>
            <p class="preview__publisher">${el.publisher}</p>
            <div class="preview__user-generated ${el.key ? '' : 'hidden'}">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
    }).join('');
  }
}

export default PreviewView;
