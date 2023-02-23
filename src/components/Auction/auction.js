import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import AuthContext from '../../store/auth-context'
import EntityContext from '../../store/entity-context'
import IncrementDecrement from './IncrementDecrement'
import CircleTimer from '../CircleTimer'
import './auction.css'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Avatar from '@mui/material/Avatar'
import Showmodal from '../popmodal'
import IconButton from '@mui/material/IconButton'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'

// reactstrap components
import { Button, CardHeader, CardBody, CardTitle } from 'reactstrap'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const socket = io(BASE_URL)
const COLORS = [
  { c1: '#0078BC', c2: '#17479E' },
  { c1: '#1C1C1C', c2: '#0B4973' },
  { c1: '#D71920', c2: '#84171B' },
  { c1: '#FCCA06', c2: '#F25C19' },
  { c1: '#1C1C1C', c2: '#0B4973' },
  { c1: '#D71920', c2: '#84171B' },
  { c1: '#EA1A85', c2: '#001D48' },
  { c1: '#6A6A6A', c2: '#1C1C1C' },
  { c1: '#F26522', c2: '#ED1A37' },
  { c1: '#A72056', c2: '#FFCC00' },
]

// AUCTION_SCHEMA :
//   state: (null/'ready'/'progress'/'completed'/'pause')
//   round: <roundNumber>
//   accountId: null,
//   teams: [<teamId>],
//   budget: {teamId: <budget>}
//   remainingPlayers : [<playerId>]
//   unsoldPlayers: [<playerId>]
//   soldPlayers: [<playerId>],
//   playerLastBid: {playerId: <bidData> } // bidData: {teamId, amount, timestamp}
//   currentPlayer: {
//     id : <playerId>
//     bidAmount: <currentAmount>
//     bids : [<bidData>]
//     clock: <clock>
//   }
//   prevPlayer: <id>

