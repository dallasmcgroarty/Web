
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/**
 * Workout
 *  - base class for workouts
 * @param coords - array of [latitude,longitude]
 * @param distance - distance moved in miles
 * @param duration - duration of workout in minutes
 */
class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}

/**
 * Running
 * - running child class
 * @extends Workout
 * @param coords - array of [latitude,longitude]
 * @param distance - distance moved in miles
 * @param duration - duration of workout in minutes
 * @param cadence - cadence 
 */
class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence;
        this.calcPace();
    }

    // min/mi
    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

/**
 * Cycling
 *  - cycling child class
 * @extends Workout
 * @param coords - array of [latitude,longitude]
 * @param distance - distance moved in miles
 * @param duration - duration of workout in minutes
 * @param elevationGain - elevation gained during workout
 */
class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
    }

    // mi/h
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.pace;
    }
}

const run1 = new Running([39,-12], 5.2, 30, 180);
const cycle1 = new Cycling([39,-12], 20, 60, 500);


class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));

        inputType.addEventListener('change', this._toggleElevationField)
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
                alert('Could get not get your position')
            })
        }
    }

    _loadMap(pos) {
        console.log(pos);
        const {latitude} = pos.coords;
        const {longitude} = pos.coords;

        const coords = [latitude, longitude]

        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        e.preventDefault();
        // display marker
        const coords = [this.#mapEvent.latlng.lat, this.#mapEvent.latlng.lng];
        L.marker(coords)
        .addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
            content: 'test'
        }))
        .openPopup();

        // clear inputs
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    }

    init() {
        
    }
}

const app = new App();
