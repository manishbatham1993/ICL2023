import React, { useState, useEffect, useContext } from 'react'
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

const Allplayer = () => {
  const entityCtx = useContext(EntityContext)
  const rows = entityCtx.players

  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = rows.filter((item) => {
        return Object.values(item.name)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
  }

  return (
    <div className="content mainContent container-fluid">
      <Row style={{ marginTop: '30px', marginLeft: 0, marginRight: 0 }}>
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
        // className="squadSection row"
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
                  key={player?._id}
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
                        src={'static/account_logo/default.png'}
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
                  key={player?._id}
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
                        src={'static/account_logo/default.png'}
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
