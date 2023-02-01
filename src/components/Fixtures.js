import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios'
import AuthContext from '../store/auth-context'
import EntityContext from '../store/entity-context'

import './overview.css'
import './Fixtures.css'

import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import { Button, Row, Col, Container, Card } from 'reactstrap'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

const classes = {
  form: {
    margin: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  box: {
    display: 'flex',
    margin: '2rem 0',
    padding: '1rem',
    boxShadow: 2,
    borderRadius: 2,
    background: '#27293d',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1.5rem',
    width: '65%',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'grey',
    borderRadius: '7rem',
    color: 'black',
    height: '4rem',
  },
  button: {
    textTransform: 'uppercase',
    margin: '0 auto',
  },
  card: {
    // background: 'transparent',
    boxShadow: 'none',
    width: '40%',
  },
  avatar: {
    width: 200,
    height: 200,
    fontSize: '5rem',
    marginBottom: '1rem',
  },
}

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const Fixtures = () => {
  const authCtx = useContext(AuthContext)
  const entityCtx = useContext(EntityContext)

  const fixtureDataRef = useRef()

  const [fixtures, setFixtures] = useState([])
  const FIXTURE_ROUNDS = entityCtx ? entityCtx.configurations.FIXTURE_ROUNDS : 0

  const rounds = [...Array(FIXTURE_ROUNDS || 0).keys()].map((i) => i + 1)

  useEffect(() => {
    axios.get(BASE_URL + '/api/v1/fixture').then((res) => {
      const fixtures = res?.data?.fixtures
      if (fixtures) setFixtures(fixtures)
    })
  }, [])

  const formSubmitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('csv', fixtureDataRef.current.files[0])

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios
      .post(BASE_URL + '/api/v1/fixture/upload', formData, config)
      .then((res) => {
        window.location.reload()
      })
  }

  return (
    <React.Fragment>
      {authCtx.role === 'admin' && (
        <Box sx={classes.form}>
          <form onSubmit={formSubmitHandler}>
            <input id="image" type="file" ref={fixtureDataRef} required />
            <Button variant="primary" style={classes.button}>
              Upload Fixtures
            </Button>
          </form>
          <form method="GET" action={`${BASE_URL}/api/v1/fixture/csv`}>
            <Button
              variant="primary"
              style={{
                textTransform: 'uppercase',
                marginLeft: '1rem',
              }}
            >
              Download Fixtures
            </Button>
          </form>
        </Box>
      )}
      <div className="content mainContent container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="round1">
          <Row>
            <Nav
              fill
              variant="pills"
              className=""
              style={{ flex: 'auto', marginBottom: '40px' }}
            >
              {rounds.map((i) => (
                <Nav.Item>
                  <Nav.Link eventKey={`round${i}`}>Round{i}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                {rounds.map((i) => (
                  <Tab.Pane eventKey={`round${i}`}>
                    {fixtures
                      .filter((fixture) => fixture.round === i)
                      .map((match) => (
                        <Box sx={classes.box}>
                          <Box sx={classes.details}>
                            <Button
                              variant="contained"
                              color="info"
                              style={classes.button}
                            >
                              Match {match.match}
                            </Button>

                            <Typography
                              variant="h5"
                              style={{ color: 'yellow' }}
                            >
                              {match.date}
                            </Typography>
                            <Typography
                              variant="h5"
                              style={{ color: 'yellow' }}
                            >
                              {match.time}
                            </Typography>

                            <Button
                              variant="contained"
                              style={classes.button}
                              size="lg"
                            >
                              Ground: {match.ground}
                            </Button>
                          </Box>
                          <Card style={classes.card}>
                            <Avatar
                              className="center"
                              src={`${BASE_URL}/${match.teamA?.imageUrl}`}
                              sx={classes.avatar}
                            />
                            <Typography variant="h5">
                              {match.teamA?.name}
                            </Typography>
                          </Card>

                          <Typography
                            variant="h4"
                            style={{ margin: 'auto', fontWeight: 'bold' }}
                          >
                            V/S
                          </Typography>
                          <Card style={classes.card}>
                            <Avatar
                              className="center"
                              src={`${BASE_URL}/${match.teamB?.imageUrl}`}
                              sx={classes.avatar}
                            />
                            <Typography variant="h5">
                              {match.teamB?.name}
                            </Typography>
                          </Card>
                        </Box>
                      ))}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </React.Fragment>
  )
}

export default Fixtures
