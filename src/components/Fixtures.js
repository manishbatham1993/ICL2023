import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import EntityContext from '../store/entity-context'
import './overview.css'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab'
import Avatar from '@mui/material/Avatar'
// reactstrap components
import './Fixtures.css'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import SortIcon from '@mui/icons-material/Sort'

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Row,
  Col,
  UncontrolledTooltip,
  CardText,
  CardFooter,
  Badge,
  Progress,
  CardSubtitle,
  image,
} from 'reactstrap'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
function Fixtures() {
  const [round, setRound] = useState()

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="tab1">
      <Row>
        <Nav
          fill
          variant="pills"
          classNameName=""
          style={{ flex: 'auto', marginBottom: '40px' }}
        >
          {/* {round.length != 0 && */}
          {/* round.map((item) => ( */}
          <Nav.Item>
            {/* <Nav.Link eventKey="tab1">{item.id}</Nav.Link> */}
            <Nav.Link eventKey="tab1">Round1</Nav.Link>
            {/* <Nav.Link eventKey="tab2">Round2</Nav.Link> */}
          </Nav.Item>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="tab1">
                  <Row md="12">
                    {/* <Col md="4"> */}
                    <div
                      className="matchdetails card-width"
                      data-country="Chennai Super Kings, Kolkata Knight Riders"
                      data-venue="Wankhede Stadium, Mumbai"
                    >
                      <div className="match-teams">Sat, 4 FEB 2023</div>
                      <div className="match-venue">Ranbhumi Cricket Ground</div>
                      <div className="match-meta">Match 1 -9:00 IST</div>
                      <div className="match-teams">
                        FORTRA RIDERS VS FORTRA SUPERNOVAS
                      </div>
                      <div className="div-text">
                        <div style={{ display: 'contents' }}>
                          <Avatar
                            className="center"
                            alt={'teamname'}
                            // src={`${BASE_URL}/${team.imageUrl}`}
                            src={''}
                            sx={{
                              width: 50,
                              height: 50,
                              fontSize: '5rem',
                            }}
                          />
                          FORTRA RIDERS
                        </div>
                        <div className="circle-text">V/S</div>
                        <div style={{ display: 'contents' }}>
                          <Avatar
                            className="center"
                            alt={'teamname'}
                            // src={`${BASE_URL}/${team.imageUrl}`}
                            src={''}
                            sx={{
                              width: 50,
                              height: 50,
                              fontSize: '5rem',
                            }}
                          />
                          FORTRA SUPERNOVAS
                        </div>
                      </div>
                    </div>
                    {/* </Col> */}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
          {/* ))} */}
        </Nav>
      </Row>
    </Tab.Container>
  )
}

export default Fixtures