const Auction = () => {
  const authCtx = useContext(AuthContext)
  const entityCtx = useContext(EntityContext)

  const { DEFAULT_BID_AMOUNT, BID_INCREASE, PLAYERS_PER_TEAM } =
    entityCtx.configurations
  const TEAM_ID = authCtx.user ? authCtx.user.teamId : null
  const CURRENT_TEAM =
    entityCtx && entityCtx.teams && TEAM_ID
      ? entityCtx.teams.find((team) => team._id === TEAM_ID)
      : null
  const OWNER_IS_PLAYING =
    CURRENT_TEAM && CURRENT_TEAM.teamOwner && CURRENT_TEAM.teamOwner.isPlaying
      ? true
      : false

  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [auctionData, setAuctionData] = useState()
  const [mappedData, setMappedData] = useState()
  const [nextBidAmount, setNextBidAmount] = useState()
  const [auctionEnded, setAuctionEnded] = useState(false)
  const [playerStatus, setPlayerStatus] = useState()
  const [previousPlayerData, setPreviousPlayerData] = useState([])
  const [roundEnd, setRoundEnd] = useState(false)
  const [roundEndcount, setRoundEndcount] = useState()
  const [openSnackbar, setOpenSnackbar] = useState(true)
  const [vertical, setVertical] = useState('top')
  const [horizontal, setHorizontal] = useState('center')
  const [completedflag, setCompletedFlag] = useState(false)

  const remainingPlayers =
    mappedData &&
    mappedData.teamStats &&
    mappedData.teamStats[TEAM_ID] &&
    !isNaN(PLAYERS_PER_TEAM)
      ? PLAYERS_PER_TEAM -
        mappedData.teamStats[TEAM_ID].total -
        (OWNER_IS_PLAYING ? 1 : 0)
      : null

  const getMaxAllowableBid = () => {
    // base amount should be reserved for all remaining players excluding current plyer i.e [(remainingPlayers minus 1 ) times BASE-AMOUNT]
    if (!mappedData || isNaN(remainingPlayers) || isNaN(DEFAULT_BID_AMOUNT)) {
      return Number.MAX_SAFE_INTEGER
    }
    return mappedData.remBudget - (remainingPlayers - 1) * DEFAULT_BID_AMOUNT
  }

  function setChanged() {
    setRoundEnd(false)
    setAuctionEnded(false)
  }
  const canBid =
    TEAM_ID &&
    mappedData &&
    mappedData.state === 'progress' &&
    mappedData.remBudget >= nextBidAmount &&
    remainingPlayers > 0 &&
    (!nextBidAmount || nextBidAmount <= getMaxAllowableBid()) &&
    (!mappedData.lastBid || mappedData.lastBid.teamId !== TEAM_ID)

  // set default amount for upcoming bid
  const defaultNextBidAmount =
    auctionData && auctionData.currentPlayer
      ? auctionData.currentPlayer.bidAmount
      : null

  useEffect(() => {
    setNextBidAmount(defaultNextBidAmount)
  }, [defaultNextBidAmount])

  const updateMappedData = () => {
    const clock = auctionData.currentPlayer
      ? auctionData.currentPlayer.clock
      : null
    const remBudget = auctionData.budget[TEAM_ID]
    const playerObj = auctionData.currentPlayer
      ? players.find((player) => player._id === auctionData.currentPlayer.id)
      : null
    const currentPlayer = playerObj
      ? {
          name: playerObj.name,
          rating: playerObj.rating,
          skill: playerObj.skill,
          level: playerObj.level,
          image: playerObj.imageUrl,
        }
      : null
    const bidAmount = auctionData.currentPlayer
      ? auctionData.currentPlayer.bidAmount
      : null
    const bidHistory = auctionData.currentPlayer
      ? auctionData.currentPlayer.bids.map((bid) => {
          const team = teams.find((team) => team._id === bid.teamId)
          return {
            teamId: team._id,
            teamName: team.name,
            teamImage: team.imageUrl,
            amount: bid.amount,
          }
        })
      : []
    bidHistory.reverse()

    const lastBid = bidHistory.length > 0 ? bidHistory[0] : null
    const teamStats = {}
    auctionData.teams
      .map((teamId) => teams.find((team) => team._id === teamId))
      .forEach((team) => {
        teamStats[team._id] = {
          teamName: team.name,
          batsman: 0,
          bowlers: 0,
          allRounders: 0,
          total: 0,
          budget: auctionData.budget[team._id],
          isPlaying: team.teamOwner && team.teamOwner.isPlaying ? true : false,
        }
      })
    const previousAuctions = []
    auctionData.soldPlayers.forEach((playerId) => {
      const bid = auctionData.playerLastBid[playerId]
      const team = teams.find((team) => team._id === bid.teamId)
      const player = players.find((player) => player._id === playerId)
      previousAuctions.push({
        playerName: player.name,
        playerImage: player.imageUrl,
        teamName: team.name,
        teamImage: team.imageUrl,
        amount: bid.amount,
      })
      previousAuctions.reverse()
      if (player.skill) {
        switch (player.skill.toLowerCase()) {
          case 'batsman':
            teamStats[bid.teamId].batsman += 1
            break
          case 'bowler':
            teamStats[bid.teamId].bowlers += 1
            break
          case 'all rounder':
            teamStats[bid.teamId].allRounders += 1
            break
          default:
        }
      }
      teamStats[bid.teamId].total += 1
    })
    setMappedData({
      clock,
      state: auctionData.state,
      remBudget,
      currentPlayer,
      bidAmount,
      lastBid,
      bidHistory,
      teamStats,
      previousAuctions,
    })
  }

  const updateData = () => {
    axios.get(BASE_URL + '/api/v1/auction/data').then((res) => {
      if (res.data.status === 'ok') {
        setAuctionData(res?.data?.data)
      }
    })
    axios.get(BASE_URL + '/api/v1/team').then((res) => {
      setTeams(res.data.teams)
    })
    axios.get(BASE_URL + '/api/v1/player').then((res) => {
      setPlayers(res.data.players)
    })
  }

  const makeBid = () => {
    const payload = {
      playerId: auctionData.currentPlayer.id,
      teamId: TEAM_ID,
      amount: nextBidAmount,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    // make bid
    const api = BASE_URL + '/api/v1/auction/bid'
    axios.post(api, payload, config).then((res) => {})
  }

  // update data and initialize socket functions
  useEffect(() => {
    updateData()
    socket.on('connect', () => {
      // console.log(mappedData.previousAuctions)
    })
    socket.on('disconnect', () => {
      // console.log('socket disconnected')
    })
    socket.on('event', (payload) => {
      console.log('event:', payload)
      setAuctionData(payload.data)
      const playerId = payload.data.prevPlayer
      const BASE_URL = process.env.REACT_APP_BASE_URL || ''
      if (playerId != 'undefined') {
        axios.get(BASE_URL + `/api/v1/player/${playerId}`).then((res) => {
          if (res.data.status === 'ok') {
            const player = res.data.player
            setPreviousPlayerData(player)
          }
        })
      }

      switch (payload.type) {
        case 'ROUND_ENDED':
          setOpenSnackbar(true)
          setRoundEnd(true)
          setRoundEndcount(payload.data.round)
          setCompletedFlag(false)
        case 'ACCOUNT_AUCTION_COMPLETED':
          setCompletedFlag(true)

        case 'PLAYER_AUCTION_ENDED':
          setAuctionEnded(true)
          payload.data.soldPlayers.includes(payload.data.prevPlayer)
            ? setPlayerStatus('sold')
            : setPlayerStatus('unsold')

          break
      }
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('event')
    }
  }, [])

  useEffect(() => {
    if (teams.length > 0 && players.length > 0 && auctionData) {
      updateMappedData()
    }
  }, [teams, players, auctionData])

  function GetAmountDifference(props) {
    if (props.current && props.elements[props.index + 1]) {
      return props.current.amount - props.elements[props.index + 1].amount
    } else {
      return props.current.amount - DEFAULT_BID_AMOUNT
    }
  }

  const handleClose = (event) => {
    setOpenSnackbar(false)
  }
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    mappedData && (
      <div className="content mainContent container-fluid">
        {mappedData.currentPlayer && (
          <Row>
            <Col md="4" lg="4">
              <Card className="card-user card-height">
                <CardBody>
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    {mappedData.currentPlayer.image ? (
                      <Avatar
                        className="center"
                        alt={mappedData.currentPlayer.name}
                        src={`${BASE_URL}/${mappedData.currentPlayer.image}`}
                        sx={{
                          width: 250,
                          height: 250,
                          fontSize: '5rem',
                        }}
                      />
                    ) : (
                      <Avatar
                        className="center"
                        alt={mappedData.currentPlayer.name}
                        src={`${BASE_URL}/static/account_logo/default.png`}
                        sx={{
                          width: 250,
                          height: 250,
                          fontSize: '5rem',
                        }}
                      />
                    )}

                    <h4 className="title">CURRENT BID FOR</h4>
                    <h3 className="user-name">
                      {mappedData.currentPlayer.name}
                    </h3>
                  </div>
                  <Button
                    color="info"
                    className="animation-on-hover"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {mappedData.currentPlayer.level
                      ? 'LEVEL : ' + mappedData.currentPlayer.level
                      : 'NA'}
                  </Button>
                  <div>
                    <Button
                      color="primary"
                      className="animation-on-hover"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {mappedData.currentPlayer.skill
                        ? 'SKILL : ' + mappedData.currentPlayer.skill
                        : 'NA'}
                    </Button>
                    <Button
                      color="success"
                      className="animation-on-hover"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {mappedData.currentPlayer.rating
                        ? 'RATING : ' + mappedData.currentPlayer.rating
                        : 'NA'}
                    </Button>
                  </div>
                  <div className="score-div">
                    <h3 className="text-center title">
                      BASE PRICE :
                      <span className="text-success base-price-amt">
                        {DEFAULT_BID_AMOUNT}{' '}
                      </span>
                    </h3>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card
                className="card-height"
                style={{ justifyContent: 'center' }}
              >
                <div className="card-content">
                  <CardHeader>
                    <CardTitle
                      tag="h3"
                      className="text-center uppercase"
                      style={{ fontWeight: '600', marginBottom: '5px' }}
                    >
                      {/* <i className="tim-icons icon-money-coins text-primary" />{' '} */}
                      {mappedData.lastBid
                        ? `${mappedData.lastBid.teamName} - ${mappedData.lastBid.amount}`
                        : 'NO BIDS YET'}
                    </CardTitle>
                    <h4 className="text-center"> CURRENT BID </h4>
                  </CardHeader>
                  <CardBody>
                    <p
                      className="text-center"
                      style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        marginBottom: '10px',
                      }}
                    >
                      {mappedData.lastBid
                        ? `YOU RAISING PREVIOUS BID BY ${
                            nextBidAmount - mappedData.bidAmount + BID_INCREASE
                          }`
                        : ''}
                    </p>
                    <div className="auction-price-count">
                      <IncrementDecrement
                        defaultVal={defaultNextBidAmount}
                        defaultChange={BID_INCREASE}
                        maxVal={mappedData.remBudget}
                        currentVal={nextBidAmount}
                        onChange={setNextBidAmount}
                      />
                    </div>
                    <div className="clock-timer">
                      <CircleTimer
                        duration={mappedData.clock}
                        bidHistory={[]}
                      />
                    </div>
                    <div className="pad10 mar10">
                      <Button
                        size="lg"
                        color="success"
                        className="animation-on-hover btn-block"
                        onClick={makeBid}
                        disabled={!canBid}
                      >
                        BID
                      </Button>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Col>
            <Col md="4">
              <Card
                className="card-height"
                style={{
                  maxHeight: '500px',
                  minHeight: '546px',
                }}
              >
                <CardHeader>
                  <CardTitle
                    tag="h3"
                    className="text-center"
                    style={{ fontWeight: '600' }}
                  >
                    BID HISTORY
                  </CardTitle>
                </CardHeader>
                <CardBody className="cardbd" style={{ overflow: 'auto' }}>
                  {mappedData.bidHistory.length == 0 ? (
                    <p>No Bid History</p>
                  ) : (
                    mappedData.bidHistory.map((history, index, elements) => {
                      return (
                        <div key={index} className="bid-history-section">
                          <div>
                            <Avatar
                              className="center"
                              alt={history.teamName}
                              src={`${BASE_URL}/${history.teamImage}`}
                              sx={{ width: 75, height: 75 }}
                            />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <div className="bid-team-name uppercase">
                              {history.teamName}
                            </div>
                          </div>
                          <div>
                            <div className="bid-amt">{history.amount}</div>
                            <div className="bid-increase-by">
                              +
                              <GetAmountDifference
                                current={history}
                                elements={elements}
                                index={index}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
        <Row>
          {mappedData.previousAuctions.length != 0 &&
            (auctionEnded || completedflag == true) &&
            playerStatus === 'sold' && (
              <div style={{ color: 'white' }}>
                {mappedData.previousAuctions.length[0]}
                <Showmodal
                  status="sold"
                  showpop="true"
                  data={mappedData.previousAuctions[0]}
                  setauctionflag={setChanged}
                />
              </div>
            )}
          {(auctionEnded || completedflag == true) &&
            playerStatus === 'unsold' && (
              <div style={{ color: 'white' }}>
                <Showmodal
                  status="unsold"
                  showpop="true"
                  data={previousPlayerData}
                  setauctionflag={setChanged}
                />
              </div>
            )}
          {roundEnd && roundEndcount && (
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={openSnackbar}
              onClose={handleClose}
              message="ROUND ENDED"
              action={action}
              sx={{ width: '100%' }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: '45px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  width: '100%',
                  marginLeft: '20px',
                  marginRight: '60px',
                  background: 'red',
                }}
              >
                <AccessAlarmIcon fontSize="65px" /> ROUND{' '}
                <span style={{ fontSize: '65px' }}>{roundEndcount}</span> ENDED
                .. BE HURRY <ThumbUpIcon fontSize="65px" />
              </div>
            </Snackbar>
          )}

          <Col lg="4" md="12">
            <Card
              className="overflow card-height"
              style={{
                maxHeight: '500px',
                minHeight: '730px',
              }}
            >
              <CardHeader>
                <CardTitle
                  tag="h3"
                  className="uppercase"
                  style={{ fontWeight: '600' }}
                >
                  Previously Auctioned
                </CardTitle>
              </CardHeader>
              <CardBody className="cardbd" style={{ overflow: 'auto' }}>
                <Row style={{ justifyContent: 'center' }}>
                  {mappedData.previousAuctions.length == 0 ? (
                    <p>No Player Auctioned</p>
                  ) : (
                    Object.values(mappedData.previousAuctions).map(
                      (data, i) => (
                        <div key={i} className="sold-player">
                          <div>
                            {data.playerImage ? (
                              <Avatar
                                className="center"
                                alt={data.playerName}
                                src={`${BASE_URL}/${data.playerImage}`}
                                sx={{
                                  width: 50,
                                  height: 50,
                                }}
                              />
                            ) : (
                              <Avatar
                                className="center"
                                alt={data.playerName}
                                src={`${BASE_URL}/static/account_logo/default.png`}
                                sx={{
                                  width: 50,
                                  height: 50,
                                }}
                              />
                            )}
                          </div>
                          <div style={{ width: '50%' }}>
                            <div className="sold-player-name">
                              {data.playerName}
                            </div>
                            <div className="uppercase">
                              Sold To {data.teamName}
                            </div>
                          </div>
                          <div>
                            <Avatar
                              className="center"
                              alt={data.teamName}
                              src={`${BASE_URL}/${data.teamImage}`}
                              sx={{ width: 50, height: 50 }}
                            >
                              {data.teamName[0]}
                            </Avatar>
                          </div>
                          <div>
                            <div>Sold For</div>
                            <div className="sold-player-name">
                              {data.amount}
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="8" md="12" sm="12">
            <Card
              className="card-height"
              style={{
                maxHeight: '500px',
                minHeight: '730px',
              }}
            >
              <CardHeader>
                <CardTitle
                  tag="h3"
                  className="uppercase"
                  style={{ fontWeight: '600' }}
                >
                  Team Statistics
                </CardTitle>
              </CardHeader>
              <CardBody className="cardbd" style={{ overflow: 'auto' }}>
                <Row style={{ justifyContent: 'center' }}>
                  {Object.values(mappedData.teamStats).map((data, index) => (
                    <div
                      key={index}
                      className="team-stats-card"
                      style={{
                        background: `linear-gradient(180deg, ${
                          COLORS.length > index ? COLORS[index].c1 : 'black'
                        } 0%, ${
                          COLORS.length > index ? COLORS[index].c2 : 'black'
                        } 100%)`,
                        border: `2px solid ${
                          COLORS.length > index ? COLORS[index].c1 : 'black'
                        }`,
                      }}
                    >
                      <div className="team-name">{data.teamName}</div>
                      <div className="fund-remaining">
                        <span className="rm-name">Remaining Funds</span>
                        <span className="rm-fund">{data.budget}</span>
                      </div>
                      <div className="pointSection">
                        <div className="point-div">
                          <div className="pointText">Batsman</div>
                          <div className="pointCircle">{data.batsman}</div>
                        </div>
                        <div className="point-div">
                          <div className="pointText">Bowler</div>
                          <div className="pointCircle">{data.bowlers}</div>
                        </div>
                        <div className="point-div">
                          <div className="pointText">All Rounder</div>
                          <div className="pointCircle">{data.allRounders}</div>
                        </div>
                      </div>
                      <div className="team-player">
                        <ul className="mb-0 px-1">
                          <li className="m-0">
                            <span className="rm-name">Total Players</span>
                            <span className="rm-fund">{data.total}</span>
                          </li>
                          <li className="m-0 px-1">
                            <span className="rm-name">Need Players</span>
                            <span className="rm-fund">
                              {PLAYERS_PER_TEAM -
                                data.total -
                                (data.isPlaying ? 1 : 0)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  )
}

export default Auction
