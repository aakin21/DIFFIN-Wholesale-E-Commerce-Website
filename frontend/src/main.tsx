import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// React yüklendikten sonra initial loader'ı kaldır
requestAnimationFrame(() => {
  setTimeout(() => {
    if ((window as any).__hideLoader) (window as any).__hideLoader();
  }, 100);
});
