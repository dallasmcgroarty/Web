import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: []
  }
}

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = recipe;

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

  } catch(err) {
    throw err;
  }
};
