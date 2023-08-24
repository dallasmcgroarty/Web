'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

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

// button scrolling
btnScrollTo.addEventListener('click', function(e){
  // more browser compatible
  // window.scrollTo({
  //   top: section1.getBoundingClientRect().top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // new scrollIntoView easier (not as widely used in older browsers)
  section1.scrollIntoView({behavior: 'smooth'});
});


// page navigation

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     document.querySelector(el.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
//   });
// });

// one big event handler on parent, instead of all children
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
  }
})

// tab component
document.querySelector('.operations').addEventListener('click', function(e) {
  if (e.target.classList.contains('operations__tab')) {
    const id = e.target.dataset.tab;
    this.querySelectorAll('.operations__content').forEach((el) => el.classList.remove('operations__content--active'));
    this.querySelector(`.operations__content--${id}`).classList.add('operations__content--active');
  }
});

// menu fade animation
nav.addEventListener('mouseover', function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    })

    link.style.opacity = 1;
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function(e) {
  this.querySelectorAll('.nav__link').forEach(el => el.style.opacity = 1);
  this.querySelector('.nav__logo').style.opacity = 1;
});

// sticky nav
// const initialCord = section1.getBoundingClientRect();
// console.log(initialCord);

// window.addEventListener('scroll', function() {
//   if (this.scrollY > initialCord.top) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// sticky nav - intersection observer
// const obsCallback = function(entries, observer) {
//   //entries.forEach(entry => {console.log(entry)});
// };

// const obsOptions = {
//   root: null,
//   threshhold: [0, 0.2]
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

// sticky nav
const header = document.querySelector('.header');
const navHeight = document.querySelector('.nav').offsetHeight;

const stickyNav = function(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(
  stickyNav, {
    root: null,
    threshhold: 0,
    rootMargin: `-${navHeight}px`
  }
)

headerObserver.observe(header);

// reveal sections on intersection
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    headerObserver.unobserve(entry.target);
  } else {
    return;
  }
}

const sectionObserver = new IntersectionObserver(
  revealSection, {
    root: null,
    threshhold: 0.15,
  }
);

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy load images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(e) {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(
  loadImg, {
    root: null,
    threshhold: 0,
    rootMargin: '200px'
  }
)

imgTargets.forEach(img => {imageObserver.observe(img)});
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

// const h1 = document.querySelector('h1');

// const logH1 = function(e) {
//   console.log(h1);

//   h1.removeEventListener('mouseenter', logH1);
// }

// h1.addEventListener('mouseenter', function(e) {
//   console.log('h1');
// });

// h1.addEventListener('mouseenter', logH1);

/**
 * Event delegation
 */

// page navigation

/**
 * DOM traversal
 */

// const h1 = document.querySelector('h1');

// // go down - selecting children
// console.log(h1.querySelectorAll('.highlight'));

// // get all elements/nodes/text/comments within element
// console.log(h1.childNodes);

// // gets all direct children elements within element
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orange';

// // go upwards - selecting parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);


// // closest parent
// h1.closest('.header').style.background = 'var(--gradient-primary)';

// // going sideways - siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function(el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

