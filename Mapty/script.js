
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const clearBtn = document.querySelector('.btn-clear');

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
    markerId;

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
    type = 'running';

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

    displayString() {
        return `🏃 Running on ${new Date().toLocaleString('default', {month: 'long', day: 'numeric'})}`
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
    type = 'cycling';

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    // mi/h
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }

    displayString() {
        return `🚴 Cycling on ${new Date().toLocaleString('default', {month: 'long', day: 'numeric'})}`
    }
}

const run1 = new Running([39,-12], 5.2, 30, 180);
const cycle1 = new Cycling([39,-12], 20, 60, 500);


class App {
    #map;
    #markers;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts;

    constructor() {
        this.#workouts = [];

        // get user position
        this._getPosition();

        // get data from localstorage
        this._loadWorkouts();

        // event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField)
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
        containerWorkouts.addEventListener('click', this._deleteWorkout.bind(this));
        clearBtn.addEventListener('click', this._clearWorkouts.bind(this));

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

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#markers = L.layerGroup().addTo(this.#map);

        this.#map.on('click', this._showForm.bind(this));

        this.#workouts.forEach(workout => this._renderWorkoutMarker(workout));
    }

    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {
        this._clearForm();
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        e.preventDefault();
        
        let workout;
        const type = inputType.value;
        const distance = +inputDistance.value; //+ converts string to number
        const duration = +inputDuration.value;
        const coords = [this.#mapEvent.latlng.lat, this.#mapEvent.latlng.lng];

        if (type === 'running') {
            const cadence = +inputCadence.value;

            if (!this._checkValidInput(distance,duration,cadence)) {
                return;
            }

            workout = new Running(coords,distance,duration,cadence);
        } 
        
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            if (!this._checkValidInput(distance,duration,elevation)) {
                return;
            }

            workout = new Cycling(coords,distance,duration,elevation);
            
        }

        this.#workouts.push(workout);

        this._renderWorkoutMarker(workout);

        this._renderWorkout(workout);

        this._setLocalStorage();

        this._hideForm();
        // clear inputs
        this._clearForm();
    }

    _checkValidInput(...values) {
        for (let val of values) {
            if (!isFinite(val) || val < 0) {
                alert('Invalid input. Values must be positive numbers!');
                this._clearForm();
                return false;
            }
        }

        return true;
    }

    _clearForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    }

    _renderWorkoutMarker(workout) {
        // display marker
        L.marker(workout.coords, {w_id: workout.id})
        .addTo(this.#markers)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup popup-id-${workout.id}`,
            content: workout.displayString()
        }))
        .openPopup();
    }

    _renderWorkout(workout) {
        let html = `<li class="workout workout--${workout.type}" data-id="${workout.id}" data-marker-id="${workout.markerId}">
            <span class="delete-workout">🗑️</span>
            <h2 class="workout__title">${workout.displayString().slice(2)}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === 'running' ? `🏃`: `🚴`}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">mi</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.type === 'running' ? workout.pace.toFixed(1) : workout.speed.toFixed(1) }</span>
                <span class="workout__unit">${workout.type === 'running' ? 'min/mi' : 'mi/hr'}</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === 'running' ? `🦶🏼` : `⛰`}</span>
                <span class="workout__value">${workout.type === 'running' ? workout.cadence : workout.elevationGain}</span>
                <span class="workout__unit">${workout.type === 'running' ? `spm` : `ft`}</span>
            </div>
        </li>`;

        form.insertAdjacentHTML('afterend', html);
    }

    _loadWorkouts() {
        if (localStorage.getItem('workouts')) {
            const workouts = JSON.parse(localStorage.getItem('workouts'));

            workouts.forEach(work => {
                let workObject;

                if (work.type === 'running') {
                    workObject = new Running(work.coords,work.distance,work.duration,work.cadence);
                } else {
                    workObject = new Cycling(work.coords,work.distance,work.duration,work.elevationGain);
                }
                
                this.#workouts.push(workObject);

                this._renderWorkout(workObject);
            })
        }
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');

        if (!workoutEl) return;

        const workout = this.#workouts.find(item => item.id === workoutEl.dataset.id);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        });
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _clearWorkouts() {
        localStorage.removeItem('workouts');
        document.querySelectorAll('.workout').forEach(el => el.remove());
        this.#markers.clearLayers();
    }

    _deleteWorkout(e) {
        if (e.target.classList.contains('delete-workout')) {
            const workoutEl = e.target.closest('.workout');

            this.#markers.eachLayer((layer) => {
                if (workoutEl.dataset.id === layer.options.w_id) {
                    this.#markers.removeLayer(layer);
                }
            })

            this.#workouts = this.#workouts.filter(workout => workout.id !== workoutEl.dataset.id);
            localStorage.setItem('workouts', JSON.stringify(this.#workouts));
            workoutEl.remove();
        }
    }
}

const app = new App();
