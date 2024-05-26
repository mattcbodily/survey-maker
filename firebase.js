import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_AUTH_DOMAIN,
  VIRE_FIREBASE_MEASUREMENT_ID,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
} = import.meta.env

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  appId: VITE_FIREBASE_APP_ID,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: VIRE_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
}

export const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)
export const db = getFirestore(app)