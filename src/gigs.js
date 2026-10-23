/* =========================================
   gigs.js — Próximos directos
========================================= */

// Para añadir un concierto, copia una línea y cambia los datos.
// La fecha va siempre como AAAA-MM-DD. El enlace es opcional.
const upcomingGigs = [
  // { date: '2026-11-14', place: 'Sala Rem, Murcia', link: 'https://...' },
]

export function initGigs() {
  const list = document.querySelector('#upcoming-gigs-list')
  if (!list) return

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const futureGigs = upcomingGigs
    .map((gig) => ({ ...gig, dateObject: new Date(gig.date + 'T00:00:00') }))
    .filter((gig) => gig.dateObject >= today)
    .sort((a, b) => a.dateObject - b.dateObject)

  // Si no hay fechas, se queda el texto "Pronto anunciaremos..." del HTML
  if (futureGigs.length === 0) return

  list.innerHTML = ''

  futureGigs.forEach((gig) => {
    const row = document.createElement('article')
    row.className = 'gig-row'

    const date = document.createElement('span')
    date.className = 'gig-date'
    date.textContent = gig.dateObject
      .toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
      .replace('.', '')
      .toUpperCase()

    const place = document.createElement('span')
    place.className = 'gig-place'
    place.textContent = gig.place

    row.append(date, place)

    if (gig.link) {
      const link = document.createElement('a')
      link.className = 'gig-link'
      link.href = gig.link
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.textContent = 'Entradas ↗'
      row.append(link)
    }

    list.append(row)
  })
}