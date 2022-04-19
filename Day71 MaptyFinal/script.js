"use strict";

// DOM traversal and other global variable

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

////////////////////////////////////////////////////////////////

// Parent class of workout

class Workout {
  id = (Date.now() + "").split(-10);

  date = new Date();

  constructor(coords, distance, duration) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }

  _setDescription() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

//  Running child class

class Running extends Workout {
  type = "running";

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

//  Cycling child class

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.speed();
    this._setDescription();
  }

  speed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

///////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

class App {
  // Private instance Property

  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomScale = 15;

  // Constructor

  constructor() {
    // Getting Positions
    this._getPosition();
    // Showing form
    this._showForm();

    // Getting data from local storage
    this._getLocalStorage();

    // Activating all the event listeners
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener("click", this._moveMap.bind(this));
  }

  // To get position and also load the map with our current position

  _getPosition() {
    // Using geolocation API
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }

  //  To load map with the position given to the function

  _loadMap(pos) {
    // Destructuring
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, this.#mapZoomScale);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));

    if (!this.#workouts) return;

    this.#workouts.forEach((work) => this._renderWorkoutMarker(work));
  }

  // TO show the form

  _showForm(mapE) {
    // Handling clicks on map

    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    // To empty the values
    inputCadence.value = inputDistance.value = inputDuration.value = "";

    // To hide input fields
    form.style.display = "none";
    form.classList.add("hidden");

    // after 1 second change style back to grid(as the previous default)
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  // toggle the form field according to running/cycling

  _toggleElevationField() {
    // toggle class
    // select the closest parent
    // DOM traversal
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  // Submission of form

  _newWorkout(e) {
    // TO prevent loading when form is submitted
    e.preventDefault();

    // Helper Fn
    //  Validate the data

    const isNumeric = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const isPositive = (...inputs) => inputs.every((inp) => inp > 0);

    //  Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    const { lat, lng } = this.#mapEvent.latlng;

    let workout;

    //  if running type, create running class or other accordingly

    if (type === "running") {
      const cadence = +inputCadence.value;
      //  Gaurd clause using helper fn.
      if (
        !isNumeric(distance, duration, cadence) ||
        !isPositive(distance, duration, cadence)
      ) {
        return alert("Give a positive integer");
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === "cycling") {
      const elevationGain = +inputElevation.value;
      //  Gaurd clause using helper fn.
      if (
        !isNumeric(distance, duration, elevationGain) ||
        !isPositive(distance, duration)
      )
        return alert("Give a positive integer");
      workout = new Cycling([lat, lng], distance, duration, elevationGain);
    }

    //  Add new object to workouut form

    this.#workouts.push(workout);

    //  Render workout marker in map

    this._renderWorkoutMarker(workout);

    //  Render workout input in the list table
    this._renderWorkout(workout);

    // Clear input fields

    this._hideForm();

    // Adding workout to local storage
    this._addLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // Display marker
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
     <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">${workout.duration}</span>
        <span class="workout__value">24</span>
        <span class="workout__unit">min</span>
      </div>  
    `;
    if (workout.type === "running") {
      html += `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
      `;
    } else {
      html += `
          <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li> 
      `;
    }

    form.insertAdjacentHTML("afterend", html);
  }

  _moveMap(e) {
    const workoutEl = e.target.closest(".workout");

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (work) => work.id[0] === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomScale, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  // Adding the workout data to local storage
  _addLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  // Getting data from local storage
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach((work) => this._renderWorkout(work));
  }

  //  Resetting the local storage
  reset() {
    localStorage.removeItem("workouts");
  }
}

//////////////////////////////////////////////////////////////////////////////

// Creating an app object

const app = new App();
