//Vídeos (archivos locales)

export function initVideo() {
  const grid = document.querySelector('#video-grid')
  if (!grid) return

  let activeVideo = null // para pausar uno si se abre otro

  grid.querySelectorAll('.video-frame').forEach((card) => {
    const src = card.dataset.src
    const playButton = card.querySelector('.video-play')
    const title = card.querySelector('.video-card-title')
    let video = null

    function createVideo() {
      video = document.createElement('video')
      video.src = src
      video.controls = false
      video.playsInline = true
      video.preload = 'metadata'

      video.addEventListener('play', () => {
        if (activeVideo && activeVideo !== video) activeVideo.pause()
        activeVideo = video
        card.classList.add('is-playing')
        playButton.setAttribute('aria-label', `Pausar ${title.textContent}`)
      })

      const showPlay = () => {
        card.classList.remove('is-playing')
        playButton.setAttribute('aria-label', `Reproducir ${title.textContent}`)
      }
      video.addEventListener('pause', showPlay)
      video.addEventListener('ended', showPlay)

      card.classList.add('has-video')
      card.append(video)
    }

    card.addEventListener('click', () => {
      if (!video) createVideo()
      if (video.paused) video.play()
      else video.pause()
    })
  })
}