import { displayQuizList } from './pages/landing/landing'

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
      attachHrefEventListeners()
      break;
    case 'take-quiz':
      const takeQuizModule = await import('./pages/take-quiz/takeQuiz')
      takeQuizModule.displayTakeQuizPage()
      attachHrefEventListeners()
      break;
    case 'quiz-results':
      const quizResultsModule = await import('./pages/quiz-results/quizResults')
      quizResultsModule.displayQuizResultsPage()
      attachHrefEventListeners()
      break;
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
