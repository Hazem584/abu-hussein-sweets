import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { siteConfig } from './config/siteConfig.js'

document.documentElement.lang = 'ar'
document.documentElement.dir = 'rtl'
document.title = `${siteConfig.businessName} | منيو الحلويات`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
