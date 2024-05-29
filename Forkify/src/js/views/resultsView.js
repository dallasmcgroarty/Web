import icons from 'url:../../img/icons.svg';
import PreviewView from "./previewView";

class ResultsView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Uh Oh! That Recipe does not exist!';
}

export default ResultsView;
