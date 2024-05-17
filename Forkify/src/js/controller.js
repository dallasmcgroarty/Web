import * as model from '../js/model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeView = new RecipeView();
const searchView = new SearchView();
const resultsView = new ResultsView();

if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) {
      return;
    }

    recipeView.renderSpinner();

    // 1.) loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2.) render recipe
    const renderedRecipe = recipeView.render(recipe);

    if (!renderedRecipe) {
      model.clearState();
    }
  } catch(err) {
    recipeView.renderError(`Uh Oh! That Recipe does not exist!`);
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if(!query) {
      resultsView._clear();
      return;
    }

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (err) {
    recipeView.renderError(`Uh Oh! No results found!`)
  }
}

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerRender(controlSearchResults);
};

init();
