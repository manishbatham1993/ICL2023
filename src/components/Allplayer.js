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
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const searchItems = (searchValue) => {
    // console.log(searchValue)
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = rows.filter((item) => {
        return Object.values(item.name)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
  }

  return (
    <div className="content mainContent container-fluid">
      <Row style={{ marginTop: '30px' }}>
        <Col sm="12" lg="10" md="10">
          <h1
            style={{
              marginLeft: '20%',
            }}
          >
            ICL PLAYERS
          </h1>
        </Col>
        <Col sm="12" lg="2" md="2">
          <input
            className="searchbox"
            type="search"
            onChange={(e) => searchItems(e.target.value)}
            placeholder="Search..."
          />
        </Col>
      </Row>
      <div
        className="squadSection row"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {searchInput.length > 1 ? (
          filteredResults
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((player) => {
              return (
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
                    {player.imageUrl ? (
                      <Avatar
                        className="center"
                        alt={player.name}
                        src={`${BASE_URL}/${player.imageUrl}`}
                        sx={{ width: 200, height: 200, fontSize: '5rem' }}
                      />
                    ) : (
                      <Avatar
                        className="center"
                        alt={player.name}
                        src={`${BASE_URL}/${player.imageUrl}`}
                        sx={{ width: 200, height: 200, fontSize: '5rem' }}
                      />
                    )}
                  </div>
                  <CardBody className="minheight">
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
                      {/* {player.teamId && player.teamId.name} */}
                      {player.accountId.name}
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
              )
            })
        ) : (
          <div
            className="squadSection row"
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            {rows
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((player) => (
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
                    {player.imageUrl ? (
                      <Avatar
                        className="center"
                        alt={player.name}
                        src={`${BASE_URL}/${player.imageUrl}`}
                        sx={{ width: 200, height: 200, fontSize: '5rem' }}
                      />
                    ) : (
                      <Avatar
                        className="center"
                        alt={player.name}
                        src={`${BASE_URL}/${player.imageUrl}`}
                        sx={{ width: 200, height: 200, fontSize: '5rem' }}
                      />
                    )}
                  </div>
                  <CardBody className="minheight">
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
                      {/* {player.teamId && player.teamId.name} */}
                      {player.accountId.name}
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
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Allplayer
