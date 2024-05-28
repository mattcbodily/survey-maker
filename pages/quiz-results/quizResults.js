import { sampleQuizData } from '../../sampleQuizData.js'
import './quiz-results.css'

const urlParams = new URLSearchParams(window.location.search)
const quizId = urlParams.get('quiz')

const selectedQuiz = sampleQuizData.find(quiz => quiz.id === parseInt(quizId))

export function displayQuizResultsPage() {
  const quizResults = JSON.parse(localStorage.getItem('quizResults'))

  const formattedResults = quizResults.reduce((acc, curr) => {
    if (curr.answer.correct) {
      acc.correctAnswers.push(curr)
    } else {
      acc.missedAnswers.push(curr)
    }

    return acc
  }, {
    correctAnswers: [],
    missedAnswers: [],
  })

  document.querySelector('.app').innerHTML = `
    <h2>Your results</h2>
    <section class="quiz-results"></section>
    <p class="quiz-score">${formattedResults.correctAnswers.length}/${selectedQuiz.questions.length}</p>
  `
}