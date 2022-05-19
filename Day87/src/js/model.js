import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";

import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const datas = await getJSON(`${API_URL}/${id}`);
    let { recipe } = datas.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      serving: recipe.servings,
    }; // Refactoring recipe object to avoid _ and other improper properties.
  } catch (err) {
    console.error(err);
  }
};
