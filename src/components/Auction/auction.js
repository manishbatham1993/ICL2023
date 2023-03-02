// check players_per_team string value
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import AuthContext from '../../store/auth-context'
import EntityContext from '../../store/entity-context'
import IncrementDecrement from './IncrementDecrement'
import CircleTimer from '../CircleTimer'
import './auction.css'
import PopupModal from '../popmodal'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Avatar from '@mui/material/Avatar'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Snackbar from '@mui/material/Snackbar'
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
const isInteger = (value) => {
  if (value === null || value === undefined || value === '') return false
  value = Number(value)
  return Number.isInteger(value)
}

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

  // DEFAULT ATTRIBUTES FOR AUCTION
  const { DEFAULT_BID_AMOUNT, BID_INCREASE, PLAYERS_PER_TEAM } =
    entityCtx.configurations

  // teams and players participating in auction
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])

  // storing details about auction-state
  const [auctionData, setAuctionData] = useState(null)
  const [mappedData, setMappedData] = useState(null)

  // amount to spend on next bid
  const [nextBidAmount, setNextBidAmount] = useState(null)

  // showing overlay modals after player auction completes or round ends
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  // details about current owner
  const currentOwnerTeamId = authCtx.user?.teamId
  const currentOwnerTeam = teams.find((team) => team._id === currentOwnerTeamId)
  const currentOwnerIsPlaying = currentOwnerTeam?.teamOwner?.isPlaying
    ? true
    : false

  // players to be bought by current team owner
  const remainingPlayers =
    isInteger(PLAYERS_PER_TEAM) &&
    mappedData?.teamStats &&
    currentOwnerTeamId &&
    mappedData.teamStats[currentOwnerTeamId]
      ? PLAYERS_PER_TEAM -
        mappedData?.teamStats[currentOwnerTeamId].total -
        (currentOwnerIsPlaying ? 1 : 0)
      : null

  // maximum amount current team owner can spend on currently auctioned player
  const maxAllowableBid =
    mappedData && isInteger(remainingPlayers) && isInteger(DEFAULT_BID_AMOUNT)
      ? mappedData.remBudget -
        Math.max(remainingPlayers - 1, 0) * DEFAULT_BID_AMOUNT
      : Number.MAX_SAFE_INTEGER

  // check if current-owner is able to bid
  const canBid =
    currentOwnerTeamId &&
    mappedData?.state === 'progress' &&
    mappedData?.lastBid?.teamId !== currentOwnerTeamId &&
    remainingPlayers > 0 &&
    maxAllowableBid >= nextBidAmount

  // get a mapping of auction-data
  const updateMappedData = () => {
    try {
      if (!auctionData) return
      const clock = auctionData.currentPlayer?.clock
      const state = auctionData?.state
      const round = auctionData?.round
      const remBudget = currentOwnerTeamId
        ? auctionData.budget[currentOwnerTeamId]
        : null

      // current player being auctioned
      const currPlayer = auctionData.currentPlayer
        ? players.find((player) => player._id === auctionData.currentPlayer.id)
        : null
      const mappedCurrentPlayer = currPlayer
        ? {
            name: currPlayer.name,
            rating: currPlayer.rating,
            skill: currPlayer.skill,
            level: currPlayer.level,
            image: currPlayer.imageUrl,
          }
        : null
      // previous player auctioned
      const prevPlayer = auctionData.prevPlayer
        ? players.find((player) => player._id === auctionData.prevPlayer)
        : null
      const prevPlayerLastBid = auctionData.prevPlayer
        ? auctionData.playerLastBid[auctionData.prevPlayer]
        : null
      const prevPlayerTeam = teams.find(
        (team) => team._id === prevPlayerLastBid?.teamId
      )
      const mappedPrevPlayer = prevPlayer
        ? {
            name: prevPlayer.name,
            rating: prevPlayer.rating,
            skill: prevPlayer.skill,
            level: prevPlayer.level,
            image: prevPlayer.imageUrl,
            status: prevPlayerLastBid ? 'sold' : 'unsold',
            amount: prevPlayerLastBid?.amount,
            teamName: prevPlayerTeam?.name,
            teamImage: prevPlayerTeam?.imageUrl,
          }
        : null
      const bidAmount = auctionData.currentPlayer?.bidAmount
      const bidHistory =
        auctionData.currentPlayer?.bids?.length > 0
          ? auctionData.currentPlayer.bids.map((bid, i, array) => {
              const team = teams.find((team) => team._id === bid.teamId)
              const prevBidAmount = i === 0 ? null : array[i - 1].amount
              return {
                teamId: team?._id,
                teamName: team?.name,
                teamImage: team?.imageUrl,
                amount: bid.amount,
                difference: prevBidAmount ? bid.amount - prevBidAmount : 0,
              }
            })
          : []
      // first bid is at 0th index therefore we are reversing it
      bidHistory.reverse()
      // storing last bid made on player
      const lastBid = bidHistory?.length > 0 ? bidHistory[0] : null

      // storing team-stats
      const teamStats = {}
      for (let teamId of auctionData?.teams || []) {
        const team = teams.find((team) => team._id === teamId)
        if (!team) continue
        const isPlaying = team?.teamOwner?.isPlaying ? true : false
        teamStats[team._id] = {
          teamName: team.name,
          batsman: 0,
          bowlers: 0,
          allRounders: 0,
          total: 0,
          budget: auctionData.budget[team._id],
          ownerIsPlaying: isPlaying,
          needPlayers: isPlaying ? PLAYERS_PER_TEAM - 1 : PLAYERS_PER_TEAM,
        }
      }

      // setting previous auction list and updating teamStats using sold player list
      const previousAuctions = []

      for (let playerId of auctionData?.soldPlayers || []) {
        const player = players.find((player) => player._id === playerId)
        if (!player) continue

        const bid = auctionData?.playerLastBid[playerId]
        const team = teams.find((team) => team._id === bid.teamId)

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
        teamStats[bid.teamId].needPlayers -= 1
      }

      setMappedData({
        clock,
        state,
        round,
        remBudget,
        currentPlayer: mappedCurrentPlayer,
        prevPlayer: mappedPrevPlayer,
        bidAmount,
        lastBid,
        bidHistory,
        teamStats,
        previousAuctions,
      })
    } catch (err) {
      console.log('-------------err---------------\n', err)
    }
  }

  // async function to update all data related to auction, players, teams
  const updateData = () => {
    axios.get(BASE_URL + '/api/v1/auction/data').then((res) => {
      if (res.data.status === 'ok') {
        setAuctionData(res?.data?.data)
        setTeams(res?.data?.teams)
        setPlayers(res?.data?.players)
      }
    })
  }

  // async function to call api for making bid on current player
  const makeBid = () => {
    const payload = {
      playerId: auctionData?.currentPlayer?.id,
      teamId: currentOwnerTeamId,
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

  // setting next bid amount whenever bidamount is changed
  useEffect(() => {
    setNextBidAmount(mappedData?.bidAmount)
  }, [mappedData?.bidAmount])

  // updating mapped data whenever auction data changes
  useEffect(() => {
    if (auctionData && teams?.length > 0 && players?.length > 0) {
      updateMappedData()
    }
  }, [auctionData, teams, players])

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
      switch (payload?.type) {
        case 'AUCTION_INITIALIZED':
          updateData()
          break

        case 'ROUND_ENDED':
          setShowSnackbar(true)
          setShowPopup(true)
          break

        case 'PLAYER_AUCTION_ENDED':
          setShowPopup(true)
          break
      }
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('event')
    }
  }, [])

  return (
    <div className="content mainContent container-fluid">
      {/* show modals */}
      {mappedData?.prevPlayer && (
        <PopupModal
          isOpen={showPopup}
          player={mappedData?.prevPlayer}
          onClose={setShowPopup.bind(null, false)}
        />
      )}
      {/* show snackbar after round ends */}
      {mappedData?.round >= 0 && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showSnackbar}
          autoHideDuration={5000}
          onClose={() => {
            setShowSnackbar(false)
          }}
          message="ROUND ENDED"
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
            <span style={{ fontSize: '65px' }}>{mappedData?.round}</span> ENDED
            .. BE HURRY <ThumbUpIcon fontSize="65px" />
          </div>
        </Snackbar>
      )}

      {/* show current player and bids */}
      {mappedData?.currentPlayer && (
        <Row>
          {/* playerinfo */}
          <Col md="4" lg="4">
            <Card className="card-user card-height">
              <CardBody>
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <Avatar
                    className="center"
                    alt={mappedData?.currentPlayer?.name}
                    src={
                      mappedData?.currentPlayer?.image
                        ? `${BASE_URL}/${mappedData.currentPlayer.image}`
                        : `/static/images/playerDefault.png`
                    }
                    sx={{
                      width: 250,
                      height: 250,
                      fontSize: '5rem',
                    }}
                  />

                  <h4 className="title">CURRENT BID FOR</h4>
                  <h3 className="user-name">{mappedData.currentPlayer.name}</h3>
                </div>
                <Button
                  color="info"
                  className="animation-on-hover"
                  style={{ textTransform: 'uppercase' }}
                >
                  LEVEL :{' '}
                  {mappedData?.currentPlayer?.level
                    ? mappedData.currentPlayer.level
                    : 'NA'}
                </Button>
                <div>
                  <Button
                    color="primary"
                    className="animation-on-hover"
                    style={{ textTransform: 'uppercase' }}
                  >
                    SKILL :{' '}
                    {mappedData?.currentPlayer?.skill
                      ? mappedData?.currentPlayer?.skill
                      : 'NA'}
                  </Button>
                  <Button
                    color="success"
                    className="animation-on-hover"
                    style={{ textTransform: 'uppercase' }}
                  >
                    RATING :{' '}
                    {mappedData?.currentPlayer?.rating
                      ? mappedData.currentPlayer.rating
                      : 'NA'}
                  </Button>
                </div>
                <div className="score-div">
                  <h3 className="text-center title">
                    BASE PRICE :{' '}
                    <span className="text-success base-price-amt">
                      {DEFAULT_BID_AMOUNT}
                    </span>
                  </h3>
                </div>
              </CardBody>
            </Card>
          </Col>

          {/*  Bid controls*/}
          <Col md="4">
            <Card className="card-height" style={{ justifyContent: 'center' }}>
              <div className="card-content">
                <CardHeader>
                  <CardTitle
                    tag="h3"
                    className="text-center uppercase"
                    style={{ fontWeight: '600', marginBottom: '5px' }}
                  >
                    {mappedData?.lastBid
                      ? `${mappedData.lastBid?.teamName} - ${mappedData.lastBid?.amount}`
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
                    {mappedData?.lastBid
                      ? `YOU RAISING PREVIOUS BID BY ${
                          nextBidAmount - mappedData?.bidAmount + BID_INCREASE
                        }`
                      : ''}
                  </p>
                  <div className="auction-price-count">
                    <IncrementDecrement
                      defaultVal={mappedData?.bidAmount}
                      defaultChange={BID_INCREASE}
                      maxVal={maxAllowableBid}
                      currentVal={nextBidAmount}
                      onChange={setNextBidAmount}
                    />
                  </div>
                  <div className="clock-timer">
                    <CircleTimer duration={mappedData?.clock} bidHistory={[]} />
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

          {/* Bid history */}
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
                {mappedData?.bidHistory?.length === 0 && <p>No Bid History</p>}
                {mappedData?.bidHistory?.length > 0 &&
                  mappedData.bidHistory.map((history, index, elements) => {
                    return (
                      <div key={index} className="bid-history-section">
                        <div>
                          <Avatar
                            className="center"
                            alt={history?.teamName}
                            src={`${BASE_URL}/${history?.teamImage}`}
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
                            {history?.teamName}
                          </div>
                        </div>
                        <div>
                          <div className="bid-amt">{history?.amount}</div>
                          <div className="bid-increase-by">
                            +{history.difference}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      <Row>
        {/* previous auctions */}
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
                {mappedData?.previousAuctions?.length === 0 && (
                  <p>No Player Auctioned</p>
                )}
                {mappedData?.previousAuctions?.length > 0 &&
                  mappedData.previousAuctions.map((data, i) => (
                    <div key={i} className="sold-player">
                      <div>
                        <Avatar
                          className="center"
                          alt={data?.playerName}
                          src={
                            data?.playerImage
                              ? `${BASE_URL}/${data.playerImage}`
                              : `/static/images/playerDefault.png`
                          }
                          sx={{
                            width: 50,
                            height: 50,
                          }}
                        />
                      </div>
                      <div style={{ width: '50%' }}>
                        <div className="sold-player-name">
                          {data?.playerName}
                        </div>
                        <div className="uppercase">
                          Sold To {data?.teamName}
                        </div>
                      </div>
                      <div>
                        <Avatar
                          className="center"
                          alt={data?.teamName}
                          src={`${BASE_URL}/${data.teamImage}`}
                          sx={{ width: 50, height: 50 }}
                        />
                      </div>
                      <div>
                        <div>Sold For</div>
                        <div className="sold-player-name">{data?.amount}</div>
                      </div>
                    </div>
                  ))}
              </Row>
            </CardBody>
          </Card>
        </Col>

        {/* team statistics */}
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
                {mappedData?.teamStats &&
                  Object.values(mappedData.teamStats).map((data, index) => (
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
                      <div className="team-name">{data?.teamName}</div>
                      <div className="fund-remaining">
                        <span className="rm-name">Remaining Funds</span>
                        <span className="rm-fund">{data?.budget}</span>
                      </div>
                      <div className="pointSection">
                        <div className="point-div">
                          <div className="pointText">Batsman</div>
                          <div className="pointCircle">{data?.batsman}</div>
                        </div>
                        <div className="point-div">
                          <div className="pointText">Bowler</div>
                          <div className="pointCircle">{data?.bowlers}</div>
                        </div>
                        <div className="point-div">
                          <div className="pointText">All Rounder</div>
                          <div className="pointCircle">{data?.allRounders}</div>
                        </div>
                      </div>
                      <div className="team-player">
                        <ul className="mb-0 px-1">
                          <li className="m-0">
                            <span className="rm-name">Total Players</span>
                            <span className="rm-fund">{data?.total}</span>
                          </li>
                          <li className="m-0 px-1">
                            <span className="rm-name">Need Players</span>
                            <span className="rm-fund">{data?.needPlayers}</span>
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
}

export default Auction
