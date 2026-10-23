//Reproductor de música

const tracks = [
  { title: 'Verdad verdadera', src: '' },
  { title: 'Lo que no te mata te hace más fuerte', src: '' },
  { title: 'Convénceme', src: '' },
  { title: 'El precio de la libertad', src: '' },
]

export function initPlayer() {
  const label = document.querySelector('.player-label')
  const title = document.querySelector('#track-title')
  const playButton = document.querySelector('#play-button')
  const prevButton = document.querySelector('#prev-track')
  const nextButton = document.querySelector('#next-track')
  const progress = document.querySelector('.player-progress')
  const progressBar = document.querySelector('#progress-bar')
  const tracklist = document.querySelector('#tracklist')

  if (!playButton) return

  const audio = new Audio()
  audio.preload = 'none'

  let currentTrack = 0

  const trackButtons = Array.from(tracklist.querySelectorAll('.track'))

  trackButtons.forEach((button, index) => {
    button.addEventListener('click', () => loadTrack(index, true))
  })

  function loadTrack(index, autoplay = false) {
    audio.pause()
    currentTrack = (index + tracks.length) % tracks.length
    const track = tracks[currentTrack]

    title.textContent = track.title
    label.textContent = track.src ? 'AHORA SUENA' : 'PRÓXIMAMENTE'
    setProgress(0)

    trackButtons.forEach((button, i) => {
      const isActive = i === currentTrack
      button.classList.toggle('is-active', isActive)
      if (isActive) button.setAttribute('aria-current', 'true')
      else button.removeAttribute('aria-current')
    })

    if (track.src) {
      audio.src = track.src
      if (autoplay) audio.play().catch(() => {})
    } else {
      audio.removeAttribute('src')
      audio.load()
    }

    updatePlayButton()
  }

  function setProgress(percent) {
    progressBar.style.width = `${percent}%`
    progress.setAttribute('aria-valuenow', Math.round(percent))
  }

  function updatePlayButton() {
    const isPlaying = !audio.paused
    playButton.textContent = isPlaying ? '❚❚' : '▶'
    playButton.setAttribute('aria-label', isPlaying ? 'Pausar' : 'Reproducir')
    playButton.classList.toggle('is-playing', isPlaying)
  }

  playButton.addEventListener('click', () => {
    if (!tracks[currentTrack].src) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  })

  prevButton.addEventListener('click', () => loadTrack(currentTrack - 1, !audio.paused))
  nextButton.addEventListener('click', () => loadTrack(currentTrack + 1, !audio.paused))

  audio.addEventListener('play', updatePlayButton)
  audio.addEventListener('pause', updatePlayButton)
  audio.addEventListener('ended', () => loadTrack(currentTrack + 1, true))

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
  })

  progress.addEventListener('click', (event) => {
    if (!audio.duration) return
    const rect = progress.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    audio.currentTime = ratio * audio.duration
  })

  loadTrack(0)
}