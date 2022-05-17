import { async } from "regenerator-runtime";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const datas = await res.json();
    if (!res.ok) throw new Error(`${datas.message} Status (${res.status})`);

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
