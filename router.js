import { displayQuizList } from './pages/landing/landing'
import { displayQuizResultsPage } from './pages/quiz-results/quizResults'
import { displayTakeQuizPage } from './pages/take-quiz/takeQuiz'

let activePage = ''

export const globalState = {
  quiz: null,
}

window.addEventListener('popstate', (e) => {
  e.preventDefault()

  renderActivePage(window.location.pathname)
})

function attachHrefEventListeners() {
  document.querySelectorAll('[href^="/"').forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault()
  
      const { href, pathname, search} = new URL(element.href)
      
      
      window.history.pushState({ pathname }, '', href)
  
      renderActivePage(pathname, search)
    })
  })
}

export async function renderActivePage(pathname = '/', search = '') {
  activePage = pathname.replaceAll('/', '')

  const queryParams = search.replace('?', '').split('&')
  
  queryParams.forEach(param => {
    const splitParams = param.split('=')

    globalState[splitParams[0]] = splitParams[1]
  })

  switch(activePage) {
    case '':
      await displayQuizList(globalState)

      return attachHrefEventListeners()
    case 'take-quiz':
      await displayTakeQuizPage(globalState)

      return attachHrefEventListeners()
    case 'quiz-results':
      displayQuizResultsPage(globalState)

      return attachHrefEventListeners()
    default:
      return document.querySelector('.app').innerHTML = `
        <p>404 not found</p>
      `
  }
}
