import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1
  },
  bookmarks: []
}

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = recipe;

    if(state.bookmarks.some(b => b.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
}

export const clearState = () => {
  state.recipe = {};
}

export const loadSearchResults = async (query) => {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.query = query;
    state.search.results = data.data.recipes.map(rec => {
      return rec;
    });

    state.search.page = 1;

  } catch(err) {
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;

  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach((ing) => {
    if (ing.quantity !== null) {
      ing.quantity = ing.quantity * newServings / state.recipe.servings;
    }
  });

  state.recipe.servings = newServings;
}

const loadBookmarks = () => {
  if(localStorage.getItem('bookmarks')) {
    state.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  }
}

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmarks();
}

export const deleteBookmark = (id) => {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  persistBookmarks();
}

const init = () => {
  loadBookmarks();
}

init();

export const uploadRecipe = async (newRecipe) => {
  try {
    console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].includes('ingredient') && entry[1] !== '')
    .map(entry => {
      const ingArr = entry[1].split(',');
  
      if(ingArr.length !== 3) {
        throw new Error('Wrong ingredient format!');
      }
  
      const [quantity, unit, description] = ingArr;
      return {quantity: quantity ? Number(quantity) : null, unit, description};
    })

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    };
  
    console.log(recipe);
  } catch(err) {
    throw err;
  }
};
