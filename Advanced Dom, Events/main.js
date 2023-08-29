/**
 * Advanced Dom and Events
 */

/**
 * selecting creating deleting elements
 */

console.log(document.querySelector('.btn-poll'));
console.log(document.getElementsByClassName('btn-poll'));
console.log(document.querySelectorAll('.btn-poll'));

document.getElementById('heading');

// creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// add after begin
document.body.prepend(message);

// add before end
// cloneNode to copy element, passing true copies children
document.body.append(message.cloneNode(true));

// adds before element
document.body.before(message.cloneNode(true));

// adds after element
document.body.after(message.cloneNode(true));

// deleting elements
const button = document.querySelector('.btn-poll');
button.addEventListener('click', function() {
    button.remove();
})

/**
 * Event propagation
 */
const randomInt = (max, min) => Math.floor(Math.random() * (max - min) + 1) + min;

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor(0, 255));

document.querySelector('.btn--close-cookie').addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor(0, 255);

    // stop event from bubbling up
    e.stopPropagation();
});

document.querySelector('.cookie-message').addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor(0, 255);
});

/**
 * dom
 */
document.addEventListener('DOMContentLoaded', function(e) {
    console.log('HTML parsed dom built', e)
});

window.addEventListener('load', function(e) {
    console.log('Page fully loaded', e);
});