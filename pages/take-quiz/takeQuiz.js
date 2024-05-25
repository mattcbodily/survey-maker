import { sampleQuizData } from '../../sampleQuizData.js'

const urlParams = new URLSearchParams(window.location.search)
const quizId = urlParams.get('quiz')

const selectedQuiz = sampleQuizData.find(quiz => quiz.id === parseInt(quizId))
let activeQuestion = 1

const userSelectedAnswers = []

const nextButton = document.createElement('button')

function handleAnswer(answer, question) {
  const previouslyAnsweredQuestionId = userSelectedAnswers.findIndex(selectedAnswer => question.id === selectedAnswer.questionId)

  if (previouslyAnsweredQuestionId !== -1) {
    userSelectedAnswers.splice(previouslyAnsweredQuestionId, 1, { ...answer, questionId: question.id })
  } else {
    userSelectedAnswers.push({ ...answer, questionId: question.id })
  }

  nextButton.disabled = false
}

function submitQuiz() {
  // TODO: Build this out in the next branch
}

function setupNavButtons() {
  const navButtonContainer = document.querySelector('.nav-button-container')

  const previousButton = document.createElement('button')

  previousButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
    <span>Back<span>
  `
  previousButton.style.visibility = 'hidden'

  previousButton.addEventListener('click', () => {
    activeQuestion--

    if (activeQuestion === 1) {
      previousButton.style.visibility = 'hidden'
    }

    if (nextButton.innerText === 'Submit') {
      nextButton.innerHTML = `
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      `
    }

    setupQuestionDetails()
  })

  navButtonContainer.appendChild(previousButton)

  nextButton.innerHTML = `
    <span>Next</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  `

  nextButton.addEventListener('click', () => {
    if (activeQuestion === selectedQuiz.questions.length) {
      submitQuiz()
    } else {
      activeQuestion++

      if (activeQuestion > 1) {
        previousButton.style.visibility = 'visible'
      }

      if (activeQuestion === selectedQuiz.questions.length) {
        nextButton.innerHTML = `
          <span>Submit</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>    
        `
      }

      setupQuestionDetails()
    }
  })

  navButtonContainer.appendChild(nextButton)
}

function setupQuestionDetails() {
  const quizQuestions = selectedQuiz.questions
  const activeQuestionDetails = quizQuestions.find(question => question.id === activeQuestion)

  nextButton.disabled = true

  const quizQuestionContainer = document.querySelector('.quiz-question')

  quizQuestionContainer.innerHTML = `
    <p>Question ${activeQuestion} / ${selectedQuiz.questions.length}</p>
    <h3>${activeQuestionDetails.text}</h3>
  `

  activeQuestionDetails.answers.forEach(answer => {
    const answerButton = document.createElement('button')

    answerButton.className = 'answer-button'

    answerButton.innerText = answer.text

    answerButton.addEventListener('click', () => {
      answerButton.style.backgroundColor = '#4338ca'
      answerButton.style.color = '#eef2ff'

      handleAnswer(answer, activeQuestionDetails)
    })

    quizQuestionContainer.appendChild(answerButton)
  })
}

function setupTakeQuizDisplay() {
  const takeQuizTitle = document.querySelector('.quiz-title')

  takeQuizTitle.innerText = selectedQuiz.title

  setupQuestionDetails()
  setupNavButtons()
}

setupTakeQuizDisplay()