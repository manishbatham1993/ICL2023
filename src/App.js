import React, { useContext, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import axios from 'axios'

import AuthContext from './store/auth-context'

import './App.css'
import ResponsiveAppBar from './components/navigationbar.js'
import SignIn from './components/signin.js'
import Footer from './components/footer'
import Auction from './components/Auction/auction'
import Overview from './components/overview'
import ManageEntities from './components/manageEntities/ManageEntities'
import Countdown from './components/countdown'
import Accountdetail from './components/accountdetails'
import TopBuys from './components/TopBuys'
import Squaddetail from './components/squaddetails'
import Allplayer from './components/Allplayer'
import TeamDetail from './components/teamdetail'
import Rules from './components/manageEntities/Rules'
import Fixtures from './components/Fixtures'
import AuctionControls from './components/manageEntities/AuctionControls'
import DashboardAppPage from './components/Dashboard/Dashboard'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const App = () => {
  const authCtx = useContext(AuthContext)

  // updating analytics
  useEffect(() => {
    const api = BASE_URL + '/api/v1/analytic/set'
    axios.get(api).then((data) => {})
  }, [])

  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <div className="main__content">
        <Routes>
          <Route path="/" element={<Navigate to="/teams" replace />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/players" element={<Allplayer />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Teams" element={<TeamDetail />} />
          <Route path="/Auction" element={<Auction />} />
          <Route path="/topbuys" element={<TopBuys />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/accountdetail/:id" element={<Accountdetail />} />
          <Route path="/squaddetail/:id" element={<Squaddetail />} />
          {authCtx?.role === 'admin' && (
            <Route path="/manage" element={<ManageEntities />} />
          )}
          {authCtx?.role === 'admin' && (
            <Route path="/auctioncontrols" element={<AuctionControls />} />
          )}
          {authCtx?.role === 'admin' && (
            <Route path="/analytics" element={<DashboardAppPage />} />
          )}
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default App
