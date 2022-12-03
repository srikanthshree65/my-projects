'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const navheight = nav.getBoundingClientRect().height;
const openModal = function (e) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  e.Preventdefult();
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
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `we are cookied for improved functionality and analytics.<button class="btn btn--close-cookie">got it!</button>`;
const header = document.querySelector('.header');
header.append(message);
document.querySelector(`.btn--close--cookie`);
addEventListener('click', function () {
  message.remove();
});
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
const logo = document.querySelector('.nav__logo');
const btnscrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnscrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault;
//     const id = this.getAttribute('herf');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
const tabs = document.querySelectorAll('.opration__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
const initialcord = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (this.window.scrolly > initialcord.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
const allsections = document.querySelectorAll('.section');

const revaelSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revaelSection, {
  root: null,
  threshold: 0.15,
});
allsections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
(function () {
  return console.log(`age = 3`);
})();
