import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

import EntityContext from '../store/entity-context'
import IncrementDecrement from './IncrementDecrement'
import CircleTimer from './CircleTimer'
import Image from 'react-bootstrap/Image'
import './overview.css'

import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab'

// reactstrap components
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

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const socket = io(BASE_URL)

// constants
const BASE_PRICE = 1000

const Accountdetail = (props) => {
  const { id } = useParams()
  const entityCtx = useContext(EntityContext)
  const accounts = entityCtx.accounts
  const teams = entityCtx.teams
  const players = entityCtx.players

  console.log('entities', entityCtx)

  const account = accounts.find((account) => account._id === id)
  const accountTeams = teams
    ? teams.filter((team) => team.accountId._id === id)
    : []
  const accountPlayers = players
    ? players.filter((player) => player.accountId._id === id)
    : []

  const teamOwners = teams
    .filter((team) => team.teamOwner)
    .map((team) => team.teamOwner.playerId)

  const teamOwnerIds = teamOwners.map((to) => to._id)

  const soldPlayers = accountPlayers.filter(
    (player) => player.auctionStatus && player.auctionStatus === 'SOLD'
  )
  const unsoldPlayers = accountPlayers.filter(
    (player) => player.auctionStatus && player.auctionStatus === 'UNSOLD'
  )

  const topBuys = [...soldPlayers]
    .sort(
      (a, b) => a.lastBid && b.lastBid && a.lastBid.amount > b.lastBid.amount
    )
    .slice(0, 2)

  const teamStats = []
  for (let team of accountTeams) {
    const teamId = team._id
    const teamPlayers = accountPlayers.filter(
      (player) => player.teamId && player.teamId._id === teamId
    )
    const totalCount = teamPlayers.length
    let batsmanCount = 0
    let bowlerCount = 0
    let allrounderCount = 0
    teamPlayers.forEach((player) => {
      if (!player.skill) return
      switch (player.skill.toLowerCase()) {
        case 'batsman':
          batsmanCount++
          break
        case 'bowler':
          batsmanCount++
          break
        case 'all rounder':
          allrounderCount++
          break
      }
    })
    teamStats.push({
      id: teamId,
      name: team.name,
      imageUrl: team.imageUrl,
      totalCount,
      batsmanCount,
      bowlerCount,
      allrounderCount,
    })
  }
  console.log('teamstats', teamStats)

  return (
    account && (
      <div className="content mainContent container">
        <h1 style={{ textTransform: 'uppercase', marginTop: '30px' }}>
          {account.name}
        </h1>
        <Tab.Container id="left-tabs-example" defaultActiveKey="tab1">
          <Row>
            <Nav
              fill
              variant="pills"
              className=""
              style={{ flex: 'auto', marginBottom: '40px' }}
            >
              <Nav.Item>
                <Nav.Link eventKey="tab1">TEAMS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab2">PLAYERS</Nav.Link>
              </Nav.Item>
              {account.isAuctioned && (
                <React.Fragment>
                  <Nav.Item>
                    <Nav.Link eventKey="tab3">SOLD PLAYERS</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab4">UNSOLD</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab5">TOP BUYS</Nav.Link>
                  </Nav.Item>
                </React.Fragment>
              )}
            </Nav>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="tab1">
                  <Row md="12">
                    {teamStats.map((team) => (
                      <Col md="4">
                        <Card
                          style={{
                            width: '18rem',
                          }}
                        >
                          <div className="accountImage">
                            <Image
                              rounded="true"
                              roundedCircle="true"
                              alt="Sample"
                              src={`${BASE_URL}/${team.imageUrl}`}
                              style={{ width: '14rem', height: '14rem' }}
                            />
                          </div>
                          <CardBody>
                            <CardTitle
                              tag="h5"
                              className="accountTitle"
                              style={{ textTransform: 'uppercase' }}
                            >
                              {team.name}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                              Player Count
                            </CardSubtitle>
                            <CardText className="playerCount">
                              {team.totalCount}
                            </CardText>
                            <div className="pointSection">
                              <div className="point-div">
                                <div className="pointText">Batsman</div>
                                <div className="pointCircle">
                                  {team.batsmanCount}
                                </div>
                              </div>
                              <div className="point-div">
                                <div className="pointText">Bowler</div>
                                <div className="pointCircle">
                                  {team.bowlerCount}
                                </div>
                              </div>
                              <div className="point-div">
                                <div className="pointText">All Rounder</div>
                                <div className="pointCircle">
                                  {team.allrounderCount}
                                </div>
                              </div>
                            </div>
                            <a href={`/squaddetail/${team.id}`}>
                              <Button>Team Details</Button>
                            </a>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                {/* players to be auctioned */}
                <Tab.Pane eventKey="tab2">
                  <Table
                    striped
                    hover
                    variant="dark"
                    style={{ border: '0.1rem solid #e3e3e3' }}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th>Player Name</th>
                        <th>Team</th>
                        <th>Skill</th>
                        <th>Rating</th>
                        <th>Base Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accountPlayers.map((player) => (
                        <tr>
                          <td>
                            <Image
                              rounded="true"
                              roundedCircle="true"
                              alt="Sample"
                              src={`${BASE_URL}/${player.imageUrl}`}
                              style={{ width: '4rem', height: '4rem' }}
                            />
                          </td>
                          <td>{player.name}</td>
                          <td>{player.teamId && player.teamId.name}</td>
                          <td>{player.skill}</td>
                          <td>{player.rating}</td>
                          <td>{BASE_PRICE}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
                {/* sold players */}
                <Tab.Pane eventKey="tab3">
                  <Table
                    striped
                    hover
                    variant="dark"
                    style={{ border: '0.1rem solid #e3e3e3' }}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th>Player Name</th>
                        <th>Team</th>
                        <th>Skill</th>
                        <th>Rating</th>
                        <th>Sold at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {soldPlayers.map((player) => (
                        <tr>
                          <td>
                            <Image
                              rounded="true"
                              roundedCircle="true"
                              alt="Sample"
                              src={`${BASE_URL}/${player.imageUrl}`}
                              style={{ width: '4rem', height: '4rem' }}
                            />
                          </td>
                          <td>{player.name}</td>
                          <td>{player.teamId && player.teamId.name}</td>
                          <td>{player.skill}</td>
                          <td>{player.rating}</td>
                          <td>
                            {player.lastBid ? player.lastBid.amount : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
                {/* unsold players */}
                <Tab.Pane eventKey="tab4">
                  <Table
                    striped
                    hover
                    variant="dark"
                    style={{ border: '0.1rem solid #e3e3e3' }}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th>Player Name</th>
                        <th>Skill</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unsoldPlayers.map((player) => (
                        <tr>
                          <td>
                            <Image
                              rounded="true"
                              roundedCircle="true"
                              alt="Sample"
                              src={`${BASE_URL}/${player.imageUrl}`}
                              style={{ width: '4rem', height: '4rem' }}
                            />
                          </td>
                          <td>{player.name}</td>
                          <td>{player.skill}</td>
                          <td>{player.rating}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
                {/*  Top buys */}
                <Tab.Pane eventKey="tab5">
                  <Table
                    striped
                    hover
                    variant="dark"
                    style={{ border: '0.1rem solid #e3e3e3' }}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th>Player Name</th>
                        <th>Team</th>
                        <th>Skill</th>
                        <th>Rating</th>
                        <th>Sold At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topBuys.map((player) => (
                        <tr>
                          <td>
                            <Image
                              rounded="true"
                              roundedCircle="true"
                              alt="Sample"
                              src={`${BASE_URL}/${player.imageUrl}`}
                              style={{ width: '4rem', height: '4rem' }}
                            />
                          </td>
                          <td>{player.name}</td>
                          <td>{player.teamId && player.teamId.name}</td>
                          <td>{player.skill}</td>
                          <td>{player.rating}</td>
                          <td>{player.lastBid && player.lastBid.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  )
}

export default Accountdetail
