import * as model from '../js/model';
import RecipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const recipeView = new RecipeView();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function() {
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
};

['hashchange','load'].forEach(ev => window.addEventListener(ev, controlRecipes));
