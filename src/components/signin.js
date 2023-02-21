import './signin.css'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../store/auth-context'
import logo from './ICL_Logo.svg'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },

  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
})

function SignIn() {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formBody = new FormData(event.currentTarget)

    const api = BASE_URL + '/api/v1/auth/login'
    axios.post(api, formBody).then((res) => {
      if (res.data.status === 'ok') {
        authCtx.login(res.data.token)
        navigate('/', { replace: true })
      }
    })
  }

  return (
    <Container className="content mainContent">
      <Row>
        <Col md={6}>
          <Image src={logo}></Image>
        </Col>
        <Col md={6}>
          <div className="login-section">
            <div className="login-form">
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <CssTextField
                  id="email"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, height: '55px', fontSize: '20px' }}
                >
                  LOGIN
                </Button>
              </Box>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SignIn
