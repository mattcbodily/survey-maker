import { sampleQuizData } from '../../sampleQuizData.js'
import './take-quiz.css'

let activeQuestionIndex = 0
let selectedQuiz = null
let userSelectedAnswers = null

function handleAnswer(event) {
  const answer = selectedQuiz.questions[activeQuestionIndex].answers[event.target.getAttribute('data-answer-id') - 1]

  if (answer.id === userSelectedAnswers[activeQuestionIndex].answer?.id && userSelectedAnswers[activeQuestionIndex].questionId === activeQuestionIndex) {
    userSelectedAnswers[activeQuestionIndex].answer = null
  } else {
    userSelectedAnswers[activeQuestionIndex].answer = answer
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
  console.log(activeQuestionIndex)

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
}

function handleNextQuestion() {
  if (activeQuestionIndex === selectedQuiz.questions.length - 1) return

  activeQuestionIndex++
  
  renderQuizQuestion()

  if (activeQuestionIndex === selectedQuiz.questions.length - 1) {
    document.getElementById('next-button').innerHTML = `
      <span>Submit</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>   
    `
  }
}

function handlePreviousQuestion() {
  activeQuestionIndex--

  if (activeQuestionIndex === 0) {
    document.getElementById('back-button').style.visibility = 'hidden'
  }

  renderQuizQuestion()

  if (activeQuestionIndex === selectedQuiz.questions.length - 1) {
    document.getElementById('next-button').innerHTML = `
      <span>Next</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    `
  }
}

function submitQuiz() {
  localStorage.setItem('quizResults', JSON.stringify(userSelectedAnswers))

  window.location.hash = `#/quiz-results/?quiz=${quizId}`
}

function setupTakeQuizDisplay() {
  setupQuestionDetails()
  setupNavButtons()
}

export function displayTakeQuizPage(passedState) {
  selectedQuiz = sampleQuizData.find(quiz => quiz.id === parseInt(passedState.quiz))
  userSelectedAnswers = selectedQuiz.questions.map(question => ({
    answer: null,
    questionId: question.id,
  }))

  const { questions } = selectedQuiz

  const activeQuestion = questions[activeQuestionIndex]

  document.querySelector('.app').innerHTML = `
    <h2>Take quiz page</h2>
    <section class="quiz-question">
      <p>Question ${activeQuestionIndex + 1} / ${questions.length}</p>
      <h3>${activeQuestion.text}</h3>
      ${activeQuestion.answers.map(answer => {
        return `
          <button 
            class="answer-button ${answer.id === userSelectedAnswers[activeQuestionIndex].answer?.id ? 'answer-selected' : ''}"
            data-answer-id="${answer.id}"
          >
            ${answer.text}
          </button>
        `
      }).join(' ')}
    </section>
    <div class="nav-button-container">
      <button id="back-button" style="visibility: ${activeQuestionIndex === 0 ? 'hidden' : 'visible'}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>Back</span>
      </button>
      <button id="next-button">
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>
    </div>
  `

  const answerButtons = document.querySelectorAll('.answer-button')

  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener('click', e => handleAnswer(e))
  }

  document.getElementById('next-button').addEventListener('click', e => handleNextQuestion(e))
  document.getElementById('back-button').addEventListener('click', e => handlePreviousQuestion(e))
}

