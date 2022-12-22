import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const socket = io(BASE_URL)

const Auction = () => {
  console.log('---------auction--------')
  const [auctionData, setAuctionData] = useState()
  const [mappedData, setMappedData] = useState()
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [nextBidAmount, setNextBidAmount] = useState()

  const updateMappedData = () => {
    const clock = auctionData.currentPlayer
      ? auctionData.currentPlayer.clock
      : null
    const playerObj = auctionData.currentPlayer
      ? players.find((player) => player._id === auctionData.currentPlayer.id)
      : null
    const currentPlayer = playerObj
      ? {
          name: playerObj.name,
          rating: playerObj.rating,
          skill: playerObj.skill,
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
            teamStats[teamId].bowlers += 1
            break
          default:
            console.log('skill', player.skill, 'not present')
        }
      }
      teamStats[bid.teamId].total += 1
    })
    setMappedData({
      clock,
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
        console.log('posting-bid', res, res)
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
      if (auctionData.currentPlayer) {
        setNextBidAmount(auctionData.currentPlayer.bidAmount)
      }
    }
  }, [teams, players, auctionData])

  return (
    mappedData && (
      <React.Fragment>
        <div style={{ display: 'flex' }}>
          <Box sx={{ width: '30%', height: 650, border: '1px solid' }}>
            <Paper
              sx={{
                m: 2,
                borderRadius: 2,
                height: 100,
                overflowY: 'auto',
              }}
            >
              {mappedData.currentPlayer && (
                <div>
                  <p>{mappedData.currentPlayer.name}</p>
                  <p>
                    {mappedData.currentPlayer.skill}{' '}
                    {mappedData.currentPlayer.rating}/10
                  </p>
                </div>
              )}
            </Paper>
            <Paper
              sx={{
                m: 2,
                borderRadius: 2,
                height: 200,
                overflowY: 'auto',
              }}
            >
              <p>Upcoming</p>
            </Paper>
            <Paper
              sx={{
                m: 2,
                borderRadius: 2,
                height: 250,
                overflowY: 'auto',
              }}
            >
              <p>Previously Auctioned</p>
              {mappedData.previousAuctions.map((data) => (
                <div style={{ border: '1px solid' }}>
                  <p>
                    {data.playerName} sold to {data.teamName} for {data.amount}
                  </p>
                </div>
              ))}
            </Paper>
          </Box>
          <Box sx={{ width: '70%', height: 650, border: '1px solid' }}>
            <Paper
              sx={{
                m: 2,
                borderRadius: 2,
                height: 250,
                overflowY: 'auto',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              {mappedData.currentPlayer && (
                <React.Fragment>
                  <div>
                    {mappedData.lastBid && (
                      <p>
                        LastBid {mappedData.lastBid.amount} by{' '}
                        {mappedData.lastBid.teamName}
                      </p>
                    )}
                    <p>Clock: {mappedData.clock}</p>
                    <p>Bid: {mappedData.bidAmount}</p>
                    <div
                      style={{
                        display: 'grid',
                        gap: '0.5rem',
                        gridTemplateColumns: '30% 30% 30%',
                      }}
                    >
                      {teams.map((team) => (
                        <button onClick={makeBid.bind(null, team._id)}>
                          {team.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p>History</p>
                    {mappedData.bidHistory.map((bid) => (
                      <p>
                        {bid.teamName} raised {bid.amount}
                      </p>
                    ))}
                  </div>
                </React.Fragment>
              )}
            </Paper>
            <Grid
              container
              // spacing={2}
              rowSpacing={1}
              columnSpacing={2}
            >
              {Object.values(mappedData.teamStats).map((team) => (
                <Grid
                  item
                  sx={{
                    border: '1px solid',
                    height: 170,
                    m: 2,
                    borderRadius: 2,
                    overflowY: 'auto',
                  }}
                  xs={3}
                >
                  <p>
                    {team.teamName} {team.total}/10
                  </p>
                  <p>Batsman {team.batsman}</p>
                  <p>bowlers {team.bowlers}</p>
                  <p>allRounders {team.allRounders}</p>
                  {}
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </React.Fragment>
    )
  )
}

export default Auction
