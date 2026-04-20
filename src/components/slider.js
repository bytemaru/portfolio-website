import { jobs } from '../data/jobs.js'
import { renderCards } from './cards.js'

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('timeline-slider')
  if (!slider) return

  const dateLabel = document.getElementById('timeline-date')
  const cardsSection = document.querySelector('.cards')

  const minDate = jobs[0].startDate
  const maxDate = new Date()

  slider.min = minDate.getTime()
  slider.max = maxDate.getTime()
  slider.value = maxDate.getTime()

  dateLabel.textContent = maxDate.toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric'
  })

  renderCards(maxDate)

  if (cardsSection) {
    cardsSection.classList.add('cards--ready')
  }

  slider.addEventListener('input', function () {
    const date = new Date(Number(slider.value))
    dateLabel.textContent = date.toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric'
    })
    renderCards(date)
  })
})