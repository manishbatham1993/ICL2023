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
import Avatar from '@mui/material/Avatar'

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
const Allplayer = () => {
  const [rows, setRows] = React.useState([])

  function get_data() {
    const api = BASE_URL + '/api/v1/player'
    axios.get(api, {}).then((res) => {
      console.log('data', res.data.players)
      setRows(res.data.players)
      // console.log(rows);
    })
  }
  React.useEffect(() => {
    get_data()
  }, [])

  return (
    <div className="content mainContent container-fluid">
      <h1 style={{ marginTop: '30px' }}>ICL PLAYERS</h1>
      <div
        className="squadSection row"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {rows.map((player) => (
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
                alt={player.name}
                src={`${BASE_URL}/${player.imageUrl}`}
                sx={{ width: 200, height: 200, fontSize: '5rem' }}
              />
            </div>
            <CardBody className="minheight">
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
                <Button className="btn-primary">{player.skill}</Button>
                <Button className="btn-success">{player.rating}</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Allplayer
