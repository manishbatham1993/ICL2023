import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const AuthContext = React.createContext({
  token: null,
  user: null,
  isLoggedIn: false,
  role: null,
  login: () => {},
  logout: () => {},
})

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken)
  const [user, setUser] = useState(null)

  const isLoggedIn = !!token
  const role = user && user.role ? user.role : null
  console.log('auth-context-provider, token', token)

  useEffect(() => {
    console.log('auth-context-use-effect')
    if (token) {
      const api = BASE_URL + '/api/v1/auth/user'
      axios
        .get(api, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          console.log('auth-get-user-res', res)
          if (res.data.status === 'ok') {
            setUser(res.data.user)
          }
        })
        .catch((err) => {
          console.log('error', err)
          logoutHandler()
        })
    }
  }, [token])

  const logoutHandler = () => {
    console.log('--------------logout---------------')
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  const loginHandler = (token) => {
    console.log('auth-token', token)
    // const expiresInSec = data.expiresInSec || 5
    localStorage.setItem('token', token)
    setToken(token)
    // setTimeout(logoutHandler, expiresInSec * 1000)
  }

  const contextValue = {
    token,
    user,
    isLoggedIn,
    role,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
