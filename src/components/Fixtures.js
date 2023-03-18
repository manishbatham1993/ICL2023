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
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

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
  formButton: {
    textTransform: 'uppercase',
    marginLeft: '1rem',
  },
  selectMenu: {
    color: 'white',
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(228, 219, 233, 0.25)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(228, 219, 233, 0.25)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(228, 219, 233, 0.25)',
    },
    '.MuiSvgIcon-root ': {
      fill: 'white !important',
    },
  },
  uploadForm: { display: 'flex', alignItems: 'center' },
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
  const { currentLocation, locations } = entityCtx

  const fixtureDataRef = useRef()
  const locationRef = useRef()

  const [fixtures, setFixtures] = useState([])
  const roundMapping = new Map()
  fixtures.sort((a, b) => {
    return a.match - b.match
  })
  fixtures.forEach((fixture) => {
    const round = fixture.round
    if (!roundMapping.has(round)) roundMapping.set(round, [])
    roundMapping.get(round).push(fixture)
  })
  const keys = [...roundMapping.keys()]

  // snackbar
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    type: null,
    message: null,
    timer: null,
  })
  const setSnackbarHandler = (type, message, duration = 5) => {
    //duration in seconds
    clearTimeout(snackbar.timer)
    let timer = setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, isOpen: false }))
    }, duration * 1000)
    setSnackbar({ isOpen: true, type, message, timer })
  }

  const fetchFixtures = () => {
    axios
      .get(BASE_URL + '/api/v1/fixture?location=' + entityCtx.currentLocation)
      .then((res) => {
        const fixtures = res?.data?.fixtures
        if (fixtures) {
          setFixtures(fixtures)
        }
      })
      .catch((err) => {
        setSnackbarHandler('error', err?.response?.data?.msg)
      })
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const location = locationRef?.current?.value
    const file =
      fixtureDataRef?.current?.files?.length > 0
        ? fixtureDataRef.current.files[0]
        : null
    if (!location || !file) {
      setSnackbarHandler(
        'info',
        'Select csv file and location to upload fixtures'
      )
      return
    }

    // payload
    const formData = new FormData()
    formData.append('csv', file)
    formData.append('location', location)

    // configurations
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    // posting request
    axios
      .post(BASE_URL + '/api/v1/admin/fixture/upload', formData, config)
      .then((res) => {
        setSnackbarHandler('success', res?.data?.msg)
        fetchFixtures()
      })
      .catch((err) => {
        setSnackbarHandler('error', err?.response?.data?.msg)
      })
  }

  useEffect(() => {
    fetchFixtures()
  }, [currentLocation])

  // for mobile

  if (window.innerWidth <= 768) {
    return (
      <React.Fragment>
        {snackbar?.isOpen && (
          <Alert variant="filled" severity={snackbar.type}>
            {snackbar.message}
          </Alert>
        )}
        {authCtx.role === 'admin' && (
          <Box sx={mobileClasses.form}>
            <form onSubmit={formSubmitHandler}>
              <input
                id="image"
                type="file"
                accept=".csv"
                ref={fixtureDataRef}
                required
              />
              <Select
                size="small"
                sx={classes.selectMenu}
                label="location"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue={''}
                displayEmpty
                inputRef={locationRef}
              >
                <MenuItem value="">
                  <em>--Select--</em>
                </MenuItem>
                {locations.map((location) => (
                  <MenuItem value={location}>
                    <em>{location}</em>
                  </MenuItem>
                ))}
              </Select>
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
              <input type="hidden" name="location" value={currentLocation} />
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
                    <Nav.Item key={key}>
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
                        {roundMapping.get(key).map((match, i) => (
                          <Box key={i} sx={mobileClasses.box}>
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
      {snackbar?.isOpen && (
        <Alert variant="filled" severity={snackbar.type}>
          {snackbar.message}
        </Alert>
      )}
      {authCtx.role === 'admin' && (
        <Box sx={classes.form}>
          <form style={classes.uploadForm} onSubmit={formSubmitHandler}>
            <input
              id="image"
              type="file"
              accept=".csv"
              ref={fixtureDataRef}
              required
            />
            <Select
              size="small"
              sx={classes.selectMenu}
              label="location"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={''}
              displayEmpty
              inputRef={locationRef}
            >
              <MenuItem value="">
                <em>--Select--</em>
              </MenuItem>
              {locations.map((location) => (
                <MenuItem value={location}>
                  <em>{location}</em>
                </MenuItem>
              ))}
            </Select>
            <Button variant="primary" style={classes.formButton}>
              Upload Fixtures
            </Button>
          </form>
          <form method="GET" action={`${BASE_URL}/api/v1/fixture/csv`}>
            <input type="hidden" name="location" value={currentLocation} />
            <Button variant="primary" style={classes.formButton}>
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
                  <Nav.Item key={key}>
                    <Nav.Link eventKey={key}>{key}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Row>
            <Row>
              <Col>
                <Tab.Content>
                  {keys.map((key) => (
                    <Tab.Pane key={key} eventKey={key}>
                      {roundMapping.get(key).map((match, i) => (
                        <Box key={i} sx={classes.box}>
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
