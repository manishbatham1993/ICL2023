import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const initializeAuction = (accountId) => {
  axios
    .post(BASE_URL + '/api/v1/auction/initialize', { accountId })
    .then((res) => {
      console.log('------auction-started----------')
      console.log('store', res.data.data)
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
      }
    })
}

const startAuction = () => {
  axios
    .post(BASE_URL + '/api/v1/auction/start')
    .then((res) => {
      console.log('------auction-started----------')
      console.log('store', res.data.data)
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
      }
    })
}

const pauseAuction = () => {
  axios
    .post(BASE_URL + '/api/v1/auction/pause')
    .then((res) => {
      console.log('auction-pause/resume')
      console.log('res: ', res)
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
      }
    })
}

const endAuction = () => {
  alert('Are you sure you want to End current Auction ? \nClick OK to CONFIRM')
  axios
    .post(BASE_URL + '/api/v1/auction/end')
    .then((res) => {
      console.log('auction-ended')
      console.log('res:', res)
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
      }
    })
}

const clearAuction = () => {
  alert('Are you sure you want to clear the Auction ? \nClick OK to CONFIRM')
  axios
    .post(BASE_URL + '/api/v1/auction/clear')
    .then((res) => {
      console.log('auction-cleared')
      console.log('res:', res)
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
      }
    })
}

export {
  initializeAuction,
  startAuction,
  pauseAuction,
  endAuction,
  clearAuction,
}
