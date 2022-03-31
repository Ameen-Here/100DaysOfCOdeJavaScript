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

// CLASS OF APP(MAIN CLASS)

class App {
  // Private instance Property

  #map;
  #mapEvent;

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
    e.preventDefault();

    // Clear input fields
    inputCadence.value = inputDistance.value = inputDuration.value = '';

    // Form submission event
    // Display marker

    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

// Creating an app object

const app = new App();
