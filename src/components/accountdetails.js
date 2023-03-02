import React, { useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import EntityContext from '../store/entity-context'
import './overview.css'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab'
import Avatar from '@mui/material/Avatar'
import SortIcon from '@mui/icons-material/Sort'

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardText,
  CardSubtitle,
} from 'reactstrap'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

// constants
const BASE_PRICE = 5000
const string_text = 'Data Will be available soon...'
const Accountdetail = (props) => {
  const { id } = useParams()
  const entityCtx = useContext(EntityContext)
  const accounts = entityCtx.accounts
  const teams = entityCtx.teams
  const players = entityCtx.players
  const account = accounts.find((account) => account._id === id)
  const accountTeams = teams
    ? teams.filter((team) => team.accountId._id === id)
    : []

  var accountPlayers
  accountPlayers = players
    ? players.filter((player) => player.accountId._id === id)
    : []

  accountPlayers.forEach(function (player) {
    player.teamname =
      player.teamId && player.teamId.name ? player.teamId.name : '-'
  })

  const teamOwners = teams
    .filter((team) => team.teamOwner)
    .map((team) => team.teamOwner.playerId)

  const soldPlayers = accountPlayers.filter(
    (player) => player.auctionStatus && player.auctionStatus === 'SOLD'
  )
  const unsoldPlayers = accountPlayers.filter(
    (player) => !player.auctionStatus || player.auctionStatus === 'UNSOLD'
  )
  const topBuys = [...soldPlayers]
    .filter((player) => player.lastBid && player.lastBid.amount)
    .sort((a, b) =>
      a.lastBid.amount &&
      b.lastBid.amount &&
      a.lastBid.amount < b.lastBid.amount
        ? 1
        : -1
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
  const [order, setorder] = useState('ASC')
  const [sortdata, setsortdata] = useState()

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...accountPlayers].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      )
      setsortdata(sorted)
      setorder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...accountPlayers].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      )
      setsortdata(sorted)
      setorder('ASC')
    }
  }
  return (
    account && (
      <div className="content mainContent container">
        <h1 style={{ textTransform: 'uppercase', marginTop: '30px' }}>
          {account.name}
        </h1>
        <Tab.Container id="left-tabs-example" defaultActiveKey="tab2">
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
              {/* {account.isAuctioned && ( */}
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
              {/* )} */}
            </Nav>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="tab1">
                  <Row md="12">
                    {teamStats.length != 0 ? (
                      teamStats.map((team, i) => (
                        <Col md="4" key={i}>
                          <Card
                            style={{
                              width: '18rem',
                            }}
                          >
                            <div className="accountImage">
                              <Avatar
                                className="center"
                                alt={team.name}
                                src={`${BASE_URL}/${team.imageUrl}`}
                                sx={{
                                  width: 200,
                                  height: 200,
                                  fontSize: '5rem',
                                }}
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
                              <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                              >
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
                              <Link to={`/squaddetail/${team.id}`}>
                                <Button>Team Details</Button>
                              </Link>
                            </CardBody>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <div className="string_text">{string_text}</div>
                    )}
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
                        <th onClick={() => sorting('name')}>
                          <SortIcon></SortIcon>Player Name
                        </th>
                        <th onClick={() => sorting('teamname')}>
                          <SortIcon></SortIcon>Team
                        </th>
                        <th onClick={() => sorting('gender')}>
                          <SortIcon></SortIcon>Gender
                        </th>
                        <th onClick={() => sorting('skill')}>
                          <SortIcon></SortIcon>Skill
                        </th>
                        <th onClick={() => sorting('rating')}>
                          <SortIcon></SortIcon>Rating
                        </th>
                        <th>Base Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(sortdata ? sortdata : accountPlayers).map((player) => (
                        <tr key={player?._id}>
                          <td>
                            {player.imageUrl ? (
                              <Avatar
                                className="center"
                                alt={player.name}
                                src={`${BASE_URL}/${player.imageUrl}`}
                                sx={{
                                  width: 75,
                                  height: 75,
                                  fontSize: '1rem',
                                }}
                              />
                            ) : (
                              <Avatar
                                className="center"
                                alt={player.name}
                                src={`${BASE_URL}/static/account_logo/default.png`}
                                sx={{
                                  width: 75,
                                  height: 75,
                                  fontSize: '1rem',
                                }}
                              />
                            )}
                          </td>
                          <td>{player.name}</td>
                          <td>
                            {player.teamId && player.teamId.name
                              ? player.teamId && player.teamId.name
                              : '-'}
                          </td>

                          <td>{player.gender}</td>
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
                    {soldPlayers.length != 0 ? (
                      <thead>
                        <tr>
                          <th></th>
                          <th>Player Name</th>
                          <th>Team</th>
                          <th>Gender</th>
                          <th>Skill</th>
                          <th>Rating</th>
                          <th>Sold at</th>
                        </tr>
                      </thead>
                    ) : (
                      ''
                    )}
                    <tbody>
                      {soldPlayers.length != 0 ? (
                        soldPlayers.map((player) => (
                          <tr key={player?._id}>
                            <td>
                              {player.imageUrl ? (
                                <Avatar
                                  className="center"
                                  alt={player.name}
                                  src={`${BASE_URL}/${player.imageUrl}`}
                                  sx={{
                                    width: 75,
                                    height: 75,
                                    fontSize: '1rem',
                                  }}
                                />
                              ) : (
                                <Avatar
                                  className="center"
                                  alt={player.name}
                                  src={`${BASE_URL}/static/account_logo/default.png`}
                                  sx={{
                                    width: 75,
                                    height: 75,
                                    fontSize: '1rem',
                                  }}
                                />
                              )}
                            </td>
                            <td>{player.name}</td>
                            <td>
                              {player.teamId && player.teamId.name
                                ? player.teamId && player.teamId.name
                                : '-'}
                            </td>
                            <td>{player.gender}</td>

                            <td>{player.skill}</td>
                            <td>{player.rating}</td>
                            <td>
                              {player.lastBid ? player.lastBid.amount : null}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div className="string_text">{string_text}</div>
                      )}
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
                    {unsoldPlayers.length != 0 ? (
                      <thead>
                        <tr>
                          <th></th>
                          <th>Player Name</th>
                          <th>Gender</th>

                          <th>Skill</th>
                          <th>Rating</th>
                        </tr>
                      </thead>
                    ) : (
                      ''
                    )}
                    <tbody>
                      {unsoldPlayers.length != 0 ? (
                        unsoldPlayers.map((player) => (
                          <tr key={player?._id}>
                            <td>
                              {player.imageUrl ? (
                                <Avatar
                                  className="center"
                                  alt={player.name}
                                  src={`${BASE_URL}/${player.imageUrl}`}
                                  sx={{
                                    width: 75,
                                    height: 75,
                                    fontSize: '1rem',
                                  }}
                                />
                              ) : (
                                <Avatar
                                  className="center"
                                  alt={player.name}
                                  src={`${BASE_URL}/static/account_logo/default.png`}
                                  sx={{
                                    width: 75,
                                    height: 75,
                                    fontSize: '1rem',
                                  }}
                                />
                              )}
                            </td>
                            <td>{player.name}</td>
                            <td>{player.gender}</td>

                            <td>{player.skill}</td>
                            <td>{player.rating}</td>
                          </tr>
                        ))
                      ) : (
                        <div className="string_text">{string_text}</div>
                      )}
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
                    {topBuys.length != 0 ? (
                      <thead>
                        <tr>
                          <th></th>
                          <th>Player Name</th>
                          <th>Team</th>
                          <th>Gender</th>
                          <th>Skill</th>
                          <th>Rating</th>
                          <th>Sold At</th>
                        </tr>
                      </thead>
                    ) : (
                      ''
                    )}
                    <tbody>
                      {topBuys.length != 0 ? (
                        topBuys.map((player) => (
                          <tr key={player?._id}>
                            <td>
                              {player.imageUrl ? (
                                <Avatar
                                  className="center"
                                  alt={player.name}
                                  src={`${BASE_URL}/${player.imageUrl}`}
                                  sx={{
                                    width: 75,
                                    height: 75,
                                    fontSize: '1rem',
                                  }}
                                />
                              ) : (
                                <Avatar
                                  className="center"
                                  alt={player.name}
                                  src={`${BASE_URL}/static/account_logo/default.png`}
                                  sx={{
                                    width: 75,
                                    height: 75,
                                    fontSize: '1rem',
                                  }}
                                />
                              )}
                            </td>
                            <td>{player.name}</td>
                            <td>{player.teamId && player.teamId.name}</td>
                            <td>{player.gender}</td>
                            <td>{player.skill}</td>
                            <td>{player.rating}</td>
                            <td>{player.lastBid && player.lastBid.amount}</td>
                          </tr>
                        ))
                      ) : (
                        <div className="string_text">{string_text}</div>
                      )}
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
