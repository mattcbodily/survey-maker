// import { sampleQuizData } from '../../sampleQuizData.js'

// const urlParams = new URLSearchParams(window.location.search)
// const quizId = urlParams.get('quiz')

// const selectedQuiz = sampleQuizData.find(quiz => quiz.id === parseInt(quizId))

// function setupQuizResults() {
//   const quizResults = JSON.parse(localStorage.getItem('quizResults'))

//   const formattedResults = quizResults.reduce((acc, curr) => {
//     if (curr.answer.correct) {
//       acc.correctAnswers.push(curr)
//     } else {
//       acc.missedAnswers.push(curr)
//     }

//     return acc
//   }, {
//     correctAnswers: [],
//     missedAnswers: [],
//   })

//   const quizResultsElement = document.querySelector('.quiz-results')

//   quizResultsElement.innerHTML = `
//     <p class="quiz-score">${formattedResults.correctAnswers.length}/${selectedQuiz.questions.length}</p>

//   `
// }

// setupQuizResults()

export function displayQuizResultsPage() {
  document.querySelector('.app').innerHTML = `
    <h2>Quiz results</h2>
  `
}