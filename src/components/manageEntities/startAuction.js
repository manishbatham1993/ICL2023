import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const startAuction = () => {
  axios.post(BASE_URL + '/api/v1/auction/start').then((res) => {
    console.log('------auction-started----------')
    console.log('store', res.data.data)
  })
}

export default startAuction
