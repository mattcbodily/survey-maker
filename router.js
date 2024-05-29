import { displayLandingPage } from './pages/landing/landing'

let activePage = ''

window.addEventListener('popstate', (e) => {
  e.preventDefault()

  renderActivePage(window.location.pathname)
})

function attachHrefEventListeners() {
  document.querySelectorAll('[href^="/"').forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault()
  
      const url = new URL(element.href)
      
      window.history.pushState({}, '', url)
  
      renderActivePage(url.pathname)
    })
  })
}

export async function renderActivePage(pathname = '/') {
  activePage = pathname.replaceAll('/', '')

  switch(activePage) {
    case '':
      await displayLandingPage()
      attachHrefEventListeners()
      break;
    case 'quizzes':
      const quizzesModule = await import('./pages/quizzes/quizzes')
      quizzesModule.displayQuizList()
      attachHrefEventListeners()
      break;
    case 'quiz-results':
      const quizResultsModule = await import('./pages/quiz-results/quizResults')
      quizResultsModule.displayQuizResultsPage()
      attachHrefEventListeners()
      break;
    case 'take-quiz':
      const takeQuizModule = await import('./pages/take-quiz/takeQuiz')
      takeQuizModule.displayTakeQuizPage()
      attachHrefEventListeners()
      break;
    default:
      return document.querySelector('.app').innerHTML = `
        <p>404 not found</p>
      `
  }
}

export function initializeRouter() {
  renderActivePage(window.location.pathname)

  window.addEventListener('DOMContentLoaded', () => {
    renderActivePage(window.location.pathname)
  })
}
