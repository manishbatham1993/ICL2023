import React, { useState, useEffect, useContext } from 'react'
import './overview.css'
import './Fixtures.css'

import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import { Button, Row, Col, Container, Card } from 'reactstrap'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

const classes = {
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
    '&:hover': 'none',
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

const Fixtures = () => {
  return (
    <div className="content mainContent container">
      <Tab.Container id="left-tabs-example" defaultActiveKey="tab2">
        <Row>
          <Nav
            fill
            variant="pills"
            className=""
            style={{ flex: 'auto', marginBottom: '40px' }}
          >
            <Nav.Item>
              <Nav.Link eventKey="tab1">Round1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab2">Round2</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="tab1">
                <Box sx={classes.box}>
                  <Box sx={classes.details}>
                    <Button
                      variant="contained"
                      color="info"
                      style={classes.button}
                    >
                      Match 1
                    </Button>

                    <Typography variant="h5" style={{ color: 'yellow' }}>
                      Sunday, 4th Feb 2022
                    </Typography>
                    <Typography variant="h5" style={{ color: 'yellow' }}>
                      4:00 PM
                    </Typography>

                    <Button
                      variant="contained"
                      style={classes.button}
                      size="lg"
                    >
                      Ground : Ranbhumi
                    </Button>
                  </Box>
                  <Card style={classes.card}>
                    <Avatar
                      className="center"
                      src={`anupama-shamshers.jfif`}
                      sx={classes.avatar}
                    />
                    <Typography variant="h5">North Star Smashers</Typography>
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
                      src={`spartans- Shinja.jpg`}
                      sx={classes.avatar}
                    />

                    <Typography variant="h5">Nort Star Spartans</Typography>
                  </Card>
                </Box>

                <Box sx={classes.box}>
                  <Box sx={classes.details}>
                    <Button
                      variant="contained"
                      color="info"
                      style={classes.button}
                    >
                      Match 1
                    </Button>

                    <Typography variant="h5" style={{ color: 'yellow' }}>
                      Sunday, 4th Feb 2022
                    </Typography>
                    <Typography variant="h5" style={{ color: 'yellow' }}>
                      4:00 PM
                    </Typography>

                    <Button
                      variant="contained"
                      style={classes.button}
                      size="lg"
                    >
                      Ground : Ranbhumi
                    </Button>
                  </Box>
                  <Card style={classes.card}>
                    <Avatar
                      className="center"
                      src={`anupama-shamshers.jfif`}
                      sx={classes.avatar}
                    />
                    <Typography variant="h5">North Star Smashers</Typography>
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
                      src={`spartans- Shinja.jpg`}
                      sx={classes.avatar}
                    />

                    <Typography variant="h5">Nort Star Spartans</Typography>
                  </Card>
                </Box>
              </Tab.Pane>
              <Tab.Pane eventKey="tab2"></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default Fixtures
