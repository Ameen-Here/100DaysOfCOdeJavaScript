import * as model from "./model.js";

import recipeViews from "./views/recipeViews";

// Pollyfilling after babel [Done bey parcel]
import "core-js/stable";
import "regenerator-runtime/runtime";

//  Rendering recipe according to the hash id in URL
const controllerRecipe = async function () {
  try {
    const id = window.location.hash.slice(1); // Getting the hash id from URL
    if (!id) return; // Gaurd clause

    // Spinner Animation
    recipeViews.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe to the screen
    recipeViews.render(model.state.recipe);
  } catch (err) {
    recipeViews.renderError();
  }
};

// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);

const init = function () {
  recipeViews.addHandlerRender(controllerRecipe);
};

init();
