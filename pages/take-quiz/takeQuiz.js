import { sampleQuizData } from '../../sampleQuizData.js'
import './take-quiz.css'

const params = new URLSearchParams(window.location.search)
const quizId = params.get('quiz')

let activeQuestionIndex = 0
let selectedQuiz = sampleQuizData.find(quiz => quiz.id === parseInt(quizId)) 
let userSelectedAnswers = selectedQuiz.questions.map(question => ({
  answer: null,
  questionId: question.id,
}))

function handleAnswer(event, questionId) {
  const answer = selectedQuiz.questions[activeQuestionIndex].answers[event.target.getAttribute('data-answer-id') - 1]

  if (answer.id === userSelectedAnswers[activeQuestionIndex].answer?.id && userSelectedAnswers[questionId - 1].questionId === questionId - 1 + 1) {
    userSelectedAnswers[activeQuestionIndex].answer = null

    document.getElementById('next-button').disabled = true
  } else {
    userSelectedAnswers[activeQuestionIndex].answer = answer

    if (activeQuestionIndex === selectedQuiz.questions.length - 1) {
      document.getElementById('submit-button').disabled = false
    } else {
      document.getElementById('next-button').disabled = false
    }
  }

  const answerButtons = document.getElementsByClassName('answer-button')

  for (let i = 0; i < answerButtons.length; i++) {
    if (answer.id === i + 1 && !answerButtons[i].classList.contains('answer-selected')) {
      answerButtons[i].classList.add('answer-selected')
    } else if (answerButtons[i].classList.contains('answer-selected')) {
      answerButtons[i].classList.remove('answer-selected')
    }
  }
}

function renderQuizQuestion() {
  const { questions } = selectedQuiz
  
  document.querySelector('.quiz-question').innerHTML = `
    <p>Question ${activeQuestionIndex + 1} / ${selectedQuiz.questions.length}</p>
    <h3>${questions[activeQuestionIndex].text}</h3>
    ${questions[activeQuestionIndex].answers.map(answer => {
      return `
        <button 
          class="answer-button ${answer.id === userSelectedAnswers[activeQuestionIndex].answer?.id ? 'answer-selected' : ''}"
          data-answer-id="${answer.id}"
        >
          ${answer.text}
        </button>
      `
    }).join(' ')}
  `

  const answerButtons = document.querySelectorAll('.answer-button')

  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener('click', e => handleAnswer(e))
  }
}

function renderNavButtonContainer() {
  document.querySelector('.nav-button-container').innerHTML = `
    <button id="back-button" style="visibility: ${activeQuestionIndex === 0 ? 'hidden' : 'visible'};">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span>Back</span>
    </button>
    ${activeQuestionIndex === selectedQuiz.questions.length - 1
      ? `
        <button id="submit-button" disabled>
          <span>Submit</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg> 
        </button>
      `
      : `
        <button id="next-button" ${!userSelectedAnswers[activeQuestionIndex].answer ? 'disabled' : ''}>
          <span>Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      `
    }
  `

  if (activeQuestionIndex === selectedQuiz.questions.length - 1) {
    document.getElementById('submit-button').addEventListener('click', () => submitQuiz())
  } else {
    document.getElementById('next-button').addEventListener('click', () => handleNavButtonClick('next'))
  }

  document.getElementById('back-button').addEventListener('click', () => handleNavButtonClick('previous'))
}

function handleNavButtonClick(direction) {
  direction === 'next' ? activeQuestionIndex++ : activeQuestionIndex--
  
  renderQuizQuestion()
  renderNavButtonContainer()
}

function submitQuiz() {
  localStorage.setItem('quizResults', JSON.stringify(userSelectedAnswers))

  window.location.pathname = `/quiz-results`
}

export function displayTakeQuizPage() {
  document.querySelector('.app').innerHTML = `
    <h2>Take quiz page</h2>
    <section class="quiz-question">
    </section>
    <div class="nav-button-container">
    </div>
  `

  renderQuizQuestion()
  renderNavButtonContainer()
}

