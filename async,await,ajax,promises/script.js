// new api -> https://countries-api-836d.onrender.com/countries/

'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function getCountryAndNeighbor(country) {
    // old school request method
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();
    request.addEventListener('load',function() {
        const [data] = JSON.parse(this.responseText)

        // render country
        renderCountry(data);

        // get neighbor country
        const [neighbor] = data.borders;

        if (!neighbor) {
            return;
        }

        const request = new XMLHttpRequest();
        request.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
        request.send();
        request.addEventListener('load', function() {
            const data = JSON.parse(this.responseText)

            // render country
            renderCountry(data, 'neighbour');
        })
    });
}

function renderCountry(data, className = '') {
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('afterbegin', html);
}

function loadCountries(countries) {
    for (let country of countries) {
        getCountryAndNeighbor(country);
    }
}

loadCountries(['portugal', 'usa']);

/**
 * fetch API
 * 
 * - promise - a container for a future value (container for an asynchronously delivered value)
 * -
 */

function getJSON (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(`${errorMsg} (${res.status})`)
        }

        return res.json();
    });
}

function fetchCountryData(country) {
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function(res) {
        if (!res.ok) {
            throw new Error(`Country not found (${res.status})`)
        }
        return res.json(); // get json result (which returns a promise)
    })
    .then(function(data) { // handle promise
        //console.log(...data); // now return data
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];
    
        if (!neighbour) {
            return;
        }
    
        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(res => res.json())
    .then(data => renderCountry(data, 'neighbour'))
    // catch any errors from previous requests
    .catch(err => console.log(err.message))
    // finally after promises are handled and last catch or promise comes in
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
}
fetchCountryData('germany')

btn.addEventListener('click', function(e) {
    fetchCountryData('portugal');
});


///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. 
    Use this API to do reverse geocoding: https://geocode.xyz/api.
    The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. 
    Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

function whereAmI(lat,lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
        if (!res.ok) {
            throw new Error(`Error requestion data ${res.status}`)
        }
        return res.json();
    })
    .then(data => console.log(`You are in ${data.country}`))
    .catch(err => console.error(err))

}

whereAmI(52.508,13.381);

// testing callback queue
console.log('test start'); // runs first
setTimeout(() => console.log('0 sec timer'), 0); // runs fifth
Promise.resolve('Resolves promise 1').then(res => console.log(res)); // runs third

Promise.resolve('Resolved promise 2').then(res => { // runs fourth
    for (let i = 0; i < 1000000000; i ++) {

    }
    console.log(res);
});
console.log('test end'); // runds second

/**
 * Promises
 *  - promisifying - converting callback based async behavior to promise based
 */
console.log('-- promises --')
const lottery = new Promise(function(resolve, reject) {

    console.log('Lottery draw is starting...');

    setTimeout(() => {
        if (Math.random() >= 0.5) {
            resolve('You WIN (:'); // passed on success/resolved
        } else {
            reject(new Error('You LOSE ):')); // passed on error/rejected
        }
    },2000)

});

// consume promise
lottery
    .then(res => console.log(res))
    .catch(err => console.error(err));


// promisifying settimeout function
const wait = function(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

wait(2).then(() => {
    console.log('I waited 2 seconds');
    return wait(1);
}).then(() => console.log('I waited 1 second'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('abc reject')).catch(x => console.error(x));

/**
 * Promisifying geolocation API
 */
// navigator.geolocation.getCurrentPosition(
//     position => console.log(position), 
//     err => console.error(err)
// );
// console.log('Getting position');

const getPosition = function() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

getPosition().then(res => console.log(res));

const whereAmINow = function() {
    getPosition().then(pos => {
        const {latitude, longitude} = pos.coords;
        
        return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
    })
    .then(res => {
        if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
        return res.json();
    })
    .then(data => {
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);

        return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
        if (!res.ok) throw new Error(`Country not found (${res.status})`);

        return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}!!`));
};

btn.addEventListener('click', whereAmINow);


///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. 
When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. 
In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. 
    You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const imgContainer = document.querySelector('.images');

function createImage(imgPath) {
    return new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function() {
            imgContainer.append(img);
            resolve(img);
        })

        img.addEventListener('error', function() {
            reject(new Error('Img not found'));
        })
    });
}

let curImg;

createImage("Mapty-architecture-final.png")
    .then(res => {
        curImg = res;
        return wait(2);
    })
    .then(() => {
        curImg.style.display = 'none';
        return createImage('logo.png');
    })
    .then((res) => {
        curImg = res;
        return wait(2);
    })
    .then(() => {
        curImg.style.display = 'none';
    })
    .catch(err => console.error(err))