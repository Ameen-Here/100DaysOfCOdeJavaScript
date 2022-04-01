'use strict';

// DOM traversal and other global variable
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

////////////////////////////////////////////////////////////////

// Parent class of workout

class Workout {
  id = (Date.now() + '').split(-10);

  date = new Date();

  constructor(coords, distance, duration) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
}

//  Running child class

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

//  Cycling child class

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.speed();
  }

  speed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running(123, 45, 23, 23);
const cycle2 = new Cycling(0, 0, 12, 23);

console.log(run1, cycle2);

///////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

class App {
  // Private instance Property

  #map;
  #mapEvent;
  #workouts = [];

  // Constructor

  constructor() {
    this._getPosition();

    this._showForm();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
  }

  // To get position and also load the map with our current position

  _getPosition() {
    // Using geolocation API
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  //  To load map with the position given to the function

  _loadMap(pos) {
    // Destructuring
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    console.log(pos, latitude, longitude);
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  // TO show the form

  _showForm(mapE) {
    // Handling clicks on map

    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  // toggle the form field according to running/cycling

  _toggleElevationField() {
    // toggle class
    // select the closest parent
    // DOM traversal
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  // Submission of form

  _newWorkout(e) {
    // TO prevent loading when form is submitted
    e.preventDefault();

    // Helper Fn
    //  Validate the data

    const isNumeric = (...inputs) => inputs.every(inp => Number.isFinite(inp));

    const isPositive = (...inputs) => inputs.every(inp => inp > 0);

    //  Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    const { lat, lng } = this.#mapEvent.latlng;

    let workout;

    //  if running type, create running class or other accordingly

    if (type === 'running') {
      const cadence = +inputCadence.value;
      //  Gaurd clause using helper fn.
      if (
        !isNumeric(distance, duration, cadence) ||
        !isPositive(distance, duration, cadence)
      ) {
        return alert('Give a positive integer');
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevationGain = +inputElevation.value;
      //  Gaurd clause using helper fn.
      if (
        !isNumeric(distance, duration, elevationGain) ||
        !isPositive(distance, duration)
      )
        return alert('Give a positive integer');
      workout = new Cycling([lat, lng], distance, duration, elevationGain);
    }

    //  Add new object to workouut form

    this.#workouts.push(workout);

    //  Render workout marker in map

    this.renderMap(workout);

    //  Render workout input in the list table

    // Clear input fields

    inputCadence.value = inputDistance.value = inputDuration.value = '';
  }

  renderMap(workout) {
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
      .setPopupContent(`${workout.distance}`)
      .openPopup();
  }
}

// Creating an app object

const app = new App();
