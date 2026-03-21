import { jobs } from '../data/jobs.js'
import { renderCards } from './cards.js'

const slider = document.getElementById('timeline-slider')

if (slider) {
const dateLabel = document.getElementById('timeline-date')

const minDate = jobs[0].startDate
const maxDate = new Date()

slider.min = minDate.getTime()
slider.max = maxDate.getTime()
slider.value = maxDate.getTime()

slider.addEventListener('input', function() {
  const date = new Date(Number(slider.value))
  dateLabel.textContent = date.toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric'
  })
  renderCards(date)
})

window.addEventListener('scroll', function(e) {
  console.log(e);
})

renderCards(maxDate)
}