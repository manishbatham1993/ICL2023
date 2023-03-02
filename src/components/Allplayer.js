import React, { useState, useEffect, useContext, useCallback } from 'react'
import EntityContext from '../store/entity-context'
import { createDebounceFunction } from '../utils/searchOptimization'

import './overview.css'
import './squaddetails.css'
import Avatar from '@mui/material/Avatar'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

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

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const ITEMS_PER_PAGE = 20

const Allplayer = () => {
  const entityCtx = useContext(EntityContext)
  const { players } = entityCtx

  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageData, setCurrentPageData] = useState([])

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  // setting filtered data to players data at initial
  useEffect(() => {
    setFilteredData(players)
  }, [players])

  // setting page data on changing page
  useEffect(() => {
    if (filteredData.length === 0) return
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE
    setCurrentPageData(filteredData.slice(firstPageIndex, lastPageIndex))
  }, [filteredData, currentPage])

  // function to set filteredata on changing input
  const searchPlayerHandler = useCallback(
    createDebounceFunction((searchInput) => {
      // resetting page to 1
      setCurrentPage(1)
      // if user typed less than 3 chars then show all results
      if (searchInput.length < 3) {
        setFilteredData(players)
        return
      }
      // otherwise show filtered results
      const filteredData = players.filter((player) =>
        player.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      setFilteredData(filteredData)
    }),
    [createDebounceFunction, players]
  )

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
          {/* <input
            className="searchbox"
            type="search"
            onInput={(e) => {
              searchPlayerHandler(e.target?.value)
            }}
            placeholder="Search..."
          /> */}
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 200,
            }}
            onSubmit={(e) => {
              e.preventDefault()
              console.log(e.target)
              console.log('pulkit')
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'filter' }}
              onChange={(e) => {
                searchPlayerHandler(e.target.value)
              }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Col>
      </Row>
      <Pagination
        sx={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaginationItem-root': {
            color: 'white',
            marginRight: 1,
            '&.Mui-selected': {
              backgroundColor: 'white',
              color: 'black',
            },
            '&.Mui-selected:hover': {
              backgroundColor: 'white',
            },
          },
        }}
        count={totalPages}
        page={currentPage}
        onChange={(event, pageNumber) => {
          setCurrentPage(pageNumber)
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <div
          className="squadSection row"
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          {currentPageData.map((player) => (
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
      </div>
    </div>
  )
}

export default Allplayer
