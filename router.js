import { displayQuizList } from './pages/landing/landing'
import { displayQuizResultsPage } from './pages/quiz-results/quizResults'
import { displayTakeQuizPage } from './pages/take-quiz/takeQuiz'

let activePage = ''

window.addEventListener('popstate', (e) => {
  e.preventDefault()

  renderActivePage(window.location.pathname)
})

function attachHrefEventListeners() {
  document.querySelectorAll('[href^="/"').forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault()
  
      const { href, pathname, search } = new URL(element.href)
      
      
      window.history.pushState({ pathname }, '', href)
  
      renderActivePage(pathname, search)
    })
  })
}

export async function renderActivePage(pathname = '/') {
  activePage = pathname.replaceAll('/', '')

  switch(activePage) {
    case '':
      await displayQuizList()

      return attachHrefEventListeners()
    case 'take-quiz':
      await displayTakeQuizPage()

      return attachHrefEventListeners()
    case 'quiz-results':
      await displayQuizResultsPage()

      return attachHrefEventListeners()
    default:
      return document.querySelector('.app').innerHTML = `
        <p>404 not found</p>
      `
  }
}

export function initializeRouter() {
  renderActivePage()

  window.addEventListener('DOMContentLoaded', () => {
    renderActivePage(window.location.pathname)
  })
}
