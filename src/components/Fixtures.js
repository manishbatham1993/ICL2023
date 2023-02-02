import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios'
import AuthContext from '../store/auth-context'
import EntityContext from '../store/entity-context'

import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import { Button, Row, Col, Card } from 'reactstrap'
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
    margin: '1rem 0',
    padding: '1rem',
    boxShadow: 2,
    borderRadius: 2,
    background: '#27293d',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '65%',
  },
  date: {
    color: 'yellow',
    textTransform: 'none',
  },
  time: {
    color: 'yellow',
    textTransform: 'none',
  },
  wonButton: {
    borderRadius: 50,
    width: 'fit-content',
    padding: '0.4rem 1.4rem',
    margin: 'auto',
  },
  button: {
    textTransform: 'none',
    margin: '0 auto',
  },
  card: {
    // background: 'transparent',
    boxShadow: 'none',
    width: '40%',
    margin: 0,
  },
  avatar: {
    width: 100,
    height: 100,
    fontSize: '5rem',
    marginBottom: '1rem',
  },
}

const mobileClasses = {
  form: {
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '1rem 0',
    padding: '1rem',
    boxShadow: 2,
    borderRadius: 2,
    background: '#27293d',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.5rem',
    // width: '65%',
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
  date: {
    color: 'yellow',
    textTransform: 'none',
  },
  time: {
    color: 'yellow',
    textTransform: 'none',
  },
  wonButton: {
    borderRadius: 50,
    width: 'fit-content',
    padding: '0 1rem',
    margin: 'auto',
  },
  button: {
    textTransform: 'none',
    margin: '0 auto',
  },
  card: {
    // background: 'transparent',
    boxShadow: 'none',
    margin: 0,
  },
  avatar: {
    width: 50,
    height: 50,
    fontSize: '5rem',
    // marginBottom: '1rem',
  },
}

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const Fixtures = () => {
  const authCtx = useContext(AuthContext)
  const entityCtx = useContext(EntityContext)

  const fixtureDataRef = useRef()

  const [fixtures, setFixtures] = useState([])
  fixtures.sort((a, b) => {
    return a.match - b.match
  })

  const roundMapping = new Map()
  fixtures.forEach((fixture) => {
    const round = fixture.round
    if (!roundMapping.has(round)) roundMapping.set(round, [])
    roundMapping.get(round).push(fixture)
  })

  const keys = [...roundMapping.keys()]
  useEffect(() => {
    axios.get(BASE_URL + '/api/v1/fixture').then((res) => {
      const fixtures = res?.data?.fixtures
      if (fixtures) {
        setFixtures(fixtures)
      }
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
  // for mobile

  if (window.innerWidth <= 768) {
    return (
      <React.Fragment>
        {authCtx.role === 'admin' && (
          <Box sx={mobileClasses.form}>
            <form onSubmit={formSubmitHandler}>
              <input id="image" type="file" ref={fixtureDataRef} required />
              <Button
                variant="primary"
                style={{
                  marginLeft: '1rem',
                  width: '90%',
                }}
                size="sm"
              >
                Upload Fixtures
              </Button>
            </form>
            <form method="GET" action={`${BASE_URL}/api/v1/fixture/csv`}>
              <Button
                variant="primary"
                style={{
                  marginLeft: '1rem',
                  width: '90%',
                }}
                size="sm"
              >
                Download Fixtures
              </Button>
            </form>
          </Box>
        )}
        {keys.length > 0 && (
          <div className="content mainContent container">
            <Tab.Container id="left-tabs-example" defaultActiveKey={keys[0]}>
              <Row>
                <Nav
                  fill
                  variant="pills"
                  className=""
                  style={{ flex: 'auto', marginBottom: '40px' }}
                >
                  {keys.map((key) => (
                    <Nav.Item>
                      <Nav.Link eventKey={key}>{key}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Row>
              <Row>
                <Col>
                  <Tab.Content>
                    {keys.map((key) => (
                      <Tab.Pane eventKey={key}>
                        {roundMapping.get(key).map((match) => (
                          <Box sx={mobileClasses.box}>
                            <Box sx={mobileClasses.details}>
                              <Button
                                variant="contained"
                                color="info"
                                style={mobileClasses.button}
                                size="sm"
                              >
                                Match {match.match}
                              </Button>

                              <Typography
                                variant="h8"
                                style={mobileClasses.date}
                              >
                                {match.date}
                              </Typography>
                              <Typography
                                variant="h8"
                                style={mobileClasses.time}
                              >
                                {match.time}
                              </Typography>

                              <Button
                                variant="contained"
                                style={mobileClasses.button}
                                size="sm"
                              >
                                Ground: {match.ground}
                              </Button>
                            </Box>
                            <Box>
                              <Card style={mobileClasses.card}>
                                <Avatar
                                  className="center"
                                  src={`${BASE_URL}/${match.teamAData?.imageUrl}`}
                                  sx={mobileClasses.avatar}
                                />
                                <Typography variant="h8" color="white">
                                  {match.teamA}
                                </Typography>
                                {match.teamA &&
                                  match.result === match.teamA && (
                                    <Button
                                      sx="sm"
                                      color="danger"
                                      style={mobileClasses.wonButton}
                                    >
                                      WON
                                    </Button>
                                  )}
                              </Card>

                              <Typography
                                variant="h6"
                                style={{ margin: 'auto', fontWeight: 'bold' }}
                                color="grey"
                              >
                                V/S
                              </Typography>
                              <Card style={mobileClasses.card}>
                                <Avatar
                                  className="center"
                                  src={`${BASE_URL}/${match.teamBData?.imageUrl}`}
                                  sx={mobileClasses.avatar}
                                />
                                <Typography variant="h8" color="white">
                                  {match.teamB}
                                </Typography>
                                {match.teamB &&
                                  match.result === match.teamB && (
                                    <Button
                                      sx="sm"
                                      color="danger"
                                      style={mobileClasses.wonButton}
                                    >
                                      WON
                                    </Button>
                                  )}
                              </Card>
                            </Box>
                          </Box>
                        ))}
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        )}
      </React.Fragment>
    )
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
      {keys.length > 0 && (
        <div className="content mainContent container">
          <Tab.Container id="left-tabs-example" defaultActiveKey={keys[0]}>
            <Row>
              <Nav
                fill
                variant="pills"
                className=""
                style={{ flex: 'auto', marginBottom: '40px' }}
              >
                {keys.map((key) => (
                  <Nav.Item>
                    <Nav.Link eventKey={key}>{key}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Row>
            <Row>
              <Col>
                <Tab.Content>
                  {keys.map((key) => (
                    <Tab.Pane eventKey={key}>
                      {roundMapping.get(key).map((match) => (
                        <Box sx={classes.box}>
                          <Box sx={classes.details}>
                            <Button
                              variant="contained"
                              color="info"
                              style={classes.button}
                              size="sm"
                            >
                              Match {match.match}
                            </Button>

                            <Typography variant="h6" style={classes.date}>
                              {match.date}
                            </Typography>
                            <Typography variant="h6" style={classes.time}>
                              {match.time}
                            </Typography>

                            <Button
                              variant="contained"
                              style={classes.button}
                              size="sm"
                            >
                              Ground: {match.ground}
                            </Button>
                          </Box>
                          <Card style={classes.card}>
                            <Avatar
                              className="center"
                              src={`${BASE_URL}/${match.teamAData?.imageUrl}`}
                              sx={classes.avatar}
                            />
                            <Typography variant="h6">{match.teamA}</Typography>
                            {match.teamA && match.teamA === match.result && (
                              <Button
                                sx="sm"
                                color="danger"
                                style={classes.wonButton}
                              >
                                WON
                              </Button>
                            )}
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
                              src={`${BASE_URL}/${match.teamBData?.imageUrl}`}
                              sx={classes.avatar}
                            />
                            <Typography variant="h6">{match.teamB}</Typography>
                            {match.teamB && match.teamB === match.result && (
                              <Button
                                sx="sm"
                                color="danger"
                                style={classes.wonButton}
                              >
                                WON
                              </Button>
                            )}
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
      )}
    </React.Fragment>
  )
}

export default Fixtures
