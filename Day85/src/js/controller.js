import icons from "../img/icons.svg"; // Adding icons root folder.

// Pollyfilling after babel [Done bey parcel]
import "core-js/stable";
import "regenerator-runtime/runtime";

// Recipe container to insert recipe details.
const recipeContainer = document.querySelector(".recipe");

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

// API key : 19fd5e13-fafa-452e-ac49-1fbf674ea03e

///////////////////////////////////////

// Spinner animation for Load screen
const spinnerAnimation = function (parentEl) {
  const spinnerHtml = `
   <div class="spinner">
    <svg>
      <use href="${icons}.svg#icon-loader"></use>
    </svg>
  </div> 
`;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", spinnerHtml);
};

//  Rendering recipe according to the hash id in URL
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1); // Getting the hash id from URL
    if (!id) return; // Gaurd clause
    spinnerAnimation(recipeContainer);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const datas = await res.json();
    if (!res.ok) throw new Error(`${datas.message} Status (${res.status})`);

    let { recipe } = datas.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      serving: recipe.servings,
    }; // Refactoring recipe object to avoid _ and other improper properties.

    const recipeHtml = `
        <figure class="recipe__fig">
        <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.serving || "1 minimum"
          }</span>
          <span class="recipe__info-text">Serving</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        
          ${recipe.ingredients
            .map((ing) => {
              return `  <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}g</span>
              ${ing.description}
            </div>
          </li>`;
            })
            .join(" ")} 
            <!-- Joining arrays using .join after loop -->
  
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", recipeHtml); // Adding recipe html to the container
  } catch (err) {
    alert(err);
  }
};

// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
