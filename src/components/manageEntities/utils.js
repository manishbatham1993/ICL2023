import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const startAuction = (accountId) => {
  axios
    .post(BASE_URL + '/api/v1/auction/start', { accountId })
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
  axios.post(BASE_URL + '/api/v1/auction/pause').then((res) => {
    console.log('auction-paused')
    console.log('res: ', res)
  })
}

const resetAuction = () => {
  axios.post(BASE_URL + '/api/v1/auction/reset').then((res) => {
    console.log('auction-reset')
    console.log('res:', res)
  })
}

export { startAuction, pauseAuction, resetAuction }
