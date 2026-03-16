import {getJobAtDate} from "../data/jobs.js"

export function renderCards(date) {
  const job = getJobAtDate(date)
  if (!job) return

  document.getElementById('card-date').textContent =
    job.startDate.getFullYear() + ' – ' + job.endDate.getFullYear()

  document.getElementById('card-title').textContent = job.title
  document.getElementById('card-body').textContent = job.description

  const linkCompany = document.getElementById('card-company-website')
  linkCompany.textContent = job.company
  linkCompany.href = job.companyLink

  document.getElementById('card-tools-body').textContent = job.tools.join(', ')

  const link = document.getElementById('card-project-link')
  link.href = job.projectUrl
  link.textContent = job.projectLabel

}
