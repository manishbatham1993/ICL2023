import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import AuthContext from '../store/auth-context'
import IncrementDecrement from './IncrementDecrement'
import CircleTimer from './CircleTimer'
import Avatar from '@mui/material/Avatar'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

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
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  CardText,
  CardFooter,
  Badge,
  Progress,
} from 'reactstrap'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const socket = io(BASE_URL)

// constants
const DEFAULT_BID_INCREASE = 100
const BASE_PRICE = 1000

// AUCTION_SCHEMA : {
//   state: (null/'ready'/'progress'/'completed'/)
//   teams: [<teamId>],
//   budget: {teamId: <budget>}
//   remainingPlayers : [<playerId>]
//   unsoldPlayers: [<playerId>]
//   soldPlayers: [<playerId>],
//   playerLastBid: {playerId: <bidindex>},
//   currentPlayer: {
//     id : <playerId>
//     bidAmount: <currentAmount>
//     bids : [<teamId>]
//     clock: <clock>
//   }
//   bids : [
//     {playerId : <playerId>, teamId: <teamId>, amount: <amount> }
//   ]
// }

const Auction = () => {
  const authCtx = useContext(AuthContext)
  const TEAM_ID = authCtx.user ? authCtx.user.teamId : null

  console.log('---------auction--------')
  const [auctionData, setAuctionData] = useState()
  const [mappedData, setMappedData] = useState()
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [nextBidAmount, setNextBidAmount] = useState()
  // const[timer,setTimer]=useState(mappedData.clock?mappedData.clock:"")
  // console.log('timer',timer)

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
          image: playerObj.imageUrl,
        }
      : null
    const bidAmount = auctionData.currentPlayer
      ? auctionData.currentPlayer.bidAmount
      : null
    const bidHistory = auctionData.currentPlayer
      ? auctionData.currentPlayer.bids //[0,1,2]
          .map((bidId) => auctionData.bids[bidId]) //[{playerId, teamId, amount}]
          .map((bid) => {
            const player = players.find((player) => player._id === bid.playerId)
            const team = teams.find((team) => team._id === bid.teamId)
            return {
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
        }
      })
    const previousAuctions = []
    auctionData.soldPlayers.forEach((playerId) => {
      const bidId = auctionData.playerLastBid[playerId]
      const bid = auctionData.bids[bidId]
      const teamId = bid.teamId
      const team = teams.find((team) => team._id === bid.teamId)
      const player = players.find((player) => player._id === playerId)
      previousAuctions.push({
        playerName: player.name,
        playerImage: player.imageUrl,
        teamName: team.name,
        teamImage: team.imageUrl,
        amount: bid.amount,
      })
      if (player.skill) {
        switch (player.skill.toLowerCase()) {
          case 'batsman':
            teamStats[teamId].batsman += 1
            break
          case 'bowler':
            teamStats[teamId].bowlers += 1
            break
          case 'all rounder':
            teamStats[teamId].allRounders += 1
            break
          default:
            console.log('skill', player.skill, 'not present')
        }
      }
      teamStats[bid.teamId].total += 1
    })
    setMappedData({
      clock,
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
    axios
      .get(BASE_URL + '/api/v1/auction/data')
      .then((res) => {
        if (res.data.status === 'ok') {
          setAuctionData(res.data.data)
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
    axios.get(BASE_URL + '/api/v1/team').then((res) => {
      setTeams(res.data.teams)
    })
    axios.get(BASE_URL + '/api/v1/player').then((res) => {
      setPlayers(res.data.players)
    })
  }

  const makeBid = () => {
    axios
      .post(BASE_URL + '/api/v1/auction/bid', {
        playerId: auctionData.currentPlayer.id,
        teamId: TEAM_ID,
        amount: nextBidAmount,
      })
      .then((res) => {
        console.log('posting-bid', res)
      })
  }

  // update data and initialize socket functions
  useEffect(() => {
    console.log('--------use-effect---------')
    updateData()
    socket.on('connect', () => {
      console.log('socket connected')
    })
    socket.on('disconnect', () => {
      console.log('socket disconnected')
    })
    socket.on('event', (payload) => {
      console.log('event:', payload)
      setAuctionData(payload.data)
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

  return (
    mappedData && (
      <div className="content">
        {mappedData.currentPlayer && (
          <Row>
            <Col md="4">
              <Card className="card-user card-tasks">
                <CardBody style={{ marginTop: '10%' }}>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    {/* <a href="#" onClick={(e) => e.preventDefault()}> */}
                    {console.log(mappedData.currentPlayer.image, 'abcd')}
                    {/* <img
                        alt="..."
                        className="avatar"
                        src={`${BASE_URL}/${mappedData.currentPlayer.image}`}
                      /> */}
                    <Avatar
                      className="center"
                      alt={mappedData.currentPlayer.name}
                      src={`${BASE_URL}/${mappedData.currentPlayer.image}`}
                      sx={{ width: 100, height: 100 }}
                    />
                    <br></br>
                    <h4 className="title">CURRENT BID FOR</h4>
                    <h3>{mappedData.currentPlayer.name}</h3>
                  </div>
                  <div
                    className="card-description"
                    style={{
                      margin: 'auto',
                      width: '80%',
                      padding: '10px',
                    }}
                  >
                    <Button color="primary" className="animation-on-hover">
                      {mappedData.currentPlayer.skill}
                    </Button>
                    <Button color="success" className="animation-on-hover">
                      {mappedData.currentPlayer.rating}
                    </Button>
                  </div>
                </CardBody>
                <h3 className="text-center">
                  Base Price
                  <span className="text-success"> : {BASE_PRICE} </span>
                </h3>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart card-tasks">
                <CardHeader>
                  <CardTitle tag="h3" className="text-center">
                    <i className="tim-icons icon-money-coins text-primary" />{' '}
                    {mappedData.lastBid ? mappedData.lastBid.amount : 'No Bids'}
                  </CardTitle>
                  <h4 className="text-center"> CURRENT BID </h4>
                </CardHeader>
                <CardBody>
                  <p className="text-center">
                    {mappedData.lastBid
                      ? `Team ${mappedData.lastBid.teamName} Raised for ${mappedData.lastBid.amount}`
                      : ''}
                  </p>

                  <IncrementDecrement
                    defaultVal={defaultNextBidAmount}
                    defaultChange={DEFAULT_BID_INCREASE}
                    maxVal={mappedData.remBudget}
                    currentVal={nextBidAmount}
                    onChange={setNextBidAmount}
                  />

                  <CircleTimer duration={mappedData.clock} bidHistory={[]} />
                  <div
                    className="timer"
                    style={{ duration: `${mappedData.clock}`, size: '100' }}
                  >
                    <div className="mask"></div>
                  </div>
                  <div className="pad10 mar10">
                    <Button
                      size="lg"
                      color="success"
                      className="animation-on-hover btn-block"
                      onClick={makeBid}
                      disabled={mappedData.remBudget <= nextBidAmount}
                    >
                      BID
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart card-tasks overflow">
                <CardHeader>
                  <CardTitle tag="h3" className="text-center">
                    Bid history
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table>
                    <tbody>
                      {mappedData.bidHistory.map((history) => {
                        return (
                          <tr>
                            <td>
                              {console.log(history, 'testmanish')}
                              <Avatar
                                className="center"
                                alt={history.teamName}
                                src={`${BASE_URL}/${history.teamImage}`}
                                sx={{ width: 100, height: 100 }}
                              />{' '}
                              <span className="">Team {history.teamName}</span>
                              Raised For {history.amount}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
        <Row>
          <Col lg="4" md="12">
            <Card className="card-tasks overflow">
              <CardHeader>
                <CardTitle tag="h3">Previously Auctioned</CardTitle>
              </CardHeader>
              <CardBody className="">
                <Row>
                  <Col lg="6" md="12">
                    <Table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Player Details</th>
                          <th>Bid Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(mappedData.previousAuctions).map(
                          (data) => (
                            <tr>
                              <td>
                                <Avatar
                                  className="center"
                                  alt={data.playerName}
                                  src={`${BASE_URL}/${data.playerImage}`}
                                />
                              </td>
                              <td>
                                {data.playerName}
                                <br></br>
                                Sold To :{data.teamName}
                              </td>
                              <td>{data.amount}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="8" md="12">
            <Card className="card-tasks overflow">
              <CardHeader>
                <CardTitle tag="h3" className="text-center">
                  ICL Team Stats
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  {console.log(mappedData.teamStats)}
                  {Object.values(mappedData.teamStats).map((data) => (
                    <Col lg="6" md="12">
                      <CardTitle tag="h3" className="text-center">
                        {data.teamName}:{data.budget}
                      </CardTitle>
                      {/* <p className="text-info text-center">Fund Remaining</p>
                      <Button color="info" className="animation-on-hover">
                        {data.budget}
                      </Button>
                      <p className="text-primary text-center">Total Players</p>
                      <Button color="primary" className="animation-on-hover">
                        {data.total}/set_total
                      </Button> */}
                      <Table>
                        <thead>
                          <tr>
                            <th>Skills</th>
                            <th>Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Batsman</td>
                            <td>{data.batsman}</td>
                          </tr>
                          <tr>
                            <td>Bowler</td>
                            <td>{data.bowlers}</td>
                          </tr>
                          <tr>
                            <td>All Rounder</td>
                            <td>{data.allRounders}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
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
