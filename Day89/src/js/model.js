import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";

import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    result: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const datas = await getJSON(`${API_URL}${id}`);
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
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    if (data.status !== "success") return;
    state.search.result = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      };
    });
  } catch (err) {
    throw err;
  }
};
