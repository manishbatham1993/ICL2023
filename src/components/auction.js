import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import IncrementDecrement from './IncrementDecrement'
import CircleTimer from './CircleTimer'

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
const TEAM_ID = '639d4a67ddfe568981cf801d'

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
  console.log('---------auction--------')
  const [auctionData, setAuctionData] = useState()
  const [mappedData, setMappedData] = useState()
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [nextBidAmount, setNextBidAmount] = useState()
  console.log('mappedData', mappedData)

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

  const makeBid = (teamId) => {
    axios
      .post(BASE_URL + '/api/v1/auction/bid', {
        playerId: auctionData.currentPlayer.id,
        teamId: teamId,
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
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={`${BASE_URL}/${mappedData.currentPlayer.image}`}
                      />
                      <h5 className="title">CURRENT BID FOR</h5>
                    </a>
                    <p className="description text-info">
                      {mappedData.currentPlayer.name}
                    </p>
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
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h1" className="text-center">
                    <i className="tim-icons icon-money-coins text-primary" />{' '}
                    {mappedData.lastBid
                      ? mappedData.lastBid.amount
                      : 'handle_no_last_bid'}
                  </CardTitle>
                  <p className="text-center"> CURRENT BID </p>
                </CardHeader>
                <CardBody>
                  <p className="text-center">
                    {mappedData.lastBid
                      ? `${mappedData.lastBid.teamName} Raised for ${mappedData.lastBid.amount}`
                      : ''}
                  </p>

                  <IncrementDecrement
                    defaultVal={defaultNextBidAmount}
                    defaultChange={DEFAULT_BID_INCREASE}
                    maxVal={mappedData.remBudget}
                    currentVal={nextBidAmount}
                    onChange={setNextBidAmount}
                  />
                  {console.log(mappedData.clock)}
                  <p>clock: {mappedData.clock}</p>
                  <CircleTimer duration={mappedData.clock} bidHistory={[]} />

                  <div className="pad10 mar10">
                    {teams.map((team) => (
                      <Button
                        color="info"
                        className="animation-on-hover btn-block"
                        onClick={makeBid.bind(null, team._id)}
                        disabled={mappedData.remBudget <= nextBidAmount}
                      >
                        BID {team.name}
                      </Button>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4" className="text-center">
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
                              <span className="">{history.teamName}</span>-
                              raised for {history.amount}
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
            <Card className="card-tasks">
              <CardHeader>
                <CardTitle tag="h4">Previously Auctioned</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      {mappedData.previousAuctions.map((data) => (
                        <tr>
                          <tr>
                            <td>
                              {data.playerName}
                              <p>SOLD TO {data.teamName}</p>
                            </td>
                            <td>
                              SOLD FOR
                              <p>{data.amount}</p>
                            </td>
                          </tr>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="8" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4" className="text-center">
                  Team Overview
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  {Object.values(mappedData.teamStats).map((data) => (
                    <Col lg="6" md="12">
                      <CardTitle tag="h3" className="text-center">
                        {data.teamName}
                      </CardTitle>
                      <p className="text-info text-center">Fund Remaining</p>
                      <Button color="info" className="animation-on-hover">
                        {data.budget}
                      </Button>
                      <p className="text-primary text-center">Total Players</p>
                      <Button color="primary" className="animation-on-hover">
                        {data.total}/set_total
                      </Button>
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
