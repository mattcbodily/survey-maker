import { collection, getDocs } from 'firebase/firestore'

import { db } from '../../firebase.js'

const querySnapshot = await getDocs(collection(db, 'quizzes'))

export async function displayQuizList() {
  document.querySelector('.app').innerHTML = `
    <h2 style="margin-bottom: 16px;">Recent quizzes</h2>
    <div class="quiz-list"></div>
  `
  
  const quizListElement = document.querySelector('.quiz-list')
  
  querySnapshot.forEach((doc) => {
    const quizCardElement = document.createElement('div')

    quizCardElement.className = 'quiz-card'

    quizCardElement.innerHTML = `
      <h3 class="bold">${doc.data().title}</h3>
      <p>${doc.data().description}</p>
      <a href="/take-quiz/?quiz=${doc.id}">
        <button class="primary-button">Take quiz</button>
      </a>
    `

    quizListElement.appendChild(quizCardElement)
  })
}