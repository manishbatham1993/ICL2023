import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const initializeAuction = (accountId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  axios
    .post(BASE_URL + '/api/v1/auction/initialize', { accountId }, config)
    .then((res) => {})
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
      }
    })
}

const startAuction = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
  axios
    .post(BASE_URL + '/api/v1/auction/start', {}, config)
    .then((res) => {
      // console.log('auction-started')
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
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
      console.log('auction-pause/resume')
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
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
        console.log('auction-ended')
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          alert(err.response.data.msg)
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
        console.log('auction-cleared')
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          alert(err.response.data.msg)
        }
      })
  }
}

export {
  initializeAuction,
  startAuction,
  pauseAuction,
  endAuction,
  clearAuction,
}
