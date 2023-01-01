import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

import EntityContext from '../store/entity-context'
import IncrementDecrement from './IncrementDecrement'
import CircleTimer from './CircleTimer'
import Image from 'react-bootstrap/Image'
import './overview.css'
import Avatar from '@mui/material/Avatar'

import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab'
import './auction.css'


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

const TeamDetail = (props) => {
  const { id } = useParams()
  const entityCtx = useContext(EntityContext)
  const teams = entityCtx.teams
  const players = entityCtx.players

  console.log('entities', entityCtx)
  const teamStats = []
  for (let team of teams) {
    const teamId = team._id
    const teamPlayers = players.filter(
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

  return (
    teams &&
    players && (
        <div
        className="content mainContent container-fluid"
    >
        <h1>ICL Teams List</h1>
        <div
          className="squadSection row"
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          {teamStats.map((team) => (
            <Card
              style={{
                width: '21rem',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
              className="card-user minheight"
            >
              <div className="accountImage author">
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                <Avatar
                  className="center"
                  alt={team.name}
                  src={`${BASE_URL}/${team.imageUrl}`}
                  sx={{ width: 200, height: 200,fontSize:"5rem"}}
                />
              </div>
              <CardBody className="minheight">
                <CardTitle
                  tag="h5"
                  className="playerName"
                  style={{ fontWeight: 'bold' }}
                >
                  {team.name}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Player Count
                </CardSubtitle>
                <CardText className="playerCount">{team.totalCount}</CardText>
                {/* <div className="playerSummary" style={{ alignContent: 'left' }}>
                  <h4>
                    Batsman <span>{team.batsmanCount}</span>
                  </h4>
                  <h4>
                    Bowlers <span>{team.bowlerCount}</span>
                  </h4>
                  <h4>
                    All Rounders <span>{team.allrounderCount}</span>
                  </h4>
                </div> */}
                 <div className="pointSection">
                        <div className="point-div">
                          <div className="pointText">Batsman</div>
                          <div className="pointCircle">{team.batsmanCount}</div>
                        </div>
                        <div className="point-div">
                          <div className="pointText">Bowler</div>
                          <div className="pointCircle">{team.bowlerCount}</div>
                        </div>
                        <div className="point-div">
                          <div className="pointText">All Rounder</div>
                          <div className="pointCircle">{team.allrounderCount}</div>
                        </div>
                      </div>
                <a href={`/squaddetail/${team.id}`}>
                  <Button>Team Details</Button>
                </a>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    )
  )
}

export default TeamDetail
