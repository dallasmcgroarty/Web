import { async } from 'regenerator-runtime';

export const state = {
  recipe: {}
}

export const loadRecipe = async (id) => {
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { recipe } = data.data;
    state.recipe = recipe;

    console.log(state.recipe);
  } catch (err) {
    console.log(err);
  }
}

export const clearState = () => {
  state.recipe = {};
}
