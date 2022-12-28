import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

import EntityContext from '../store/entity-context'
import IncrementDecrement from './IncrementDecrement'
import CircleTimer from './CircleTimer'
import Image from 'react-bootstrap/Image'
import './overview.css'
import './squaddetails.css'

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
const DEFAULT_BID_INCREASE = 100
const BASE_PRICE = 1000
const TEAM_ID = '639d4a67ddfe568981cf801d'

const Squaddetail = () => {
  const { id } = useParams()
  const entityCtx = useContext(EntityContext)
  const accounts = entityCtx.accounts
  const teams = entityCtx.teams
  const players = entityCtx.players

  const teamPlayers = players.filter(
    (player) => player.teamId && player.teamId._id === id
  )

  return (
    <div
      className="content mainContent container"
      style={{ minHeight: '200vh' }}
    >
      <h1>ICL SQUAD</h1>
      <div
        className="squadSection"
        style={{
          display: 'grid',
          columnGap: '1rem',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        {teamPlayers.map((player) => (
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
              <div className="block block-four" />
              <Image
                rounded="true"
                roundedCircle="true"
                alt="Sample"
                src={`${BASE_URL}/${player.imageUrl}`}
                style={{ width: '8rem', height: '8rem' }}
              />
            </div>
            <CardBody>
              <CardTitle
                tag="h5"
                className="playerName"
                style={{ fontWeight: 'bold' }}
              >
                {player.name}
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {player.teamId && player.teamId.name}
              </CardSubtitle>
              <div style={{ marginTop: '10px' }}>
                <Button className='btn-primary'>{player.skill}</Button>
                <Button className='btn-success'>{player.rating}</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Squaddetail
