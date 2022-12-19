import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableRow from '@mui/material/TableRow'
// import Typography from '@mui/material/Typography'
// import IconButton from '@mui/material/IconButton'
// import Tooltip from '@mui/material/Tooltip'
// import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'
// import AddIcon from '@mui/icons-material/Add'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const socket = io(BASE_URL)

const Auction = () => {
  console.log('---------auction--------')
  const [auctionData, setAuctionData] = useState(null)
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])

  const updateData = () => {
    axios
      .get(BASE_URL + '/api/v1/auction/data')
      .then((res) => {
        if (res.data.status === 'ok') {
          console.log('updated-auction-data', res.data.data)
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

  const makeBid = (teamId) => {
    axios
      .post(BASE_URL + '/api/v1/auction/bid', {
        playerId: auctionData.currentPlayer.id,
        teamId: teamId,
      })
      .then((res) => {
        console.log('posting-bid', res, res)
      })
  }

  const getMappedPlayers = (teamId) => {
    const playerIds = []
    for (let playerId in auctionData.playerLastBid) {
      const bidId = auctionData.playerLastBid[playerId]
      const bid = auctionData.bids[bidId]
      if (bid.teamId === teamId) playerIds.push(playerId)
    }
    const playerList = players
      .filter((player) => playerIds.includes(player._id))
      .map((player) => ({
        name: player.name,
        skill: player.skill,
      }))
    return playerList
  }

  return (
    auctionData && (
      <React.Fragment>
        <div style={{ display: 'flex' }}>
          <Box sx={{ width: '30%', height: 600, border: '1px solid' }}>
            <Paper
              sx={{
                m: 2,
                borderRadius: 2,
                height: 300,
                overflowY: 'auto',
              }}
            >
              <p>
                PlayerId:
                {auctionData.currentPlayer && auctionData.currentPlayer.id}
              </p>
              <p>Next in auction</p>
              {auctionData.remainingPlayers.map((player) => (
                <p>{player}</p>
              ))}
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
              {auctionData.soldPlayers.map((soldPlayer) => {
                return <p>{soldPlayer}</p>
              })}

              <p>Unsold</p>
              {auctionData.unsoldPlayers.map((player) => (
                <p>{player}</p>
              ))}
            </Paper>
          </Box>
          <Box sx={{ width: '70%', height: 600, border: '1px solid' }}>
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
              {auctionData.currentPlayer && (
                <React.Fragment>
                  <div>
                    <p>
                      Last Bid:{' '}
                      {
                        auctionData.currentPlayer.bids[
                          auctionData.currentPlayer.bids.length - 1
                        ]
                      }
                    </p>
                    <p>Clock: {auctionData.currentPlayer.clock}</p>
                    <p>
                      CurrentBidAmount:{auctionData.currentPlayer.bidAmount}
                    </p>
                    <p>BID</p>
                    <button
                      onClick={makeBid.bind(null, '639b5c6195ed6fa4cf61c3dd')}
                    >
                      SPOC
                    </button>
                    <button
                      onClick={makeBid.bind(null, '639d4a67ddfe568981cf801d')}
                    >
                      NAVIC
                    </button>
                  </div>
                  <div>
                    <p>Bid history</p>
                    {auctionData.currentPlayer.bids.map((bidId) => (
                      <p>{bidId}</p>
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
              {teams.map((team) => (
                <Grid
                  item
                  sx={{
                    border: '1px solid',
                    height: 300,
                    m: 2,
                    borderRadius: 2,
                    overflowY: 'auto',
                  }}
                  xs={4}
                >
                  <p>{team.name}</p>
                  <p>Players</p>
                  {getMappedPlayers(team._id).map((player) => (
                    <React.Fragment>
                      <p>name: {player.name}</p>
                      <p>skill: {player.skill}</p>
                    </React.Fragment>
                  ))}
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
