/* =========================================
   gallery.js — Lightbox de la galería
========================================= */

export function initLightbox() {
  const lightbox = document.querySelector('.lightbox')
  const lightboxImage = document.querySelector('.lightbox-image')
  const closeButton = document.querySelector('.lightbox-close')
  const prevButton = document.querySelector('.lightbox-prev')
  const nextButton = document.querySelector('.lightbox-next')
  const items = [...document.querySelectorAll('.gallery-item')]

  if (items.length === 0) return // todavía no hay galería en esta página

  let currentIndex = 0
  let lastFocused = null

  function showImage(index) {
    // Al pasar de la última foto vuelve a la primera, y al revés
    currentIndex = (index + items.length) % items.length
    const img = items[currentIndex].querySelector('img')
    lightboxImage.src = img.src
    lightboxImage.alt = img.alt
  }

  function openLightbox(index) {
    lastFocused = document.activeElement
    showImage(index)
    lightbox.classList.add('is-open')
    lightbox.setAttribute('aria-hidden', 'false')
    document.body.classList.add('no-scroll')
    closeButton.focus()
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open')
    lightbox.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('no-scroll')
    if (lastFocused) lastFocused.focus()
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index))
  })

  closeButton.addEventListener('click', closeLightbox)
  prevButton.addEventListener('click', () => showImage(currentIndex - 1))
  nextButton.addEventListener('click', () => showImage(currentIndex + 1))

  // Clic en el fondo negro (fuera de la foto) también cierra
  lightbox.addEventListener('click', (event) => {
    const clickedBackground =
      event.target === lightbox ||
      event.target.classList.contains('lightbox-image-container')
    if (clickedBackground) closeLightbox()
  })

  // Teclado: Escape, flecha izquierda y flecha derecha
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return
    if (event.key === 'Escape') closeLightbox()
    if (event.key === 'ArrowLeft') showImage(currentIndex - 1)
    if (event.key === 'ArrowRight') showImage(currentIndex + 1)
  })
}