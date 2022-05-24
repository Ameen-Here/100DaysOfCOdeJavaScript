import * as model from "./model.js";

import recipeViews from "./views/recipeViews";
import searchViews from "./views/searchViews";
import resultViews from "./views/resultViews";
import paginationViews from "./views/paginationViews.js";

// Pollyfilling after babel [Done bey parcel]
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";

//  To prevent reloading by parcel
// if (module.hot) {
//   module.hot.accept();
// }

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

const controlSearchResult = async function () {
  try {
    // 1) Get search query
    const query = searchViews.getQuery();
    if (!query) return;
    resultViews.renderSpinner();

    // 2)  Load search result
    await model.loadSearchResult(query);

    // 3) Render Result
    resultViews.render(model.getSearchResultsPage());

    // Render Pagination
    paginationViews.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = async function (btnElement) {
  // Check and implement next and previous page
  if (btnElement.classList.contains("pagination__btn--next"))
    model.state.search.page++;
  else model.state.search.page--;

  // Render search
  resultViews.render(model.getSearchResultsPage());

  // Render Pagination
  paginationViews.render(model.state.search);
};

const init = function () {
  recipeViews.addHandlerRender(controllerRecipe);
  searchViews.addHandlerSearch(controlSearchResult);
  paginationViews.addHandlePagination(controlPagination);
};

init();
