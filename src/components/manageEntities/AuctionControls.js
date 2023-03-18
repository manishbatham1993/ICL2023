import React, { useState, useContext } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import EntityContext from '../../store/entity-context'
import Alert from '@mui/material/Alert'
import { Button } from 'reactstrap'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const classes = {
  auctionBars: {
    display: 'flex',
  },
  auctionButtons: {
    flex: '1',
    padding: '1.5rem',
    marginBottom: '0.5rem',
    marginLeft: '0.5rem',
  },
}

export default function AuctionControls() {
  const entityCtx = useContext(EntityContext)
  const accounts = entityCtx?.accounts

  const [selectedAccount, setSelectedAccount] = useState('')
  // snackbar
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    type: null,
    message: null,
    timer: null,
  })

  const setSnackbarHandler = (type, message, duration = 5) => {
    //duration in seconds
    clearTimeout(snackbar.timer)
    let timer = setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, isOpen: false }))
    }, duration * 1000)
    setSnackbar({ isOpen: true, type, message, timer })
  }
  const startAuctionHandler = () => {
    if (!selectedAccount) {
      const msg = 'Select the account to auction'
      setSnackbarHandler('info', msg)
      return
    }
    initializeAuction(selectedAccount)
  }

  const initializeAuction = (accountId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios
      .post(BASE_URL + '/api/v1/auction/initialize', { accountId }, config)
      .then((res) => {
        setSnackbarHandler('success', res?.data?.msg)
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setSnackbarHandler('error', err?.response?.data?.msg)
        }
      })
  }

  const startTimer = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    axios
      .post(BASE_URL + '/api/v1/auction/start', {}, config)
      .then((res) => {
        setSnackbarHandler('success', res?.data?.msg)
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setSnackbarHandler('error', err?.response?.data?.msg)
        }
      })
  }

  const pauseAuction = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    axios
      .post(BASE_URL + '/api/v1/auction/pause', {}, config)
      .then((res) => {
        setSnackbarHandler('success', res?.data?.msg)
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setSnackbarHandler('error', err?.response?.data?.msg)
        }
      })
  }

  const endAuction = () => {
    const action = window.confirm(
      'Are you sure you want to End current Auction ? \nClick OK to CONFIRM'
    )
    if (action) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      axios
        .post(BASE_URL + '/api/v1/auction/end', {}, config)
        .then((res) => {
          setSnackbarHandler('success', res?.data?.msg)
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.msg) {
            setSnackbarHandler('error', err?.response?.data?.msg)
          }
        })
    }
  }

  const clearAuction = () => {
    const action = window.confirm(
      'Are you sure you want to clear the Auction ? \nClick OK to CONFIRM'
    )
    if (action) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      axios
        .post(BASE_URL + '/api/v1/auction/clear', {}, config)
        .then((res) => {
          setSnackbarHandler('success', res?.data?.msg)
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.msg) {
            setSnackbarHandler('error', err?.response?.data?.msg)
          }
        })
    }
  }

  return (
    <React.Fragment>
      {snackbar?.isOpen && (
        <Alert variant="filled" severity={snackbar.type}>
          {snackbar.message}
        </Alert>
      )}
      <Box
        sx={{
          px: 1,
          py: 5,
          width: '50%',
          margin: '0 auto',
        }}
      >
        <div style={classes.auctionBars}>
          <Select
            style={classes.auctionButtons}
            size="small"
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '.MuiSvgIcon-root ': {
                fill: 'white !important',
              },
            }}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedAccount}
            defaultValue={''}
            displayEmpty
            onChange={(e) => {
              setSelectedAccount(e.target.value)
            }}
            label="Account"
          >
            <MenuItem value="">
              <em>--Select--</em>
            </MenuItem>
            {accounts.map((account, i) => (
              <MenuItem key={i} value={account._id}>
                <em>{account.name}</em>
              </MenuItem>
            ))}
          </Select>
          <Button
            style={classes.auctionButtons}
            onClick={startAuctionHandler}
            className="btn-success"
          >
            Start Auction
          </Button>
        </div>

        <div style={classes.auctionBars}>
          <Button style={classes.auctionButtons} onClick={startTimer}>
            Start Timer
          </Button>
          <Button style={classes.auctionButtons} onClick={pauseAuction}>
            Pause/Resume
          </Button>
        </div>
        <div style={classes.auctionBars}>
          <Button style={classes.auctionButtons} onClick={endAuction}>
            End Auction
          </Button>
          <Button style={classes.auctionButtons} onClick={clearAuction}>
            Clear Auction
          </Button>
        </div>
      </Box>
    </React.Fragment>
  )
}
