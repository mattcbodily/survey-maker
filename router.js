import { displayQuizList } from './pages/landing/landing'
import { displayTakeQuizPage } from './pages/take-quiz/takeQuiz'

let activePage = ''

window.addEventListener('popstate', (e) => {
  e.preventDefault()

  activePage = window.location.hash.replace('#/', '')
  
  renderActivePage()
})

export function renderActivePage() {
  switch(activePage) {
    case '':
      return displayQuizList()
    case 'take-quiz':
      console.log('hit')
      return displayTakeQuizPage()
    case 'quiz-results':
      return ''
    default:
      return ''
  }
}
