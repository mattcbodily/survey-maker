import { renderActivePage } from '../../router.js'
import { sampleQuizData } from '../../sampleQuizData.js'

export function displayQuizList() {
  document.querySelector('.app').innerHTML = `
    <h2 style="margin-bottom: 16px;">Recent quizzes</h2>
    <div class="quiz-list">
      ${sampleQuizData.map(quiz => {
        return `
          <div class="quiz-card">
            <h3 class="bold">${quiz.title}</h3>
            <p>${quiz.description}</p>
            <a href="/take-quiz/?quiz=${quiz.id}">
              <button class="primary-button">Take quiz</button>
            </a>
          </div>
        `
      }
      )}
    </div>
  `
}