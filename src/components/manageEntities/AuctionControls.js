import React, { useState } from 'react'
import axios from 'axios'

import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Button } from 'reactstrap'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const AuctionControls = ({ accounts, onClickConfigurations, setSnackbar }) => {
  const [selectedAccount, setSelectedAccount] = useState('')

  const startAuctionHandler = () => {
    if (!selectedAccount) {
      const msg = 'Select the account to auction'
      setSnackbar('info', msg)
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
        setSnackbar('success', res?.data?.msg)
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setSnackbar('error', err?.response?.data?.msg)
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
        setSnackbar('success', res?.data?.msg)
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setSnackbar('error', err?.response?.data?.msg)
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
        setSnackbar('success', res?.data?.msg)
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setSnackbar('error', err?.response?.data?.msg)
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
          setSnackbar('success', res?.data?.msg)
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.msg) {
            setSnackbar('error', err?.response?.data?.msg)
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
          setSnackbar('success', res?.data?.msg)
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.msg) {
            setSnackbar('error', err?.response?.data?.msg)
          }
        })
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        px: 1,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Button
          size="lg"
          style={{ fontSize: 'small', padding: '1rem' }}
          onClick={onClickConfigurations}
        >
          Set Configurations
        </Button>
      </div>
      <div>
        <Select
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
          style={{ fontSize: 'small', padding: '1rem' }}
          onClick={startAuctionHandler}
        >
          Start Auction
        </Button>
      </div>

      <div>
        <Button
          style={{ fontSize: 'small', padding: '1rem' }}
          onClick={startTimer}
        >
          Start Timer
        </Button>
        <Button
          style={{ fontSize: 'small', padding: '1rem' }}
          onClick={pauseAuction}
        >
          Pause/Resume
        </Button>
      </div>
      <div>
        <Button
          style={{ fontSize: 'small', padding: '1rem' }}
          onClick={endAuction}
        >
          End Auction
        </Button>
        <Button
          style={{ fontSize: 'small', padding: '1rem' }}
          onClick={clearAuction}
        >
          Clear Auction
        </Button>
      </div>
    </Box>
  )
}

export default AuctionControls
