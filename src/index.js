import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './store/auth-context'
import { EntityContextProvider } from './store/entity-context'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './assets/scss/black-dashboard-react.scss'
import './assets/demo/demo.css'
import './assets/css/nucleo-icons.css'
import { BrowserRouter } from 'react-router-dom'

// import "@fortawesome/fontawesome-free/css/all.min.css";
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EntityContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EntityContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
