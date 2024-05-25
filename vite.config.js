import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        takeQuiz: resolve(__dirname, 'pages/take-quiz/index.html'),
      },
    },
  },
})