/* =========================================
   navigation.js — Menú fullscreen
========================================= */

export function initMenu() {
  const menu = document.querySelector('#main-menu')
  const toggle = document.querySelector('.menu-toggle')
  const closeButton = document.querySelector('.menu-close')

  function openMenu() {
    menu.classList.add('is-open')
    menu.removeAttribute('inert')
    menu.setAttribute('aria-hidden', 'false')
    toggle.setAttribute('aria-expanded', 'true')
    document.body.classList.add('no-scroll')
    closeButton.focus()
  }

  function closeMenu() {
    menu.classList.remove('is-open')
    menu.setAttribute('inert', '')
    menu.setAttribute('aria-hidden', 'true')
    toggle.setAttribute('aria-expanded', 'false')
    document.body.classList.remove('no-scroll')
  }

  toggle.addEventListener('click', openMenu)
  closeButton.addEventListener('click', () => {
    closeMenu()
    toggle.focus()
  })

  // Al pulsar un enlace del menú, se cierra
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu)
  })

  // Tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu()
      toggle.focus()
    }
  })
}