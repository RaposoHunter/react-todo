import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

document.querySelector('title')!.innerHTML = import.meta.env.VITE_APP_NAME;

createRoot(document.getElementById('root')!).render(
    <App />
)
