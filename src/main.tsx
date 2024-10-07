import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/assets/styles/global.css'
import worker from '@/mocks/browser'

if (process.env.NODE_ENV !== 'production') {
  worker.start()
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
