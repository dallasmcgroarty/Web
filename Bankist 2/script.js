'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


/**
 * inserting cookie
 */
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// document.body.append(message);

// // delete cookie
// document.querySelector('.btn--close-cookie').addEventListener('click', function() {
//     message.remove();
// })

// // styles
// message.style.backgroundColor = '#37383d';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// // get custom attribute
// console.log(logo.getAttribute('designer'));

// // set custom attribute
// logo.setAttribute('company', 'bankist');
// console.log(logo.getAttribute('company'));

// // getAttribute on src gets relative file path, same for href
// console.log(logo.getAttribute('src'));

// console.log(logo.dataset.versionNumber);

// // Classlist methods
// logo.classList.add('cc')
// logo.classList.remove('cc')
// logo.classList.toggle('cc')
// logo.classList.contains('cc')

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  // more browser compatible
  // window.scrollTo({
  //   top: section1.getBoundingClientRect().top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // new scrollIntoView easier (not as widely used in older browsers)
  section1.scrollIntoView({behavior: 'smooth'});
});

const h1 = document.querySelector('h1');

const logH1 = function(e) {
  console.log(h1);

  h1.removeEventListener('mouseenter', logH1);
}

h1.addEventListener('mouseenter', function(e) {
  console.log('h1');
});

h1.addEventListener('mouseenter', logH1);
