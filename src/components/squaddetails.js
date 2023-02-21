import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import EntityContext from '../store/entity-context'
import './overview.css'
import './squaddetails.css'
import Avatar from '@mui/material/Avatar'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardSubtitle,
} from 'reactstrap'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const Squaddetail = () => {
  const { id } = useParams()
  const entityCtx = useContext(EntityContext)
  const teams = entityCtx.teams
  const players = entityCtx.players

  const teamPlayers = players.filter(
    (player) => player.teamId && player.teamId._id === id
  )
  return (
    <div className="content mainContent container">
      <h1 style={{ marginTop: '30px', textTransform: 'uppercase' }}>
        {teamPlayers[0] && teamPlayers[0].teamId.name
          ? teamPlayers[0].teamId.name + ' SQUAD'
          : 'ICL SQUAD'}
      </h1>

      <Row style={{ justifyContent: 'space-evenly' }}>
        {teamPlayers.map((player) => (
          <Col key={player?._id}>
            <Card
              style={{
                width: '21rem',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
              className="card-user"
            >
              <div className="accountImage author">
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                {player.isCaptain ? (
                  <button
                    className="btn-icon btn-round btn-success"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      padding: '6px 12px',
                      fontWeight: '700',
                      fontSize: '16px',
                    }}
                  >
                    C
                  </button>
                ) : (
                  ''
                )}
                <div className="block block-four" />

                {player.imageUrl ? (
                  <Avatar
                    className="center"
                    alt={player.name}
                    src={`${BASE_URL}/${player.imageUrl}`}
                    sx={{
                      width: 200,
                      height: 200,
                      fontSize: '5rem',
                    }}
                  />
                ) : (
                  <Avatar
                    className="center"
                    alt={player.name}
                    src={`${BASE_URL}/static/account_logo/default.png`}
                    sx={{
                      width: 200,
                      height: 200,
                      fontSize: '5rem',
                    }}
                  />
                )}
              </div>
              <CardBody style={{ minHeight: 0 }}>
                <CardTitle
                  tag="h5"
                  className="playerName"
                  style={{ fontWeight: 'bold' }}
                >
                  {player.name}
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                  style={{ fontSize: '15px' }}
                >
                  {player.teamId && player.teamId.name}
                </CardSubtitle>
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div>
                    <p>SKILL</p>
                    <Button
                      className="btn-primary"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {player.skill}
                    </Button>
                  </div>
                  <div>
                    <p>RATING</p>
                    <Button
                      className="btn-success"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {player.rating}
                    </Button>
                  </div>
                </div>
                <Button
                  className="btn-info"
                  style={{ textTransform: 'uppercase' }}
                >
                  LEVEL : {player.level}
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default Squaddetail
