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