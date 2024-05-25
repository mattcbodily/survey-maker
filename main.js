import { sampleQuizData } from './sampleQuizData.js'

function displayQuizList() {
  const quizListElement = document.querySelector('.quiz-list')

  sampleQuizData.forEach(quiz => {
    const quizCardElement = document.createElement('div')

    quizCardElement.className = 'quiz-card'

    quizCardElement.innerHTML = `
      <h3 class="bold">${quiz.title}</h3>
      <p>${quiz.description}</p>
      <a href="/pages/take-quiz/?quiz=${quiz.id}">
        <button class="primary-button">Take quiz</button>
      </a>
    `

    quizListElement.appendChild(quizCardElement)
  })
}

displayQuizList()
