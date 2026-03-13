const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav')
const overlay = document.querySelector('.overlay')


menuBtn.addEventListener('click', function() {
  nav.classList.toggle('open')
  overlay.classList.toggle('active')
})

overlay.addEventListener('click', function() {
  nav.classList.remove('open')
  overlay.classList.remove('active')
})

