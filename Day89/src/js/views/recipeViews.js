import icons from "../../img/icons.svg"; // Adding icons root folder.
import View from "./views";

import { Fraction } from "fractional"; // For conerting decimal number to fraction

class RecipeView extends View {
  // Recipe container to insert recipe details.
  _parentEl = document.querySelector(".recipe");
  _errorMessage =
    "We did not find that recipe. Please try again with another item.";
  _message = "Start by searching for a recipe or an ingredient. Have fun!";

  // For handling to events Publisher subscriber model
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
        <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
        <span>${this._data.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}.svg_icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}.svg_icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.serving || "1 minimum"
        }</span>
        <span class="recipe__info-text">Serving</span>

        <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
            <svg>
                <use href="${icons}.svg_icon-minus-circle"></use>
            </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
            <svg>
                <use href="${icons}.svg_icon-plus-circle"></use>
            </svg>
            </button>
        </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
              <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
        <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        
        ${this._data.ingredients
          .map((ing) => this._generateMarkupIngredients(ing))
          .join(" ")} 
            <!-- Joining arrays using .join after loop -->

        </ul>
    </div>

    <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
        </p>
        <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
        >
        <span>Directions</span>
        <svg class="search__icon">
            <use href="${icons}.svg_icon-arrow-right"></use>
        </svg>
        </a>
    </div>
    `;
  }

  //  Private function for generating markup for collection of items.
  _generateMarkupIngredients(ing) {
    return ` 
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
        <use href="${icons}.svg_icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ""
        }</div>
        <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}g</span>
            ${ing.description}
        </div>
        </li>`;
  }
}

export default new RecipeView();

// import icons from "../../img/icons.svg"; // Adding icons root folder.

// import { Fraction } from "fractional"; // For conerting decimal number to fraction

// class RecipeView {
//   // Recipe container to insert recipe details.
//   #parentEl = document.querySelector(".recipe");
//   #data; // TO store data of state
//   #errorMessage =
//     "We did not find that recipe. Please try again with another item.";
//   #message = "Start by searching for a recipe or an ingredient. Have fun!";

//   render(data) {
//     this.#data = data;
//     const markup = this._generateMarkup();
//     this.#clear();

//     this.#parentEl.insertAdjacentHTML("afterbegin", markup); // Adding recipe html to the container
//   }

//   renderError(message = this.#errorMessage) {
//     const errorMarkup = `
//     <div class="error">
//             <div>
//               <svg>
//                 <use href="${icons}.svg#icon-alert-triangle"></use>
//               </svg>
//             </div>
//             <p>${message}</p>
//           </div>`;
//     this.#clear();
//     this.#parentEl.insertAdjacentHTML("afterbegin", errorMarkup);
//   }

//   renderMessage(message = this.#message) {
//     const errorMarkup = `
//     <div class="message">
//             <div>
//               <svg>
//                 <use href="${icons}.svg#icon-smile"></use>
//               </svg>
//             </div>
//             <p>${message}</p>
//           </div>`;
//     this.#clear();
//     this.#parentEl.insertAdjacentHTML("afterbegin", errorMarkup);
//   }

//   // For handling to events Publisher subscriber model
//   addHandlerRender(handler) {
//     ["hashchange", "load"].forEach((ev) =>
//       window.addEventListener(ev, handler)
//     );
//   }

//   #clear() {
//     this.#parentEl.innerHTML = "";
//   }

//   _generateMarkup() {
//     return `
//         <figure class="recipe__fig">
//         <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
//         <h1 class="recipe__title">
//         <span>${this.#data.title}</span>
//         </h1>
//     </figure>
//     <div class="recipe__details">
//         <div class="recipe__info">
//         <svg class="recipe__info-icon">
//             <use href="${icons}.svg#icon-clock"></use>
//         </svg>
//         <span class="recipe__info-data recipe__info-data--minutes">${
//           this.#data.cookingTime
//         }</span>
//         <span class="recipe__info-text">minutes</span>
//         </div>
//         <div class="recipe__info">
//         <svg class="recipe__info-icon">
//             <use href="${icons}.svg#icon-users"></use>
//         </svg>
//         <span class="recipe__info-data recipe__info-data--people">${
//           this.#data.serving || "1 minimum"
//         }</span>
//         <span class="recipe__info-text">Serving</span>
//         <div class="recipe__info-buttons">
//             <button class="btn--tiny btn--increase-servings">
//             <svg>
//                 <use href="${icons}.svg#icon-minus-circle"></use>
//             </svg>
//             </button>
//             <button class="btn--tiny btn--increase-servings">
//             <svg>
//                 <use href="${icons}.svg#icon-plus-circle"></use>
//             </svg>
//             </button>
//         </div>
//         </div>
//         <div class="recipe__user-generated">
//         <svg>
//             <use href="${icons}.svg#icon-user"></use>
//         </svg>
//         </div>
//         <button class="btn--round">
//         <svg class="">
//             <use href="${icons}.svg#icon-bookmark-fill"></use>
//         </svg>
//         </button>
//     </div>
//     <div class="recipe__ingredients">
//         <h2 class="heading--2">Recipe ingredients</h2>
//         <ul class="recipe__ingredient-list">

//         ${this.#data.ingredients
//           .map((ing) => this.#generateMarkupIngredients(ing))
//           .join(" ")}
//             <!-- Joining arrays using .join after loop -->
//         </ul>
//     </div>
//     <div class="recipe__directions">
//         <h2 class="heading--2">How to cook it</h2>
//         <p class="recipe__directions-text">
//         This recipe was carefully designed and tested by
//         <span class="recipe__publisher">${
//           this.#data.publisher
//         }</span>. Please check out
//         directions at their website.
//         </p>
//         <a
//         class="btn--small recipe__btn"
//         href="${this.#data.sourceUrl}"
//         target="_blank"
//         >
//         <span>Directions</span>
//         <svg class="search__icon">
//             <use href="${icons}.svg#icon-arrow-right"></use>
//         </svg>
//         </a>
//     </div>
//     `;
//   }

//   //  Private function for generating markup for collection of items.
//   #generateMarkupIngredients(ing) {
//     return `
//         <li class="recipe__ingredient">
//         <svg class="recipe__icon">
//         <use href="${icons}.svg#icon-check"></use>
//         </svg>
//         <div class="recipe__quantity">${
//           ing.quantity ? new Fraction(ing.quantity).toString() : ""
//         }</div>
//         <div class="recipe__description">
//             <span class="recipe__unit">${ing.unit}g</span>
//             ${ing.description}
//         </div>
//         </li>`;
//   }
// }

// export default new RecipeView();
