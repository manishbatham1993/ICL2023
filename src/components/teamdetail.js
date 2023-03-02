import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import EntityContext from '../store/entity-context'
import './overview.css'
import './Auction/auction.css'
import Avatar from '@mui/material/Avatar'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
} from 'reactstrap'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const TeamDetail = (props) => {
  const entityCtx = useContext(EntityContext)
  const teams = entityCtx.teams
  const players = entityCtx.players

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
      <div className="content mainContent container-fluid">
        <h1 style={{ marginTop: '30px' }}>ICL TEAMS</h1>
        <div
          className="squadSection row"
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          {teamStats.map((team, i) => (
            <Card
              key={i}
              style={{
                width: '21rem',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
              className="card-user minheight"
            >
              <div className="accountImage author" style={{ marginTop: 0 }}>
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                <Avatar
                  className="center"
                  alt={team.name}
                  src={`${BASE_URL}/${team.imageUrl}`}
                  sx={{ width: 200, height: 200, fontSize: '5rem' }}
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
                <Link to={`/squaddetail/${team.id}`}>
                  <Button>Team Details</Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    )
  )
}

export default TeamDetail
