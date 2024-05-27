import { displayQuizList } from './pages/landing/landing'
import { displayQuizResultsPage } from './pages/quiz-results/quizResults'
import { displayTakeQuizPage } from './pages/take-quiz/takeQuiz'

let activePage = ''

export const globalState = {
  quiz: null,
}

function parseHashUrl() {
  if (window.location.hash) {

    let parsedHash = window.location.hash.replace('#/', '').split('/?')
    
    activePage = parsedHash[0]

    const queryParams = parsedHash[1].split('&')
    
    queryParams.forEach(param => {
      const splitParams = param.split('=')

      globalState[splitParams[0]] = splitParams[1]
    })
  } else {
    activePage = ''
  }
}

window.addEventListener('popstate', (e) => {
  e.preventDefault()
  console.log('hit')
  renderActivePage()
})

export function renderActivePage() {
  parseHashUrl()

  switch(activePage) {
    case '':
      return displayQuizList(globalState)
    case 'take-quiz':
      return displayTakeQuizPage(globalState)
    case 'quiz-results':
      return displayQuizResultsPage(globalState)
    default:
      return document.querySelector('.app').innerHTML = `
        <p>404 not found</p>
      `
  }
}
