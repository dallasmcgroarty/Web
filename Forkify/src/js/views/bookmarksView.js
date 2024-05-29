import icons from 'url:../../img/icons.svg';
import PreviewView from "./previewView";

class BookMarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet!';

  addHandlerRender = (handler) => {
    window.addEventListener('load', handler);
  }
}

export default BookMarksView;
