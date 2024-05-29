import * as model from '../js/model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import BookMarksView from './views/bookmarksView';
import PaginationView from './views/paginationView';
import AddRecipeView from './views/addRecipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeView = new RecipeView();
const searchView = new SearchView();
const resultsView = new ResultsView();
const paginationView = new PaginationView();
const bookmarksView = new BookMarksView();
const addRecipeView = new AddRecipeView();

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

    // 3.) update results view
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    if (!renderedRecipe) {
      //model.clearState();
    }
  } catch(err) {
    recipeView.renderError(`Uh Oh! That Recipe does not exist!`);
    console.error(err);
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

    resultsView.render(model.getSearchResultsPage());

    // render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError(`Uh Oh! No results found!`)
  }
}

const controlPagination = (page=1) => {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
}

const controlServings = (newServings) => {
  // update state
  model.updateServings(newServings);

  // update view
  //recipeView.render(model.state.recipe);

  // update dom 
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async (newRecipe) => {
  try {

    await model.uploadRecipe(newRecipe);
  } catch(err) {
    console.error(err);
    addRecipeView.renderError(err.message)
  }
}

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
