import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase.js'
import './take-quiz.css'

const params = new URLSearchParams(window.location.search)
const quizId = params.get('quiz')
const questions = []

const q = query(collection(db, 'quiz-questions'), where('quizId', '==', quizId));

const querySnapshot = await getDocs(q)

querySnapshot.forEach((doc) => {
  questions.push({ questionId: doc.id, ...doc.data() })
})

let activeQuestionIndex = 0
let userSelectedAnswers = questions.map(question => ({
  answer: null,
  questionId: question.questionId,
}))

function handleAnswer(event) {
  const answer = questions[activeQuestionIndex].answers.find(el => el.answerId === event.target.getAttribute('data-answer-id'))
  const answerId = event.target.getAttribute('data-answer-id')

  if (answerId === userSelectedAnswers[activeQuestionIndex].answer?.id && userSelectedAnswers[activeQuestionIndex].questionId === activeQuestionIndex + 1) {
    userSelectedAnswers[activeQuestionIndex].answer = null

    document.getElementById('next-button').disabled = true
  } else {
    userSelectedAnswers[activeQuestionIndex].answer = answer

    if (activeQuestionIndex === questions.length - 1) {
      document.getElementById('submit-button').disabled = false
    } else {
      document.getElementById('next-button').disabled = false
    }
  }

  const answerButtons = document.getElementsByClassName('answer-button')

  for (let i = 0; i < answerButtons.length; i++) {
    if (answerId === answerButtons[i].getAttribute('data-answer-id') && !answerButtons[i].classList.contains('answer-selected')) {
      answerButtons[i].classList.add('answer-selected')
    } else if (answerButtons[i].classList.contains('answer-selected')) {
      answerButtons[i].classList.remove('answer-selected')
    }
  }
}

function renderQuizQuestion() {
  document.querySelector('.quiz-question').innerHTML = `
    <p>Question ${activeQuestionIndex + 1} / ${questions.length}</p>
    <h3>${questions[activeQuestionIndex].prompt}</h3>
    ${questions[activeQuestionIndex].answers.map(answer => {
      return `
        <button 
          class="answer-button ${answer.answerId === userSelectedAnswers[activeQuestionIndex].answer?.answerId ? 'answer-selected' : ''}"
          data-answer-id="${answer.answerId}"
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
    ${activeQuestionIndex === questions.length - 1
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

  if (activeQuestionIndex === questions.length - 1) {
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

  window.location.pathname = '/quiz-results'
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

